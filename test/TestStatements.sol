pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Statements.sol";

contract TestStatements {
    //Addr of storeNames contract
    Statements statements = Statements(DeployedAddresses.Statements());

    //Setup variables to be stored
    string filerName = 'Colin';
    uint filerNumber = 2488285819;
    string filerEmail = 'barne272@msu.edu';
    address debtorAddress = 0;
    string debtorName = 'ColinDebtor';
    string debtorPhysicalAddress = '4334 Vernor Ct.';
    address spAddress = 1;
    string spName = 'Secured Party Name';
    string spPhysicalAddress = '135 Nowhere St.';
    string collateral = 'My House';
    uint collateralUuid = 2;

    event logStatment(statement);

    function testCanAddStatement() public {
        //Store data
        statements.addStatement(filerName, filerNumber, filerEmail, debtorAddress, debtorName, debtorPhysicalAddress,
        spAddress, spName, spPhysicalAddress, collateral, collateralUuid);

        //Get added statement
        statement = statements.getStatement(0);
        logStatement(statement);

    }
}