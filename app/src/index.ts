// @ts-ignore
import cfonts from 'cfonts'
import { blue, cyan, underline, yellow } from 'colorette'
import { ddos } from './ddos';
import { cpus } from 'os';
import process from 'process';
import blessed, { colors } from 'blessed';
import contrib from 'blessed-contrib';

// const consoleScreen = blessed.screen();
// consoleScreen.key( ['escape', 'q', 'C-c'], () => {
//     return process.exit( 0 );
// } );

const numCPUs = cpus().length;


const title = cfonts.render( 'KILL \'EM ALL!', {
    gradient: ['yellow', 'red'],
    transitionGradient: true,
    font: 'tiny'
} ).string;
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
    ddos( '8', 'x', '1024' );
//}
