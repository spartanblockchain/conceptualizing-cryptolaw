const Statments = artifacts.require("Statements");

module.exports = function(deployer) {
    deployer.deploy(Statments);
};