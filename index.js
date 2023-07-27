#!/usr/bin/env node

require('@babel/register')({
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                }
            }
        ]
    ],
    only: [/src/]
});
require( "./src/index.js" );
