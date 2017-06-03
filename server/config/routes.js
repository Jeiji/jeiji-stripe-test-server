console.log(`Routes are up!`);
const stripeCtrl = require('../controllers/stripe');

module.exports = function( app ){

  app.get( '/customer' , function( req , res ){
      stripeCtrl.chk();
  });

  app.post( '/customer/sources' , function( req , res ){
      stripeCtrl.newPaymnt();
  });

  app.post( '/customer/default_source' , function( req , res ){
      stripeCtrl.chngDefPaymnt();
  });

  app.post( '/charge' , function( req , res ){
      stripeCtrl.chrgPayment( req , res );
  });

};
