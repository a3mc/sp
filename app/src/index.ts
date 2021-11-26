// @ts-ignore
import { ddos } from './ddos';
import { cpus } from 'os';

const numCPUs = cpus().length;


ddos( '32' );
