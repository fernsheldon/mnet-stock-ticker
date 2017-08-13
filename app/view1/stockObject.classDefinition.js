'use strict'


/**
 * A stockObject psudeo class that will describe what
 * fields and methods the object will have.
 *
 * @param  {String} name  name of the stock
 * @param  {Number} price the current price of the stock
 * @param  {Number} time  the last updated time of the stock price
 * @param  {String} color Green or red depending on the stock price increase or decrease, white if new.
 */
function stockObject(name, price, time, color) {


  this.name = name
  this.price = price;
  this.priceHistory = [[0,0],[new Date().getTime(),price]];
  this.time = new Date().getTime();
  this.timeString = 'a few moments ago';
  this.color = '';

}


/**
 * function to update the pric eof the stock
 * @param  {Number} updatedPrice the new updated price of the stock
 */
stockObject.prototype.updatePrice = function(updatedPrice) {

  if (this.price - updatedPrice) {
    this.color = 'success';
  } else {
    this.color = 'danger';
  }

  this.price = updatedPrice;

  //TODO: Over time, this array will get to large.
  //Maybe just save the last 50 updates?
  this.priceHistory.push([new Date().getTime(),updatedPrice]);
  this.time = new Date().getTime();
}


/**
 * function to get set the new relative time
 * of the stock's last updated field.
 */

//TODO: Maybe find a better way to figure out the releative time.
// moment.js ?
stockObject.prototype.getRelativeTime = function() {

  var time = new Date().getTime() - this.time;

  switch (true) {

    case (time <= 5000): //5 seconds
      this.timeString = 'a few moments ago';
      break;

    case (time >= 5000 && time <= 60000): //
      this.timeString = 'less than a 1 minute ago';
      break;

    case (time >= 60000 && time <= 120000): //
      this.timeString = 'less than a 2 minutes ago';
      break;

    case (time >= 120000 && time <= 300000): //
      this.timeString = 'less than a 5 minutes ago';
      break;

    case (time >= 300000 && time <= 600000): //
      this.timeString = 'less than a 10 minute ago';
      break;

    case (time >= 600000 && time <= 1200000): //
      this.timeString = 'less than a 20 minutes ago';
      break;

    default:
      return time;

  }
}
