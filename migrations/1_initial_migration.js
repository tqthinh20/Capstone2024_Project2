var migrations = artifacts.require("../contracts/migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(migrations);
};
