try {
  const contractAddr = '0x1df6d1ac1a079d94fce551ccaeebd55830e91ae2';
  const rollingdicesContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"total","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"howmuch","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"bet_num","type":"uint256"},{"name":"howmuch","type":"uint256"}],"name":"betYourNum","outputs":[{"name":"v","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBalanceOfPlayer","outputs":[{"name":"v","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalanceOfDealer","outputs":[{"name":"v","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getResult","outputs":[{"name":"bet_num","type":"uint256"},{"name":"final_num","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"bet_num","type":"uint256"}],"name":"betAllYourNum","outputs":[{"name":"v","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);

  const contractInstance = rollingdicesContract.at(contractAddr);

  function setHTMLTag(tagId, info_str) {
      document.getElementById(tagId).innerHTML = info_str;
  }

  function getHTMLTag(tagId) {
      return document.getElementById(tagId).value;
  }

  
  function getBankerBalances() {
    setHTMLTag("txtStatus","Banker Balance Updating...") ;
      contractInstance.getBalanceOfDealer.call(function(err, res) {
          if (!err) {
              let eth = web3.fromWei(res.toString(), 'ether').toString();
              setHTMLTag("txtBanker",eth) ;
              setHTMLTag("txtStatus","getBankerBalances OK");
          } else {
            setHTMLTag("txtStatus","getBankerBalances Err: "+err.message);
          }
      });
  }

  function getPlayerBalances() {
    setHTMLTag("txtStatus","Player Balance Updating...") ;
    contractInstance.getBalanceOfPlayer.call(function(err, res) {
        if (!err) {
            let eth = web3.fromWei(res.toString(), 'ether').toString();
            setHTMLTag("txtPlayer",eth) ;
            setHTMLTag("txtStatus","getPlayerBalances OK");
        } else {
          setHTMLTag("txtStatus","getPlayerBalances Err: "+err.message);
        }
    });
  }

  function deposit(){
      
      let v = getHTMLTag('txtDeposit');
      if (v < 0) {
        setHTMLTag("txtStatus","Negative deposit err") ;;
          return;
      }
      let wei = web3.toWei(v, 'ether');
      setHTMLTag("txtStatus","Player Deposting...") ;
     
      let tx = {
          to: contractAddr,
          gas: 200000,
          value: wei
      }
      contractInstance.deposit(tx, function(err, res) {
          if (!err) {
            setHTMLTag("txtStatus","Submit OK") ;
            getPlayerBalances();
          } else {
            setHTMLTag("txtStatus","Failed: "+err.message) ;
          }
      })
  }

  function withDraw(){
      
    let v = getHTMLTag('txtWithDraw');
    if (v <=0) {
      setHTMLTag("txtStatus","Err withdraw <=0") ;;
        return;
    }
    let wei = web3.toWei(v, 'ether');
    setHTMLTag("txtStatus","Player withdrawing...") ;
    contractInstance.withdraw(wei, function(err, res) {
        if (!err) {
          setHTMLTag("txtStatus","WithDraw Submit OK") ;
          getPlayerBalances();
        } else {
          setHTMLTag("txtStatus","WithDraw Failed: "+err.message) ;
        }
    })
  }

  function onBetting(){
    let howmuch = getHTMLTag('txtHowMuch');
    if (howmuch <=0) {
      setHTMLTag("txtStatus","howmuch <=0") ;;
        return;
    }
    howmuch = web3.toWei(howmuch,'ether');

    let betNum=getHTMLTag('txtBetNum');
    if (betNum <=0) {
      setHTMLTag("txtStatus","betNum <=0") ;;
        return;
    }
  
    setHTMLTag("txtStatus","Player withdrawing...") ;
    contractInstance.betYourNum(betNum,howmuch, function(err, res) {
        if (!err) {
          setHTMLTag("txtStatus","Betting Submit OK") ;
        } else {
          setHTMLTag("txtStatus","Betting Failed: "+err.message) ;
        }
    })

  }
  function getResultStatus(){
    contractInstance.getResult.call(function(err, res) {
      if (!err) {
        let bet_n = res[0].toString();
        let fi_n=res[1].toString();
        let win_s="You may be lucky in next turns!!!You loose!!!";
        if(bet_n==fi_n){
          win_s ="Congratulation!!!You win!!!"
        }
   
        let info_s = win_s+"<br/>"+"You bet this number : "+bet_n+"<br/>"+"Final number is : "+fi_n;
        setHTMLTag("txtBettingResult",info_s) ;
        getBankerBalances();
        getPlayerBalances();
        
      } else {
        setHTMLTag("Result","Get Failed: "+err.message) ;
      }
  })
  }

  let intervalID = setInterval(function(){getResultStatus();}, 5000);


} catch (err) {
  document.getElementById("txtStatus").innerHTML = err.message;
}


window.addEventListener('load', function() {

  if (typeof window.web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
      console.log('Using metamask plugin')
      document.getElementById('metamask').innerHTML = 'Interact with blockchain through Metamask Plugin'


  } else {
      console.log('No web3? You should consider trying MetaMask!')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      document.getElementById('metamask').innerHTML = 'Interact with blockchain through localNode'
  }

  // getBankerBalances();
  // getPlayerBalances();
  getResultStatus();
})