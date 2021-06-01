const { expect } = require("chai");
const { BigNumber } = require("ethers")

let factory;
let manager;


describe("EventFactory contract", () => {
  beforeEach(async () => {
    const EventFactory = await ethers.getContractFactory("EventFactory");
    factory = await EventFactory.deploy();
    await factory.deployed();
  
    [manager] = await ethers.getSigners();
  });

  describe("Contract deployment", () => {
    it("deploys contract", () => {
      expect(factory.address).to.be.properAddress;
    });
  });

  describe("Create event", () => {
    let eventAddress;

    beforeEach(async () => {
      eventAddress = await factory.connect(manager).createEvent(
        100,
        1000
      );
    });

    it("increments events count", async () => {
      let count = await factory.eventsCount();
      expect(count).to.equal(1);
    });
  });
});