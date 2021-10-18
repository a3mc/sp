import blessed, { colors } from 'blessed';
import contrib from 'blessed-contrib';

const consoleScreen = blessed.screen();
consoleScreen.key( ['escape', 'q', 'C-c'], () => {
    return process.exit( 0 );
} );

const grid = new contrib.grid( { top: 30, rows: 12, cols: 12, screen: consoleScreen } );

const box1 = grid.set(
    0, 0, 3, 3, blessed.list,
    {
        label: ' Status ',
        tags: true,
        items: [
            '',
            '{gray-fg}Jailed:{/} {green-bg}{bold} NO {/}',
            '{gray-fg}Catching up:{/} {green-bg}{bold} NO {/}',
            '{gray-fg}Version:{/} {red-fg}{bold}v0.34.12{/}',
            '{gray-fg}Last block:{/} {bold}202939{/}',
            '{gray-fg}Balances (umee):{/} {bold}1101710428{/}'
        ]
    }
);

const box2 = grid.set(
    3, 0, 3, 3, blessed.list,
    {
        label: ' Validator Info ',
        tags: true,
        items: [
            '',
            '{gray-fg}Moniker:{/} {blue-fg}{bold}ART3MIS.CLOUD{/}',
            '{gray-fg}Details:{/} {yellow-fg}INDEPENDENT RESEARCH LAB{/}',
            '{gray-fg}Network:{/} {green-fg}{bold}umee-betanet-2{/}',
            '{gray-fg}Channels:{/} 40202122233038606100',
            '{gray-fg}Identity:{/} 5C6631681B91055A',
            '{gray-fg}Website:{/} {blue-fg}{underline}https://art3mis.cloud{/}',
            '{gray-fg}RPC address:{/} tcp://127.0.0.1:26657',
            '{gray-fg}Listen address:{/} 146.0.74.117:26656'
        ]
    }
);

// const box3 = grid.set(
//     0, 0, 2, 6, blessed.list,
//     {
//         label: 'Addresses',
//         items: [
//             'Operator: umeevaloper1fsffl8gzuyr72z5653p3ycmy2jdc2w5d3g8wca',
//             'Consensus: FAAmTBdMl60zulblkft7YzRTSD6h1h1h5ve6v+gudqY='
//         ]
//     }
// );

// const gauge1 = grid.set(
//     6, 0, 2, 3, contrib.gauge,
//     { label: 'CPU (96 cores)', stroke: 'green', fill: 'white' },
// );
//
// gauge1.setPercent(25);

const bar = grid.set(
    6, 0, 4, 3, contrib.bar,
    { label: ' Server (96/512GB) % '
        , barBgColor: 'green'
        , barWidth: 10
        , barSpacing: 14
        , xOffset: 4
        , maxHeight: 100})

bar.setData(
    { titles: ['CPU (all)', 'Memory']
        , data: [12.2, 3.4]}
);

const line = grid.set(
    0, 3, 3, 4, contrib.line,
    { style:
            { line: "yellow"
                , text: "green"
                , baseline: "black"}
        , xLabelPadding: 3
        , xPadding: 5
        , label: 'Transactions per minute'},
    );

line.setData(
    {
        x: ['t1', 't2', 't3', 't4'],
        y: [5, 1, 7, 5]
    }
);

const line2 = grid.set(
    3, 3, 3, 4, contrib.line,
    { style:
            { line: "yellow"
                , text: "green"
                , baseline: "black"}
        , xLabelPadding: 3
        , xPadding: 5
        , label: 'Something per second'},
);

line2.setData(
    {
        x: ['t1', 't2', 't3', 't4', 't5', 't6'],
        y: [500, 8, 730, 54]
    }
);

const log = grid.set(
    0, 7, 3, 5, contrib.log,
    { fg: "green"
        , selectedFg: "green"
        , tags: true
        , label: 'Processed blocks'},
);

log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("{red-fg}new log line{/}")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")
log.log("new log line")


consoleScreen.render()
