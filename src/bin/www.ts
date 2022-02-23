#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugModule from 'debug';
import http from 'http';

import app from '../app';

import { createConnection } from 'typeorm';

import { User } from '../entity/User';

// TODO appName を使う
const debug = debugModule('express-typescript-template:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

createConnection()
  .then(async (connection) => {
    app.set('port', port);

    await connection.manager.save(
      connection.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27,
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: 'Phantom',
        lastName: 'Assassin',
        age: 24,
      })
    );

    console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
  })
  .catch((error) => console.log(error));

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port.toString()}`;

  // handle specific listen errors with friendly messages
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  function bind(): string {
    const addr = server.address();
    if (addr !== null) {
      if (typeof addr === 'string') {
        return `pipe ${addr}`;
      }

      if ('port' in addr) {
        return `port ${addr.port}`;
      }
    }
    return '';
  }

  debug(`Listening on ${bind()}`);
}
