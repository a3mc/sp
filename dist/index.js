"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const cfonts_1 = (0, tslib_1.__importDefault)(require("cfonts"));
const ddos_1 = require("./ddos");
const os_1 = require("os");
// const consoleScreen = blessed.screen();
// consoleScreen.key( ['escape', 'q', 'C-c'], () => {
//     return process.exit( 0 );
// } );
const numCPUs = (0, os_1.cpus)().length;
const title = cfonts_1.default.render('KILL \'EM ALL!', {
    gradient: ['yellow', 'red'],
    transitionGradient: true,
    font: 'tiny'
}).string;
//console.log( title )
//const args = process.argv.slice( 2, process.argv.length )
// if( !args || args.length < 2 ) {
//     console.log( yellow( `\n Args:\n` ), cyan( `\n<threads> <url> <request per worker>` ) )
// } else {
//
// console.log(
//     `Running in ${ blue( args[0] ) } threads on ${ underline( blue( args[1] ) ) }
//      with ${ blue( args[2] ) } parallel requests per thread'\n\n`
// );
//ddos( args[0], args[1], args[2] );
(0, ddos_1.ddos)('8', 'x', '1024');
//}
