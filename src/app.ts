import dotenv from 'dotenv';
import { Logs } from './library/logger';

process.on('beforeExit', code => {
  // Can make asynchronous calls
  setTimeout(() => {
    console.log(`Process will exit with code: ${code}`)
    process.exit(code)
  }, 100)
})

process.on('exit', code => {
  // Only synchronous calls
  console.log(`Process exited with code: ${code}`)
})


dotenv.config();

// needs to be called after dotenv.config()
Logs.dump.info({ content: 'app.main', message: 'tying to start the application' });
const { main } = require('./server')
main().catch((e: Error) => {
  Logs.dump.info({ content: 'app.main', error: e.message, stack: e.stack });
  console.error(e);
});
