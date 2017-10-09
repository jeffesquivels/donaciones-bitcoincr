$(document).ready(function() {
  var goal = 2000;
  var goalDate = '2017-10-10T15:00:00-06:00';

  $('#goal').text('$' + goal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

  $.getJSON("https://www.bitstamp.net/api/ticker_hour/", function( data ) {
    btcusd = data.last;

    $.getJSON("https://eth-api.abax.io/v1/btc/main/address/bitcoincr", function( data ) {
      var SATOSHIS_PER_BTC = 100000000;
      var MILISECONDS_PER_HOUR = 3600000;

      var btc = data.received / SATOSHIS_PER_BTC;
      var usd = btc * btcusd;
      var progress = (usd / goal) * 100;
      var txs = data.txs;
      var hours = Math.floor((Date.parse(goalDate) - Date.now()) / 3600000);

      $('#received-pct').text(progress.toFixed(2)+'%');
      $('#received-usd').text('$'+usd.toFixed(2));
      $('#progress').css('width', progress+'%');
      $('#countdown').text(hours + ' horas');
      $('#tx').text(txs);
    });
  });
});
