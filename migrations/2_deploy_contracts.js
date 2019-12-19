var Adoption = artifacts.require("Adoption");
var storeNames = artifacts.require("StoreNames");
var Statments = artifacts.require("Statements");

module.exports = function(deployer) {
    deployer.deploy(Adoption);
    deployer.deploy(storeNames);
    deployer.deploy(Statments);
};