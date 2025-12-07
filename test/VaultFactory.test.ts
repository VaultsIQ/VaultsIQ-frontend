import { expect } from "chai";
import { ethers } from "hardhat";
import { VaultFactory } from "../typechain-types";

describe("VaultFactory", function () {
  let vaultFactory: VaultFactory;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const VaultFactoryFactory = await ethers.getContractFactory("VaultFactory");
    vaultFactory = await VaultFactoryFactory.deploy(owner.address);
    await vaultFactory.waitForDeployment();
  });

  describe("User Registration", function () {
    it("Should register a new user successfully", async function () {
      await expect(vaultFactory.connect(user1).registerUser("alice", "DeFi enthusiast"))
        .to.emit(vaultFactory, "UserRegistered")
        .withArgs(user1.address, await ethers.provider.getBlockNumber());

      expect(await vaultFactory.isUserRegistered(user1.address)).to.be.true;
    });
  });
});

