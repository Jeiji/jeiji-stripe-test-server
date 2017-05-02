function randInt( min , max ){
    if ( !max ){
      max = min;
      min = 0;
    }
    return ( Math.floor( Math.random() * ( ( max ) - min ) + min ) )
}

console.log( randInt( 23 ) );
