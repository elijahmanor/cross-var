#!/usr/bin/env node --harmony

import spawn from "cross-spawn";
import os from "os";
import { exec } from "child_process";
import { getArguments, execute, launch } from "./utils";

let args = getArguments();

if ( args.length === 1 ) {
    const [ command ] = normalize( args );
    execute( command );
} else {
    args = normalize( args );
    const command = args.shift();
    launch( command, args );
}
