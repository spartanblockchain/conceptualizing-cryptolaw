pragma solidity ^0.5.0;

contract Statements {
    mapping(address => string) public statements;

    function newStatement(string memory ipfsHash) public {
        statements[msg.sender] = ipfsHash;
    }
}