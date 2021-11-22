"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const process_1 = (0, tslib_1.__importDefault)(require("process"));
const { exec } = require('child_process');
let errors = 0, success = 0, errorMessages = [];
const net = require('net');
const HOST = '135.181.16.249';
const PORT = 26656;
const worker = (host, amount) => {
    // Send requests with interval
    let requests = 0;
    let totalRequests = 0;
    setInterval(() => {
        if (requests < Number(amount)) {
            requests++;
            totalRequests++;
            request();
        }
    }, 5);
    setInterval(() => {
        // @ts-ignore
        process_1.default.send({ total: totalRequests, errors: errors });
        totalRequests = 0;
        //console.log( process.pid + `: Requests: ${ blue( totalRequests ) } Errors: ${ red( errors ) } Current: ${ requests }`)
    }, 1000);
    const request = async () => {
        // exec(`${ process.cwd() } netcat 135.181.16.249:26656 packet`, (err: any, stdout:any, stderr:any) => {
        //     if (err) {
        //         //some err occurred
        //         console.error(err)
        //     } else {
        //         // the *entire* stdout and stderr (buffered)
        //         console.log(`stdout: ${stdout}`);
        //         console.log(`stderr: ${stderr}`);
        //     }
        // });
        let isFailedRequest = false;
        // const response = await axios.post(
        //     host,
        //     {x:1}
        // ).catch( ( err: any ) => {
        //     if( err ) {
        //         console.log(err)
        //         isFailedRequest = true
        //         errors++
        //         process.exit(0)
        //     }
        // } );
        // if( response ) {
        //     console.log(response)
        //     isFailedRequest = false
        // }
        // requests --;
        //let client = net;
        //let hexVal: Uint8Array = `504f5354202f6c696e653320485454502f312e310d0a557365722d4167656e743a206e6f64652d6170700d0a4163636570743a202a2f2a0d0a686f73743a203139322e3136382e31342e39343a333030300d0a636f6e74656e742d747970653a206170706c69636174696f6e2f6a736f6e0d0a636f6e74656e742d6c656e6774683a2031390d0a436f6e6e656374696f6e3a20636c6f73650d0a0d0a227b757365726e616d653a202776616c277d22`;
        const bytesToSend = [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6];
        const bytes = bytesToSend[Math.floor(Math.random() * bytesToSend.length)];
        const hexVal = new Uint8Array([bytes]);
        //const hexVal = fs.readFileSync('packet', null)
        const client = net.connect(PORT, HOST, function () {
            //console.log( 'CONNECTED TO: ' + HOST + ':' + PORT );
            client.write(hexVal);
            //client.destroy(); // Close the client socket completely
            //requests--
            //requests--
        });
        client.on('data', (data) => {
            //console.log( '1' );
            //console.log( 'DATA: ' + data );
            // Close the client socket completely
        });
        client.on('close', function () {
            //console.log( 'Connection closed' );
            client.destroy();
            requests--;
        });
        client.on('error', () => {
            errors++;
            //console.log( 'Err' );
        });
    };
};
worker(process_1.default.argv[2], process_1.default.argv[3]);
