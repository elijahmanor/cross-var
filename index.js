#!/usr/bin/env node

require( "babel-register" )( {
    ignore: false,
    only: /cross-var\/src/
} );
require( "./src/index.js" );
