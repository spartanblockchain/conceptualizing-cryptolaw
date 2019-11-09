var Adoption = artifacts.require("Adoption");
var storeNames = artifacts.require("StoreNames");

module.exports = function(deployer) {
    deployer.deploy(Adoption);
    deployer.deploy(storeNames);
};