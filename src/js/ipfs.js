const IPFS = require('ipfs-api');
//const ipfs = new IPFS({host: 'ipfs.infura.io', port: '5001', protocol: 'http'});
const ipfs = new IPFS('localhost', '5001', {protocol: 'http'});
const Web3 = require('web3');
const contract = require('@truffle/contract');
const statementsContractJSON = require('../../build/contracts/Statements.json');

function initWeb3() {
    //Set web3 provider
    const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    const web3 = new Web3(web3Provider);
    //Setup contract
    const statementsContract = contract(statementsContractJSON);
    statementsContract.setProvider(web3Provider);

    return [web3, statementsContract];
}

module.exports = {
    store: function(file) {
        //Init web3
        const [web3, statementsContract] = initWeb3();
        //Get users eth account from provider
        web3.eth.getAccounts((err, accounts) => {
            const account = accounts[0];
            if (!err) {
                //Create buffer from file
                const buffer = Buffer.from(file);
                //Add buffer to ipfs
                ipfs.files.add(buffer, {pin: true}, (err, ipfsHash) => {
                    if (!err) {
                        //Store hash in smart contract
                        let p = statementsContract.deployed().then((instance) => {
                            instance.newStatement(ipfsHash[0].hash, {from: account, gas: 100000}).catch((err) => {
                                console.log(err);
                            });
                        }).then(() => {
                            console.log('Success!');
                            return true;
                        }).catch((err) => {
                            console.log(err);
                            return false;
                        });

                        return p;
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });
    },
    
    retrieve: function() {
        //Init web3
        const [web3, statementsContract] = initWeb3();
        //Get users stored hash from smart contract
        web3.eth.getAccounts((err, accounts) => {
            if (!err) {
                //Get current account
                const account = accounts[0];

                statementsContract.deployed().then((instance) => {
                    instance.statements.call(account, (err, result) => {
                        if (!err) {
                           return result; 
                        } else {
                            console.log(err);
                        }
                    }).then(async (result) => {
                        const file = await ipfs.cat(result);
                        console.log(file.toString('utf8'));
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
}