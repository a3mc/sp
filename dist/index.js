"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const cfonts_1 = (0, tslib_1.__importDefault)(require("cfonts"));
const colorette_1 = require("colorette");
const ddos_1 = require("./ddos");
const os_1 = require("os");
const process_1 = (0, tslib_1.__importDefault)(require("process"));
const blessed_1 = (0, tslib_1.__importDefault)(require("blessed"));
const consoleScreen = blessed_1.default.screen();
consoleScreen.key(['escape', 'q', 'C-c'], () => {
    return process_1.default.exit(0);
});
const numCPUs = (0, os_1.cpus)().length;
const title = cfonts_1.default.render('KILL \'EM ALL!', {
    gradient: ['yellow', 'red'],
    transitionGradient: true,
    font: 'tiny'
}).string;
//console.log( title )
const args = process_1.default.argv.slice(2, process_1.default.argv.length);
if (!args || args.length < 2) {
    console.log((0, colorette_1.yellow)(`\n Args:\n`), (0, colorette_1.cyan)(`\n<threads> <url> <request per worker>`));
}
else {
    // console.log(
    //     `Running in ${ blue( args[0] ) } threads on ${ underline( blue( args[1] ) ) }
    //      with ${ blue( args[2] ) } parallel requests per thread'\n\n`
    // );
    (0, ddos_1.ddos)(args[0], args[1], args[2]);
}
