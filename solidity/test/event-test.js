const { expect } = require("chai");

let event;
let manager;
let user;


describe("Event contract", () => {
  beforeEach(async () => {
    const Event = await ethers.getContractFactory("Event");
    event = await Event.deploy(
      "Boysetsfire",
      "Hollywood Palladium",
      100,
      4000
    );
    await event.deployed();
  
    [manager, user] = await ethers.getSigners();
  });

  describe("Contract deployment", () => {
    it("deploys contract", () => {
      expect(event.address).to.be.properAddress;
    });
    
    it("sets manager address", async () => {
      expect(await event.manager()).to.equal(manager.address);
    });
    
    it("initializes contract with proper values", async () => {
      expect(await event.eventName()).to.equal("Boysetsfire");
      expect(await event.venue()).to.equal("Hollywood Palladium");
      expect(await event.ticketPrice()).to.equal(100);
      expect(await event.ticketsAvailable()).to.equal(4000);
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

    it("can buy ticket", async() => {
      await event.connect(user).buyTicket({value: "100"});
      expect(await event.connect(user).hasTicket()).to.equal(true);
    });

    it("raises event when ticket bought", async () => {
      await expect(event.connect(user).buyTicket({value: "110"}))
        .to.emit(event, "TicketBought")
        .withArgs(event.address, user.address);
    });
  });
});