const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenBridge", function () {
  let Token;
  let token;
  let TokenBridge;
  let tokenBridge;

  let owner;
  let sender;
  let receiver;

  beforeEach(async function () {
    [owner, sender, receiver] = await ethers.getSigners();

    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();

    TokenBridge = await ethers.getContractFactory("TokenBridge");
    tokenBridge = await TokenBridge.deploy(token.address);

    await token.approve(tokenBridge.address, 100);
  });

  describe("deposit", function () {
    it("should deposit tokens on the bridge", async function () {
      await tokenBridge.deposit(sender.address, 50);

      const balance = await token.balanceOf(tokenBridge.address);
      expect(balance).to.equal(50);
    });

    it("should emit a Deposit event", async function () {
      await expect(tokenBridge.deposit(sender.address, 50))
        .to.emit(tokenBridge, "Deposit")
        .withArgs(sender.address, 50);
    });

    it("should not allow deposits from a non-owner", async function () {
      await expect(tokenBridge.connect(sender).deposit(sender.address, 50)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("withdraw", function () {
    beforeEach(async function () {
      await tokenBridge.deposit(sender.address, 100);
    });

    it("should withdraw tokens from the bridge", async function () {
      await tokenBridge.withdraw(receiver.address, 50);

      const balance = await token.balanceOf(receiver.address);
      expect(balance).to.equal(50);
    });

    it("should emit a Withdrawal event", async function () {
      await expect(tokenBridge.withdraw(receiver.address, 50))
        .to.emit(tokenBridge, "Withdrawal")
        .withArgs(receiver.address, 50);
    });

    it("should not allow withdrawals to a non-registered token", async function () {
      await expect(tokenBridge.withdraw(receiver.address, 50, ethers.constants.HashZero)).to.be.revertedWith(
        "Token not registered"
      );
    });

    it("should not allow withdrawals greater than the available balance", async function () {
      await expect(tokenBridge.withdraw(receiver.address, 101)).to.be.revertedWith(
        "Insufficient balance"
      );
    });

    it("should not allow withdrawals from a non-owner", async function () {
      await expect(tokenBridge.connect(sender).withdraw(receiver.address, 50)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
});
