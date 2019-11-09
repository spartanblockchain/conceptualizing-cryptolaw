pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/storeNames.sol";

contract TestSetName {
    //Addr of storeNames contract
    StoreNames storeName = StoreNames(DeployedAddresses.StoreNames());
    //Adoption adoption = Adoption(DeployedAddresses.Adoption());

    //The name that will be set as new name
    string newName = "Colin";

    //Testing setting of name
    function testCanSetName() public {
        //Set new name
        storeName.setName(newName);

        //Get currently stored name
        string memory newSetName = storeName.name();

        Assert.equal(newSetName, newName, "Will return true if the new set name is correct");
    }
}