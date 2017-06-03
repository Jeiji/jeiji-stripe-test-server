console.log('Stripe Ctrl up!');
const stripe = require('stripe')('sk_test_TzksTaftfiptK1jTj2L2ZEMM')

function stripeCtrl(){

  this.getCstmr = function( req , res ){
      var customerId = '...'; // Load the Stripe Customer ID for your logged in user
          stripe.customers.retrieve(customerId, function(err, customer) {
            if (err) {
                  res.status(402).send('Error retrieving customer.');
            } else {
                  res.json(customer);
            }
      });
  };

  this.newPaymnt = function( request , response ){
      var customerId = '...'; // Load the Stripe Customer ID for your logged in user
          stripe.customers.createSource(customerId, {
              source: request.body.source
          }, function(err, source) {
            if (err) {
                  response.status(402).send('Error attaching source.');
                } else {
                  response.status(200).end();
                }
      });
  };

  this.chngDefPaymnt = function( request , response ){
      var customerId = '...'; // Load the Stripe Customer ID for your logged in user
          stripe.customers.update(customerId, {
          default_source: request.body.defaultSource
          }, function(err, customer) {
              if (err) {
                response.status(402).send('Error setting default source.');
              } else {
                response.status(200).end();
              }
      });
  };

  this.chrgPayment = function( request , response ){
    console.log(`\n\n\nTHIS IS THE TOKEN\n`, request.body);
    stripe.charges.create({
        amount: 2000,
        currency: "usd",
        source: "tok_visa", // obtained with Stripe.js
        description: "Charge for aiden.thompson@example.com"
    }, function(err, charge) {
        if (err) {
            response.json(err).end();
            console.log(`This is the error: `, err);
        }else{
            response.json(charge).end();
        }
    });
  };




};
module.exports = new stripeCtrl;
