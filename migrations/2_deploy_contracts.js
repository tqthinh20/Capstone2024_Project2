var election = artifacts.require("../contracts/election.sol");

module.exports = function(deployer) {
    deployer.deploy(election);
};
