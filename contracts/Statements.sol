pragma solidity ^0.5.0;

contract Statements {
    struct Filer {
        string name;
        uint number;
        string email;
    }

    struct Debtor {
        address addr;
        string name;
        string physicalAddr;
    }

    struct SecuredParty {
        address addr;
        string name;
        string physicalAddr;
    }

    struct Collateral {
        string collateral;
        uint uuid;
    }

    struct Statement {
        Filer filer;
        Debtor debtor;
        SecuredParty securedParty;
        Collateral collateral;
    }

    mapping(uint => Statement) statements;
/*
    function newFiler(string filerName, uint filerNumber, string filerEmail) public returns(Filer createdFiler, bool success) {
        Filer createdFiler;
        createdFiler.name = filerName;
        createdFiler.number = filerNumber;
        createdFiler.email = filerEmail;
        return (createdFiler, true);
    }

    function newDebtor(address debtorAddress, string debtorName, string debtorPhysicalAddress) public returns(Debtor createdDebtor, bool success) {
        Debtor createdDebtor;
        createdDebtor.addr = debtorAddress;
        createdDebtor.name = debtorName;
        createdDebtor.physicalAddr = debtorPhysicalAddress;
        return (createdDebtor, true);
    }*/

    function addStatement(uint statementID, string memory filerName, uint filerNumber, string memory filerEmail,
    address debtorAddress, string memory debtorName, string memory debtorPhysicalAddress,
    address spAddress, string memory spName, string memory spPhysicalAddress,
    string memory collateral, uint collateralUuid) public returns(bool success) {
        //Initialize Filer struct
        Filer memory createdFiler;
        createdFiler.name = filerName;
        createdFiler.number = filerNumber;
        createdFiler.email = filerEmail;
        //Initialize Debtor struct
        Debtor memory createdDebtor;
        createdDebtor.addr = debtorAddress;
        createdDebtor.name = debtorName;
        createdDebtor.physicalAddr = debtorPhysicalAddress;
        //Initialize Secured Party struct
        SecuredParty memory createdSP;
        createdSP.addr = spAddress;
        createdSP.name = spName;
        createdSP.physicalAddr = spPhysicalAddress;
        //Initialize Collateral struct
        Collateral memory createdCollateral;
        createdCollateral.collateral = collateral;
        createdCollateral.uuid = collateralUuid;
        //Initialize Statement struct
        statements[statementID] = Statement(createdFiler, createdDebtor, createdSP, createdCollateral);
        return true;
    }
}