#!/usr/bin/env node --harmony

import spawn from "cross-spawn";
import os from "os";
import { exec } from "child_process";

function normalize( args, isWindows ) {
    return args.map( arg => {
        Object.keys( process.env ).forEach( key => {
            const regex = new RegExp( `\\$${ key }|%${ key }%`, "i" );
            arg = arg.replace( regex, process.env[ key ] );
        } );
        return arg;
    } )
}

let args = process.argv.slice( 2 );
if ( args.length === 1 ) {
    const [ command ] = normalize( args );
    exec( command, ( error, stdout, stderr ) => {
        if ( error ) {
            console.error( `exec error: ${ error }` );
            return;
        }
        process.stdout.write( stdout );
        process.stderr.write( stderr );
    });
} else {
    args = normalize( args );
    const command = args.shift();
    const proc = spawn( command, args, { stdio: "inherit" } );
}
