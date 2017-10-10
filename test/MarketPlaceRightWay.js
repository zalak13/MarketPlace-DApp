//Contract to be tested
var MarketPlace = artifacts.require("./MarketPlace.sol");

//Test suite
contract('MarketPlace',function(accounts){

  var marketPlaceInstance;
  var seller = accounts[1];
  var articleName = "article 1";
  var articleDescription = "Description for article 1";
  var articlePrice = 10;

  //Test case: check initial values
  it("should be initialized with empty values",function(){
    return MarketPlace.deployed().then(function(instance){
      return instance.getArticle.call();
    }).then(function(data){
      assert.equal(data[0],0x0,"seller must be empty");
      assert.equal(data[1],'',"article name must be empty");
      assert.equal(data[2],'',"description must be empty");
      assert.equal(data[3].toNumber(),0,"article price must be zero");
    });
  });



  //Test case: sell an article
  it("should sell an article",function(){
    return MarketPlace.deployed().then(function(instance){
      marketPlaceInstance = instance;
      return marketPlaceInstance.sellArticle(articleName, articleDescription,web3.toWei(articlePrice,"ether"),{from: seller});
    }).then(function(){
        return marketPlaceInstance.getArticle.call();
    }).then(function(data){
        assert.equal(data[0],seller,"seller must be "+ seller);
        assert.equal(data[1],articleName,"article name must be "+articleName);
        assert.equal(data[2],articleDescription,"description must be "+ articleDescription);
        assert.equal(data[3].toNumber(),web3.toWei(articlePrice,"ether"),"article price must be "+ web3.toWei(articlePrice,"ether"));
      });
    });
  });
