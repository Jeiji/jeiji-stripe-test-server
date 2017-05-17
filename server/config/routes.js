console.log(`Routes are up!`);
const gpix = require('get-pixels');
const multer  = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
                  destination: function (req, file, cb) {
                    cb(null, './client/')
                  },
                  filename: function (req, file, cb) {
                    cb(null, file.fieldname + '-' + 1 + '.jpg')
                  }
                });
const upload = multer({ storage: storage });
const hatchAlgo = require('../controllers/hatchAlgo.js')
const newaAsciiPortrait = '';


module.exports = function( app ){

  // app.get( '/chk_logged' , function( req , res ){
  //   const loggedUsr = req.session.usr;
  //   console.log(`\n\n\n\n\n\n????? Logged user?\n` , loggedUsr );
  //   if( loggedUsr ){
  //     res.json( loggedUsr );
  //   }else{
  //     res.redirect('/');
  //   }
  // });

  app.post('/pic', upload.single('uploadedPic'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log('\n\nTRYING TO UPLOAD');
    console.log(req.body);
    console.log('File...',req.file);
    if (!req.file) {
      res.json({'err':'No file!'})
      return
    }
    hatchAlgo.hatchwerk( "uploadedPic-1" , req.body.detail , function( newPortrait ){
      res.json( { 'msg': 'DONE! Click okay to see it!' , 'hatchwerk': newPortrait } );
    });
    fs.unlink("./client/uploadedPic-1.jpg");

  })

  app.get( '/' , function( req , res ){
    res.render('index');
  });



};
