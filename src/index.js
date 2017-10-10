#!/usr/bin/env node --harmony

import spawn from "cross-spawn";
import os from "os";
import { exec } from "child_process";
import exit from 'exit';

function normalize( args, isWindows ) {
    return args.map( arg => {
        Object.keys( process.env )
            .sort( ( x, y ) => x.length < y.length ) // sort by descending length to prevent partial replacement
            .forEach( key => {
                const regex = new RegExp( `\\$${ key }|%${ key }%`, "ig" );
                arg = arg.replace( regex, process.env[ key ] );
            } );
        return arg;
    } )
}

let args = process.argv.slice( 2 );
if ( args.length === 1 ) {
    const [ command ] = normalize( args );
    const proc = exec( command, ( error, stdout, stderr ) => {
        if ( error ) {
            console.error( `exec error: ${ error }` );
            return;
        }
        process.stdout.write( stdout );
        process.stderr.write( stderr );
        exit(proc.code);
    });
} else {
    args = normalize( args );
    const command = args.shift();
    const proc = spawn.sync( command, args, { stdio: "inherit" } );
    exit(proc.status);
}
