app.controller('bcktCtrl' , ['$scope' , 'bcktFctry' , 'usrFctry' , '$location' ,   function( scope , bf , uf , location ) {

    // const idx = function(){
    //   bf.idx( function(dataFromFactory ){
    //           scope.buckets = dataFromFactory;
    //   });
    // };
    //
    // idx();






  const idxLogged = function(){
    scope.thisUsr = {};
    uf.idxLogged( function( logged ){
      console.log(logged.data);
      scope.thisUsr = logged.data;
      console.log( `\n!#!#!# AFTER TRYING TO FIND LOGGED` , scope.thisUsr );
      if( !scope.thisUsr.name ){
        location.url('/dashboard')
        console.log('Sorry');
      };
    });

  };
  idxLogged();

  const idx_B = function(){
    uf.idx( function( dataFromCF ){
      scope.users = dataFromCF
    });
  };

  const idx_U = function(){
    uf.idx( function( dataFromCF ){
      scope.users = dataFromCF
    });
  };

  idx_U();




  scope.addBckt = function( newBckt ){
    scope.newBckt.usrId = scope.thisUsr._id;
    console.log(newBckt);
    bf.addBckt( newBckt );
    idx_U();

  };

  scope.doBckt = function( bckt ){
    bf.doBckt( bckt , function( dataFromBF ){
      console.log( ` HERE'S THE NEW TEST THING ${dataFromBF}` );
      console.log(dataFromBF);
    });
    idx_U();
  };


  var self = this;
  scope.simulateQuery = false;
  scope.isDisabled    = false;
  // list of states to be displayed
  scope.states        = loadStates();
  scope.querySearch   = querySearch;
  scope.selectedItemChange = selectedItemChange;
  scope.searchTextChange   = searchTextChange;
  scope.newState = newState;

  function newState(state) {
     alert("This functionality is yet to be implemented!");
  }
  function querySearch (query) {
  console.log('here');
     var results = query ? scope.states.filter( createFilterFor(query) ) : scope.states, deferred;
     if (scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () {
              deferred.resolve( results );
           },
       Math.random() * 1000, false);
        return deferred.promise;
     } else {
       console.log('returning', results);
        return results;
     }
  }
  function searchTextChange(text) {
     $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
     $log.info('Item changed to ' + JSON.stringify(item));
  }
  //build list of states as map of key-value pairs
  function loadStates() {
     var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
        Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
        Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
        Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
        North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
        South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
        Wisconsin, Wyoming';
     return allStates.split(/, +/g).map( function (state) {
        return {
           value: state.toLowerCase(),
           display: state
        };
     });
  }
  //filter function for search query
  function createFilterFor(query) {
     var lowercaseQuery = angular.lowercase(query);
     return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
     };
  }

}]);
