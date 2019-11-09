pragma solidity ^0.5.0;

contract StoreNames {
    string public name = "Foo";

    function setName(string memory _name) public {
        name = _name;
    }
}