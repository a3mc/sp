import process from 'process';
import * as fs from 'fs';
const { exec } = require( 'child_process' );
let errors = 0;


const worker = () => {
    // Send requests with interval

    let commands: number[] = [];
    let started = false;
    let requests = 0;

    process.on('message', ( data ) => {
        if ( data.commands ) {
            console.log( 'worker recieved', data );
            commands = data.commands;
            started = true;
            request();
        }
    });

    process.on('exit', ( data ) => {
        // @ts-ignore
        process.send( { total: requests, errors: errors } );
    });


    const request = async () => {
        if ( commands && !commands.length ) {
            console.log( 'Worker finished' );
            process.exit(1 );
            return;
        }
        const command = commands.shift();
        //console.log( 'Exec on key:', command);
        requests++;
        exec( `umeed tx bank send "key.${command}" "umee17t97n5emfkr976d3jwxk4dj99j672j60m0y8na" "1uumee" \
    --chain-id "umeevengers-1c" \
    --keyring-backend test \
    --note "ART3MIS.CLOUD" \
    --gas-prices "0.00001uumee" \
    --broadcast-mode async \
    --timeout-height 1000000 \
    -y`, {
            maxBuffer: 1024 * 1024 * 16,
            timeout: 0
        }, ( err: any, stdout: any, stderr: any ) => {
            if( err ) {
                errors ++;
                //some err occurred
                //console.log( err )
                //console.log( stderr )
                // Repeat even on errors
                // if ( command ) {
                //     commands.push( command );
                // }

            } else {
                fs.appendFileSync('log.txt', stdout);
            }

            if ( command ) {
                commands.push( command );
            }


            if ( commands && commands.length ) {
                request();
            } else {
                console.log( 'Worker finished' );
                process.exit(1 );
            }
        } );

    }
}

worker();
