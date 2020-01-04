// Link statements.sol function and storeNames.sol function

App = {
  web3Provider: null,
  contracts: {},
  init: async function() {
    return await App.initWeb3();
  },
  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('StoreNames.json', function(data) {
      //Get the nessecary contract artifact file and instantiate it with truffle-contract
      var StoreNamesArtifact = data;
      App.contracts.StoreNames = TruffleContract(StoreNamesArtifact);

      //Set the provider for our contract
      App.contracts.StoreNames.setProvider(App.web3Provider);

      //Use our contract to retrieve stored names
      return App.getStoredName();
    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-get-name', App.getStoredName);
    $(document).on('click', '.btn-set-name', App.handleSetName);
  },
  getStoredName: function() {
    var storeNamesInstance;

    App.contracts.StoreNames.deployed().then(function(instance) {
      storeNamesInstance = instance;

      return storeNamesInstance.name.call();
    }).then(function(returnedName) {
      $('.name').text(returnedName);
    }).catch(function(err) {
      console.log(err.emssage);
    });
  },
  // Below runs everytime event is sent (button clicks)
  handleSetName: function(event) {
    event.preventDefault();

    console.log(event); // get details about event for testing

    var newName = $(".name-input").val();
    console.log(newName);

    var storeNamesInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.StoreNames.deployed().then(function(instance) {
        storeNamesInstance = instance;

        //Execute adopt as a transaction by sending account
        return storeNamesInstance.setName(newName, {from: account});
      }).then(function(result) {
        return App.getStoredName();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
