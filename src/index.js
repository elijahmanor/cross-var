#!/usr/bin/env node --harmony

import spawn from "cross-spawn";
import os from "os";
import { exec } from "child_process";
import exit from 'exit';
const isWindows = (process.platform.substr(0, 3) === "win");

function normalize( args ) {
    const isWindows = (process.platform.substr(0, 3) === "win");
    return args.map( arg => {
        const regex = new RegExp( `\\$(\\w+)|%(\\w+)%`, "i" );
        const key = (arg.match(regex) !== null) ? arg.match(regex)[1] : undefined;
        const value = (isWindows && process.env[key] === undefined) ? '' : process.env[key];
        arg = arg.replace(regex, value);
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
