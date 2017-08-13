'use strict';


/**
 * A simple directive to create Highcharts.
 *
 * Parts of code copied from:
 * https://www.highcharts.com/blog/tutorials/194-using-highcharts-with-angular-js/
 *
 */
stockTickerApp.directive('stockChart', function () {
       return {
           restrict: 'E',
           template: '<div></div>',
           scope: {
               title: '=',
               data: '='
           },
           link: function (scope, element) {



             Highcharts.setOptions({
                 global: {
                     useUTC: false
                 }
             });

             // Create the chart
              var superHighCharts = Highcharts.stockChart(element[0], {
                 chart: {
                     events: {
                         load: function () {

                             // set up the updating of the chart each second
                             var series = this.series[0];
                             setInterval(function () {
                                 var x = (new Date()).getTime(), // current time
                                     y = scope.data;
                                 series.addPoint([x, y], true, true);
                             }, 1000);
                         }
                     }
                 },

                 rangeSelector: {
                     buttons: [

                   ],
                     inputEnabled: false,
                     selected: 0
                 },

                 title: {
                     text: scope.title
                 },

                 exporting: {
                     enabled: false
                 },

                 series: [{
                     name: 'Random data',
                     data: (function () {
                         // generate an array of random data
                         var data = [],
                             time = (new Date()).getTime(),
                             i;

                         for (i = -9; i <= 0; i += 1) {
                             data.push([
                                 time + i * 1000,
                                 0
                             ]);
                         }
                         return data;
                     }())
                 }]
             });
           }
       };
   });
