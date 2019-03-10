import debug from 'debug';

const BASE = 'react-app';
const COLOURS = {
  trace: 'lightblue',
  info: 'blue',
  warn: 'pink',
  error: 'red',
}; // choose better colours :)

class Logger {
  generateMessage(level, message, source) {
    // Set the prefix which will cause debug to enable the message
    this.namespace = `${BASE}:${level}`;
    this.createDebug = debug(this.namespace);

    // Set the colour of the message based on the level
    this.createDebug.color = COLOURS[level];

    if (source) {
      this.createDebug(source, message);
    } else {
      this.createDebug(message);
    }
  }

  trace(message, source) {
    return this.generateMessage('trace', message, source);
  }

  info(message, source) {
    return this.generateMessage('info', message, source);
  }

  warn(message, source) {
    return this.generateMessage('warn', message, source);
  }

  error(message, source) {
    return this.generateMessage('error', message, source);
  }
}

export default new Logger();
