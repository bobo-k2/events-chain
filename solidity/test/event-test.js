const { expect } = require("chai");
const { BigNumber } = require("ethers")

let event;
let manager;
let user;
let user2;


describe("Event contract", () => {
  beforeEach(async () => {
    const Event = await ethers.getContractFactory("Event");
    event = await Event.deploy(
      "Boysetsfire",
      "Hollywood Palladium",
      new Date().getTime(),
      100,
      1
    );
    await event.deployed();
  
    [manager, user, user2] = await ethers.getSigners();
  });

  describe("Contract deployment", () => {
    it("deploys contract", () => {
      expect(event.address).to.be.properAddress;
    });
    
    it("sets manager address", async () => {
      expect(await event.manager()).to.equal(manager.address);
    });
    
    it("initializes contract with proper values", async () => {
      expect(await event.name()).to.equal("Boysetsfire");
      expect(await event.venue()).to.equal("Hollywood Palladium");
      expect(await event.ticketPrice()).to.equal(100);
      expect(await event.ticketsAvailable()).to.equal(1);
    });
  });

  describe("Transactions", () => {
    it("can change ticket price", async () => {
      await event.setTicketPrice(200);
      expect(await event.ticketPrice()).to.equal(200);
    })

    it("can't buy ticket if insufficient funds provided", async () => {
      await expect(
        event.connect(user).buyTicket({value: "1"})
      ).to.be.revertedWith("Funds sent are lower than ticket price");
    });

    it("can't buy ticket if no tickets available", async () => {
      // Single ticket available, so buy one. Second buy attempt should fail.
      await event.connect(user).buyTicket({value: "100"})
      await expect(
        event.connect(user).buyTicket({value: "100"})
      ).to.be.revertedWith("No tickets available");
    });

    it("can buy ticket", async() => {
      await expect(() => event.connect(user).buyTicket({value: "100"}))
        .to.changeEtherBalance(event, 100);
      expect(await event.connect(user).hasTicket(1)).to.equal(true);
    });

    it("raises event when ticket bought", async () => {
      await expect(event.connect(user).buyTicket({value: "110"}))
        .to.emit(event, "TicketBought")
        .withArgs(event.address, user.address);
    });
  });

  describe("Transfer", () => {
    beforeEach(async () => {
      await event.connect(user).buyTicket({value: "100"});
    });

    it("can transfer ticket", async() => {
      await event.connect(user).transferTicket(1, user2.address);  
      expect(await event.connect(user2).hasTicket(1)).to.equal(true);    
    });

    it("raises event when ticket transfered", async () => {
      await expect(event.connect(user).transferTicket(1, user2.address))
        .to.emit(event, "TicketTransfered")
        .withArgs(1, user.address, user2.address);
    });

    it("can't transfer ticket if not the owner", async() => {
      await expect(
        event.connect(user).connect(user2).transferTicket(1, user.address)
      ).to.be.revertedWith("Ticket not owned by the sender");   
    });

    it("can transfer ticket funds from the contract to owner", async() => {
      await expect(() => event.connect(manager).withdrawFunds())
        .to.changeEtherBalance(event, -100);
      // TODO check manager balance changeEtherBalance doens't work
    });
  });
});