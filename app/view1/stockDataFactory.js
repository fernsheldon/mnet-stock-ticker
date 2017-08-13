stockTickerApp.factory('stockDataStream', function($http) {



  var _webSocket = new WebSocket("wss://stocks.mnet.website");
  var stockDataArray = [];

  _webSocket.onmessage = function(event) {
    stockDataArray = JSON.parse(event.data);
  }

  var stop = function() {
    console.log("stop");
    _webSocket.close();
  }




  return {
    getdataSteam: function() {
      return stockDataArray;
    }
  };
});
