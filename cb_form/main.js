$(function(){



    $('#login-button').click(function() {
      var Client = require('coinbase').Client;

      var api_k = $('#api-key').val();
      var api_s = $('#api-secret').val();

      var client = new Client({
        'apiKey': api_k,
        'apiSecret': api_s,
        strictSSL: false
      });

      if (client) {
        $(".logged-in").removeClass("hidden");

        //initially fill
        updatePrices(client);

        //update every 7 seconds
        window.setInterval(function(){
          updatePrices(client);
        }, 7000);


        client.getPaymentMethods({},function(err, pms) {
          pms.forEach(function(paymentMethod) {
              console.log(paymentMethod);
              $("#payment-methods").append(
                "<label class=\"radio-inline\"><input type=\"radio\">"+paymentMethod.name+"</label>");
          });
        });

      }

    });



    function updatePrices(client) {

      client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
        $('#btc-price').text(price.data.amount);
      });
      client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, price) {
        $('#eth-price').text(price.data.amount);
      });
      client.getBuyPrice({'currencyPair': 'LTC-USD'}, function(err, price) {
        $('#ltc-price').text(price.data.amount);
      });


      client.getAccount("BTC", function(err, account) {
        $('#btc-balance').text(account.balance.amount);
        $('#btc-balance-usd').text(account.native_balance.amount);

        // account.buy({"amount": "1",
        //          "currency": "BTC",
        //          "quote": "true"}, function(err, tx) {
        //            console.log(tx);
        // });

      });

      client.getAccount("ETH", function(err, account) {
        $('#eth-balance').text(account.balance.amount);
        $('#eth-balance-usd').text(account.native_balance.amount);

        // account.buy({"amount": "0.004",
        //          "currency": "ETH",
        //          "quote": "true"}, function(err, tx) {
        //    $('#eth-price').text(tx.total.amount);
        // });

      });

      client.getAccount("LTC", function(err, account) {
        $('#ltc-balance').text(account.balance.amount);
        $('#ltc-balance-usd').text(account.native_balance.amount);
      });

    }


});
