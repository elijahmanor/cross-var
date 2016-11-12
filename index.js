#!/usr/bin/env node

console.log( process.argv );
console.log( process.argv.slice( 2 ) );

function kickIt( args ) {
	return args;
}

const updatedArgs = kickIt( process.argv.slice( 2 ) );

// const command = newArgv.shift();
// const proc    = Spawn( command, newArgv, { stdio: 'inherit' } );

console.log( process.env );
