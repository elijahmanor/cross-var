#!/usr/bin/env node --harmony

import spawn from "cross-spawn";
import os from "os";
import  { exec } from "child_process";

function isWindows() {
    return os.platform() === "win32";
}

console.log( process.argv.slice( 2 ) );
console.log( "isWindows", isWindows() );

function normalize( args, isWindows ) {
    return args.map( arg => {
        Object.keys( process.env ).forEach( key => {
            const hasKey = arg.indexOf( key );
            if ( hasKey ) {
                if ( isWindows ) {
                    arg.replace( `$${ key }`, process.env[ key ] );
                } else {
                    arg.replace( `%${ key }%`, process.env[ key ] );
                }
            }
        } );
        return arg;
    } )
}

let args = process.argv.slice( 2 );
if ( args.length === 1 ) {
    const [ command ] = normalize( args, isWindows() );
    console.log( "exec", command );
    exec( command, ( error, stdout, stderr ) => {
        if ( error ) {
            console.error( `exec error: ${ error }` );
            return;
        }
        process.stdout.write( stdout );
        process.stderr.write( stderr );
    });
} else {
    args = normalize( args, isWindows() );
    const command = args.shift();
    console.log( "spawn", command, args );
    const proc = spawn( command, args, { stdio: "inherit" } );
}
