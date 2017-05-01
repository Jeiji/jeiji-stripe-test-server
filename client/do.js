//
// $(window).on("load", function(){
//   let pic = new Image(301 , 301);
//   pic.src = 'http://www.placekitten.com/301/301'
//   console.log(pic);
//
//   var canvas;
//
//   // Converts image to canvas; returns new canvas element
//   function convertImageToCanvas(image) {
//     console.log('hi');
//   canvas = document.createElement("canvas");
//   $('body').append(canvas);
//   console.log( $('canvas') );
//   // $(canvas).attr('src' , 'http://www.placekitten/301/301')
//   canvas.width = image.width;
//   canvas.height = image.height;
//   canvas.getContext("2d").drawImage(image, 0, 0);
//   return canvas;
//   }
//
//   pic = convertImageToCanvas( pic );
//
//   console.log(pic);
//   console.log('hi');
//
//   var c = pic;
//   var ctx = c.getContext("2d");
//   var imgData = ctx.getImageData(0, 0, c.width, c.height);
//   // invert colors
//   // for (i = 0; i < imgData.data.length; i += 4) {
//   //     imgData.data[i] = 255 - imgData.data[i];
//   //     imgData.data[i+1] = 255 - imgData.data[i+1];
//   //     imgData.data[i+2] = 255 - imgData.data[i+2];
//   //     imgData.data[i+3] = 255;
//   // }
//   // ctx.putImageData(imgData, 0, 0);
//   $('body').prepend(pic);
//
// });



$('img').click(function(){
  $.post('/go' , {'hello':'wow'})
});

$(window).on('load', function(){
  // document.getElementById("pic").onload = function() {

      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      let img = new Image(301 , 301);
      img.src = '301.jpg'
      img.id = 'hi'
      // img.crossorigin = 'file:///Users/jamesbruno/Dropbox/hatchwerk/301.jpg';
      $('body').append(img);
      $('#hi').one('load' , function(){
        console.log(img);
        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, c.width, c.height);
        // invert colors
        for (i = 0; i < imgData.data.length; i += 4) {
          if ( ( (imgData.data[i] + imgData.data[i+1] + imgData.data[i+2]) / 3 ) > 127.5 ) {
            imgData.data[i] = 255;
            imgData.data[i+1] = 255;
            imgData.data[i+2] = 255;
            imgData.data[i+3] = 255;
          }else{
            imgData.data[i] = 0;
            imgData.data[i+1] = 0;
            imgData.data[i+2] = 0;
            imgData.data[i+3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }).each(function() {
        if(this.complete) $(this).load();
      });

  // };
});
