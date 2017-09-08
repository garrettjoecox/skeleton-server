
import config from '../config';
import * as chalk from 'chalk';

const logLevels: { [index:string] : number }  = {
  verbose: 3,
  info: 2,
  error: 1,
};

export default class Logger {
  private location: string;
  private logLevel: number = logLevels[config.logLevel] || 0;

  constructor(location?: string) {
    if (location) this.location = this.surround(location);
  }

  log(...args: any[]) {
    if (this.location) args.unshift(this.location);
    console.log(...args);
  }

  verbose(...args: any[]) {
    if (this.logLevel < 3) return;

    args.unshift(this.surround(chalk.magenta('Verbose')));
    if (this.location) args.unshift(this.location);
    console.log(...args);
  }

  info(...args: any[]) {
    if (this.logLevel < 2) return;

    args.unshift(this.surround(chalk.green('Info')));
    if (this.location) args.unshift(this.location);
    console.log(...args);
  }

  error(...args: any[]) {
    if (this.logLevel < 1) return;

    args.unshift(this.surround(chalk.red('Error')));
    if (this.location) args.unshift(this.location);
    console.log(...args);
  }

  private surround(prefix: string) {
    return chalk.gray('[') + prefix + chalk.gray(']');
  }
}
