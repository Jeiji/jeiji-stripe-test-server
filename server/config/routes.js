console.log(`Routes are up!`);
// const usrs = require('../controllers/usrs.js')
// const bckts = require('../controllers/bckts.js')
// const bckts = require('../controllers/bckts.js')
const gpix = require('get-pixels');
const multer  = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
                  destination: function (req, file, cb) {
                    cb(null, './client/assets')
                  },
                  filename: function (req, file, cb) {
                    cb(null, file.fieldname + '-' + 1 + '.jpg')
                  }
                });
const upload = multer({ storage: storage });
const newaAsciiPortrait = '';

// Check for bein' logged in
function ifLogged( req , res ){
  if( !req.session.usr ){
    res.redirect('/');
  }
}
function hatchwerk( filename , detail , callback ){
  console.log(filename);
  gpix("/Users/jamesbruno/Dropbox/hatchwerk/client/assets/" + filename + '.jpg', function(err, pixels) {
    if(err) {
      console.log("Bad image path")
      return
    }
    // console.log("got pixels", pixels.shape.slice())
    // console.log(pixels.data.slice() );

    var flatArray = [],
        avgs = [],
        asciiPic = '<p>',
        sqVal = parseInt(detail),
        xStart = 0,
        yStart = 0;



    // console.log(pixels.data.length);


    while( (pixels.get( 0 , yStart+( sqVal-1 ) , 0 )) != undefined ){
      for (var y = yStart; y < yStart+sqVal; y+=sqVal){
        for (var x = xStart; x < xStart+sqVal; x+=sqVal){
          // console.log(x , y);
          for (var z = 0; z < 4; z++){
            flatArray.push(pixels.get(x, y, z));
            // console.log(pixels.get(x, y, z));
          }
          // console.log(flatArray);
          avgs.push(
            (flatArray[0] + flatArray[1] + flatArray[2]) / 3
          );
          // console.log(avgs);
          flatArray = []
        }
      }

      // console.log('\nfinish square' ,` starting from ( ${ xStart } , ${ yStart } ) down to ( ${ x-1  } , ${ y-1  } ) `);
      // console.log(sqVal);
      if (sqVal > 6) {
        console.log('GARBAGE');
        if( findAvg( avgs ) < 170 && findAvg( avgs ) > 85 ){
          asciiPic += '-'
        }else if ( findAvg( avgs ) <= 85 ) {
          asciiPic += '@'
        }else{
          asciiPic += '&nbsp;'
        }
      }else {
        if( findAvg( avgs ) <= 191.25 && findAvg( avgs ) > 127.5 ){
          asciiPic += '-'
        }else if( findAvg( avgs ) <= 127.5 && findAvg( avgs ) > 63.75 ){
          asciiPic += '='
        }else if ( findAvg( avgs ) <= 63.75 ) {
          asciiPic += '@'
        }else{
          asciiPic += '&nbsp;'
        }
      }
      avgs = [];




      //Check to see if there is space to run another square by seeing if you can run the length of x
      if ( pixels.get( x , ( pixels.shape[1] - 1 ) , z ) == undefined ) {
        // console.log('Next row');
        yStart = y;
        xStart = 0;
        asciiPic += '</p><p>';
      }else{
        // console.log('Keep on same row');
        yStart = y - sqVal;
        xStart = x
      }
      // console.log(xStart , yStart);
      // console.log(pixels.get( 21 , 8 , 0 ));
    }


    asciiPic += '</p>'
    console.log(asciiPic);
    console.log(Math.floor( Math.sqrt(pixels.shape[1]) ));
    if(callback) callback( asciiPic );
  })

}

function findAvg( r ){
  let sum = 0,
      avg = 0;
  for (let i = 0; i < r.length; i++) {
    sum += r[i]
  }
  avg = sum / r.length;
  return avg;
};

module.exports = function( app ){

  app.get( '/chk_logged' , function( req , res ){
    const loggedUsr = req.session.usr;
    console.log(`\n\n\n\n\n\n????? Logged user?\n` , loggedUsr );
    if( loggedUsr ){
      res.json( loggedUsr );
    }else{
      res.redirect('/');
    }
  });

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
    hatchwerk( "uploadedPic-1" , req.body.detail , function( newPortrait ){
      res.json( { 'msg': 'DONE! Click okay to see it!' , 'hatchwerk': newPortrait } );
    });
    fs.unlink("./client/assets/uploadedPic-1.jpg");

  })

  app.get( '/' , function( req , res ){
    res.render('index');
  });













  app.post( '/go' , function( req , res ){
    console.log('\n\nhere' , req.body);
    gpix("/Users/jamesbruno/Dropbox/hatchwerk/client/gheart.jpg", function(err, pixels) {
      if(err) {
        console.log("Bad image path")
        return
      }
      // console.log("got pixels", pixels.shape.slice())
      // console.log(pixels.data.slice() );

      var flatArray = [],
          avgs = [],
          asciiPic = '',
          sqVal = 9,
          xStart = 0,
          yStart = 0;



      // console.log(pixels.data.length);


      while( (pixels.get( 0 , yStart+( sqVal-1 ) , 0 )) != undefined ){
        for (var y = yStart; y < yStart+sqVal; y+=sqVal){
          for (var x = xStart; x < xStart+sqVal; x+=sqVal){
            console.log(x , y);
            for (var z = 0; z < 4; z++){
              flatArray.push(pixels.get(x, y, z));
              // console.log(pixels.get(x, y, z));
            }
            // console.log(flatArray);
            avgs.push(
              (flatArray[0] + flatArray[1] + flatArray[2]) / 3
            );
            // console.log(avgs);
            flatArray = []
          }
        }

        console.log('\nfinish square' ,` starting from ( ${ xStart } , ${ yStart } ) down to ( ${ x-1  } , ${ y-1  } ) `);

        if( findAvg( avgs ) < 170 && findAvg( avgs ) > 85 ){
          asciiPic += '-'
        }else if ( findAvg( avgs ) <= 85 ) {
          asciiPic += '@'
        }else{
          asciiPic += ' '
        }
        avgs = [];




        //Check to see if there is space to run another square by seeing if you can run the length of x
        if ( pixels.get( x , ( pixels.shape[1] - 1 ) , z ) == undefined ) {
          console.log('Next row');
          yStart = y;
          xStart = 0;
          asciiPic += '\n';
        }else{
          console.log('Keep on same row');
          yStart = y - sqVal;
          xStart = x
        }
        console.log(xStart , yStart);
        // console.log(pixels.get( 21 , 8 , 0 ));
      }



      console.log(asciiPic);
      console.log(Math.floor( Math.sqrt(pixels.shape[1]) ));

    })
  });




};
