import { getArguments, normalize, execute, launch } from "./utils";

jest.mock( "process", cb => ( {
    argv: {
        slice: jest.fn().mockReturnValue( [ "1", "2" ] )
    },
    env: {
        version: "1.2.3"
    }
} ) );
jest.mock( "cross-spawn", cb => jest.fn() );
const crossSpawn = require( "cross-spawn" );
jest.mock( "child_process", cb => ( { exec: jest.fn() } ) );
const childProcess = require( "child_process" );

describe( "getArguments", () => {
    test( "removes the first two array items", () => {
        const args = getArguments();
        expect( args ).toEqual( [ "1", "2" ] );
    } );
} );

describe( "normalize", () => {
    describe( "bash", () => {
        test( "single argument", () => {
            const normalized = normalize( [ "hello $version world" ] );
            expect( normalized ).toEqual( [ "hello 1.2.3 world" ] );
        } );

        test( "multiple arguments", () => {
            const normalized = normalize( [ "hello", "$version", "world" ] );
            expect( normalized ).toEqual( [ "hello", "1.2.3", "world" ] );
        } );
    } );

    describe( "windows", () => {
        test( "single argument", () => {
            const normalized = normalize( [ "hello %version% world" ] );
            expect( normalized ).toEqual( [ "hello 1.2.3 world" ] );
        } );

        test( "multiple arguments", () => {
            const normalized = normalize( [ "hello", "%version%", "world" ] );
            expect( normalized ).toEqual( [ "hello", "1.2.3", "world" ] );
        } );
    } );
} );

describe( "execute", () => {
    test( "calls child_process exec", () => {
        execute( "echo 'Hello World'" );
        expect( childProcess.exec ).toHaveBeenCalledWith( "echo 'Hello World'", jasmine.any( Function ) );
    } );
} );

describe( "launch", () => {
    test( "calls cross-spawn", () => {
        launch( "echo", "Hello World" );
        expect( crossSpawn ).toHaveBeenCalledWith( "echo", "Hello World", { stdio: "inherit" } );
    } );
} );
