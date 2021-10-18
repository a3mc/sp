import cluster from 'cluster'
import { red } from 'colorette'
import { cpus } from 'os';
import process from 'process';
import blessed, { colors } from 'blessed';
import contrib from 'blessed-contrib';


const numCPUs = cpus().length;

export const ddos = ( threads: string, host: string, amount: string) => {
    // Spawn main process
    let totalRequests = 0;
    let errorsCount: number[] = [0];

    const consoleScreen = blessed.screen();
    consoleScreen.key( ['escape', 'q', 'C-c'], () => {
        return process.exit( 0 );
    } );

    const grid = new contrib.grid( { top: 30, rows: 12, cols: 12, screen: consoleScreen } );

    const box1 = grid.set(
        0, 0, 3, 3, blessed.list,
        {
            label: ' Setup ',
            tags: true,
            items: [
                '',
                '{gray-fg}URL:{/} {yellow-fg}{bold}{underline}' + host + '{/}',
                '{gray-fg}Total requests:{/} {green-fg}{bold} ' + totalRequests + ' {/}',
                '{gray-fg}Error responses:{/} {red-fg} '+ errorsCount+' {/}',
                '{gray-fg}Workers:{/} {blue-fg}{bold}' + threads + '{/}',
                '{gray-fg}Requests per worker:{/} {bold}' + amount + '{/}',
                '{gray-fg}Threads available:{/} {bold}' + numCPUs + '{/}'
            ]
        }
    );

    const errorsLine = grid.set(0, 6, 6, 6, contrib.line,
        { style:
                { line: "red"
                    , text: "white"
                    , baseline: "black"}
            , label: 'Errors Rate %'
            , maxY: 60
            , showLegend: true })

    const transactionsLine = grid.set(6, 6, 6, 6, contrib.line,
        { showNthLabel: 5
            , maxY: 100
            , label: 'Total Transactions'
            , showLegend: true
            , legend: {width: 10}})

    // const setBox1 = () => {
    //     box1.list.setContent( 'test');
    // }

    let errorsData = {
        title: 'Errors rate %',
        x: ['0'],
        y: [0]
    }

    consoleScreen.render();


    cluster.setupMaster( {
        exec: `${ process.cwd() }/dist/worker.js`,
        args: [host, amount]
    } )

    // Count threads
    let threadsCount = 0

    for ( let i = 0; i < Number( threads ); i++ ) {
        cluster.fork()

        threadsCount++
    }

    cluster.on(
        'exit',
        ( worker, code, signal ) => {
            void code !== 0 &&
            console.log(
                red( `
Worker ${ worker.process.pid } died. Before the death he said ${ signal }.` )
            );
            // FIXME - handle message
            //console.log( 'Starting new worker.' );
            //cluster.fork();
        }
    );

    function setLineData( mockData:any , line: any ) {
        // for (let i=0; i<mockData.length; i++) {
        //     const last = mockData[i].y[mockData[i].y.length-1]
        //     mockData[i].y.shift()
        //     const num = Math.max(last + Math.round(Math.random()*10) - 5, 10)
        //     mockData[i].y.push(num)
        // }

        line.setData(mockData)
    }

    const messageHandler = ( message: any ) => {
        if ( message.total && message.errors ) {
            errorsCount.push( Math.round( Number( message.total ) / Number( message.errors ) ) );
            //setBox1();
            errorsCount = errorsCount.splice( - 50 )
            let x = [];
            for ( let i = 0; i < 50; i ++ ) {
                x.push(i);
            }
            errorsData = {
                title: 'Error responses',
                x: [x.join(' ')],
                y: [...errorsCount]
            }
            setLineData([errorsData], errorsLine)
            consoleScreen.render();
        }
    }

    for ( const id in cluster.workers ) {
        cluster.workers[id]?.on('message', messageHandler);
    }
}


