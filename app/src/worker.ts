import axios from 'axios';
import process from 'process';

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
        process.send({ total: totalRequests, errors: errors });
        totalRequests = 0;

        //console.log( process.pid + `: Requests: ${ blue( totalRequests ) } Errors: ${ red( errors ) } Current: ${ requests }`)
    }, 1000 );

    const request = async () => {
        let isFailedRequest = false
        const response = await axios.get(
            host
        ).catch( ( err: any ) => {
            if( err ) {
                isFailedRequest = true
                errors++
            }
        } );
        if( response ) {
            isFailedRequest = false
        }
        requests --;
    }
}

worker( process.argv[2], process.argv[3] )
