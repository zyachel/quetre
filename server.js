import 'dotenv/config';
import app from './app.js';
import log from './utils/log.js';
import env from './utils/env.js';

process.on('uncaughtException', err => {
  log(err, 'error');
  process.exit(1);
});

const port = env.PORT;
const server = app.listen(port, () =>
  log(
    `server running in ${env.NODE_ENV} mode at port ${port}`,
    'success'
  )
);

process.on('unhandledRejection', err => {
  log(err, 'error');
  server.close(() => process.exit(1));
});
