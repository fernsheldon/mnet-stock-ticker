'use strict';

var stockTickerApp = angular.module('stockTicker.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl',
    });
  }])

  .controller('View1Ctrl', ['$interval', 'stockDataStream', function($interval, stockDataStream) {

    var vm = this;
    vm.data = {};
    vm.stockDataStream = stockDataStream;
    var CURRENT_TIME = new Date().getTime();
    var copyData = [];



    /**
     * This interval is setup to check keep refreshing the
     * data that is received via the websocket.
     */
    $interval(function() {
      processData(vm.stockDataStream.getdataSteam());
    }, 500);


    /**
     * Another interval for updating the 'last
     * updated' field in each of the object.
     */
    $interval(function() {
      updateTime();
    }, 1000);



    /**
     * Function that will process the incoming data.
     * If the stock is not present, then we create
     * it. If the stock is present then we just
     * update the fields.
     *
     * @param  {Array} data Array of arrays containing stock name and price
     */
    function processData(data) {
      for (var len = 0; len < data.length; len++) {
        if (vm.data.hasOwnProperty(data[len][0])) {
          vm.data[data[len][0]].updatePrice(data[len][1]);
        } else {
          vm.data[data[len][0]] = new stockObject(data[len][0], data[len][1], new Date().getTime(), '');
        }
      }
    }


    /**
     * This function calls the prototype fucntion
     * to get the lastest relative time for
     * when the stock was last updated.
     *
     */
    function updateTime() {

      var keyArray = Object.keys(vm.data);

      for (var key = 0; key < keyArray.length; key++) {
        vm.data[keyArray[key]].getRelativeTime();
      }
    }


    /**
     * Fucntion just sets the stock that will
     * be displayed in the modal popup.
     *
     * @param  {stockObject} stockObj A stockObject object
     */
    vm.updateChartView = function(stockObj) {
      vm.stockChoice = stockObj;
    }

    //TODO: Figure out a way to reset the data for the chart.
    vm.closeChart = function(){

    }


  }]);
