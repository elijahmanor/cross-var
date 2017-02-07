import process from "process";
import spawn from "cross-spawn";
import { exec } from "child_process";

export function getArguments() {
    return process.argv.slice( 2 );
}

export function normalize( args ) {
    return args.map( arg => {
        Object.keys( process.env ).forEach( key => {
            const regex = new RegExp( `\\$${ key }|%${ key }%`, "i" );
            arg = arg.replace( regex, process.env[ key ] );
        } );
        return arg;
    } )
}

export function execute( command ) {
    exec( command, ( error, stdout, stderr ) => {
        if ( error ) {
            console.error( `exec error: ${ error }` );
            return;
        }
        process.stdout.write( stdout );
        process.stderr.write( stderr );
    });
}

export function launch( command, args ) {
    const proc = spawn( command, args, { stdio: "inherit" } );
}
