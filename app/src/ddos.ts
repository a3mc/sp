import cluster from 'cluster'
import { cpus } from 'os';
import process from 'process';
const fs = require('fs');
const readline = require('readline');

const numCPUs = cpus().length;

let allCommands: string[] = [];

const totalFiles = 6;

// async function processLineByLine() {
//     const fileStream = fs.createReadStream('input.txt');
//
//     const rl = readline.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity
//     });
//     // Note: we use the crlfDelay option to recognize all instances of CR LF
//     // ('\r\n') in input.txt as a single line break.
//
//     for await (const line of rl) {
//         // Each line in input.txt will be successively available here as `line`.
//         //console.log(`Line from file: ${line}`);
//         if ( line.length ) {
//             allCommands.push( line )
//         }
//
//     }
// }

export const ddos = async ( threads: string ) => {
    // Spawn main process
    let totalRequests = 0;
    let errorsCount = 0;
    let totalCount = 0;


    console.log( 'Available cpus', numCPUs );
    console.log( 'Launched threads', threads )

    console.log( 'Processing', totalFiles)

    for ( let i = 1; i <= totalFiles; i++ ){
        allCommands.push( './data_files/file' + i + '.txt');
    }

    if ( allCommands.length < Number( threads) ) {
        console.log( 'Commands size is less than threads. Limiting threads to', allCommands.length );
        threads = String( allCommands.length );
    }

    let commands: string[][] = [];



    console.log( 'Commands size:', allCommands.length );
    console.log( 'Chunk size:', Math.round( allCommands.length / Number( threads ) ) );


    let i, j, chunk = Math.round( allCommands.length / Number( threads ) );
    for ( i = 0, j = allCommands.length; i < j; i += chunk ) {
        commands.push( allCommands.slice( i, i + chunk ) );
    }

    cluster.setupMaster( {
        exec: `${ process.cwd() }/dist/worker.js`
    } )

    // Count threads
    let threadsCount = 0;

    for ( let i = 0; i < Number( threads ); i++ ) {
        const worker = cluster.fork();
        worker.send( { commands: commands[i] } );
        threadsCount++;
    }

    // cluster.on(
    //     'exit',
    //     ( worker, code, signal ) => {
    //         void code !== 0 &&
    //         console.log(
    //             `Worker ${ worker.process.pid } exited.`
    //         );
    //         // FIXME - handle message
    //         //console.log( 'Starting new worker.' );
    //         cluster.fork();
    //     }
    // );

    const messageHandler = ( message: any ) => {
        if( message && ( message.total !== undefined || message.errors !== undefined ) ) {
            totalCount += message.total;
            errorsCount += message.errors;
            console.log( 'Total sent:', totalCount, 'Total errors:', errorsCount )
        } else {
            console.log( 'Message from worker:', message )
            console.log( 'Sent:', totalCount, 'Errors:', errorsCount )
        }
    }

    for ( const id in cluster.workers ) {
        cluster.workers[id]?.on( 'message', messageHandler );
    }
}


