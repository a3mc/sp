"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const process_1 = (0, tslib_1.__importDefault)(require("process"));
let errors = 0, success = 0, errorMessages = [];
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
    }, 10);
    setInterval(() => {
        // @ts-ignore
        process_1.default.send({ total: totalRequests, errors: errors });
        totalRequests = 0;
        //console.log( process.pid + `: Requests: ${ blue( totalRequests ) } Errors: ${ red( errors ) } Current: ${ requests }`)
    }, 1000);
    const request = async () => {
        let isFailedRequest = false;
        const response = await axios_1.default.get(host).catch((err) => {
            if (err) {
                isFailedRequest = true;
                errors++;
            }
        });
        if (response) {
            isFailedRequest = false;
        }
        requests--;
    };
};
worker(process_1.default.argv[2], process_1.default.argv[3]);
