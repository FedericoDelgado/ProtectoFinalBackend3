import { join } from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'node:os';

// ruta directorio.
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const numCPUs = cpus().length;
 
export { __dirname, join as __dirJoin, numCPUs }