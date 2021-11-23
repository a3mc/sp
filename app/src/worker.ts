import process from 'process';
const { exec } = require( 'child_process' );
let errors = 0;


const worker = () => {
    // Send requests with interval

    let commands: string[] = [];
    let started = false;
    let requests = 0;

    process.on('message', ( data ) => {
        console.log('worker recieved', data);
        commands = data.commands;
        started = true;
        if ( commands.length ) {
            request();
        }
    });

    process.on('exit', ( data ) => {
        // @ts-ignore
        process.send( { total: requests, errors: errors } );
    });


    const request = async () => {
        const command = commands.pop();
        console.log( 'Exec command:', command);
        requests++;
        exec( command, ( err: any, stdout: any, stderr: any ) => {
            if( err ) {
                errors ++;
                //some err occurred
                console.log( err )
                console.log( stderr )
            } else {
                console.log( `stdout: ${ stdout }` );
            }

            if ( commands.length ) {
                request();
            } else {
                console.log( 'Worker finished' );
                process.exit(1 );
            }
        } );

    }
}

worker();
