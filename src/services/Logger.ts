/* eslint-disable no-console */
import chalk from 'chalk';
import { logConfig } from 'config';
import strip from 'strip-ansi';

const LOG_LEVELS: { [index: string]: number } = {
  verbose: 4,
  info: 3,
  warn: 2,
  error: 1,
  silent: 0,
};

let loggerSingleton: Logger;

export default class Logger {
  static get() {
    if (!loggerSingleton) {
      loggerSingleton = new Logger();
    }

    return loggerSingleton;
  }

  private category?: string;

  private strippedCategory?: string;

  private logLevel: number;

  constructor(options: { category?: string; config?: typeof logConfig } = {}) {
    const { category, config } = { config: logConfig, ...options };
    if (category) {
      this.category = this.surround(category);
      this.strippedCategory = strip(category);
    }

    if (this.strippedCategory && this.strippedCategory in config) {
      this.logLevel = LOG_LEVELS[config[this.strippedCategory]!]!;
    } else {
      this.logLevel = LOG_LEVELS[config.default]!;
    }
  }

  verbose(...args: any[]) {
    if (this.logLevel < 4) return;

    if (this.category) args.unshift(this.category);
    args.unshift(this.surround(chalk.magenta('Verbose')));
    console.log(...args);
  }

  info(...args: any[]) {
    if (this.logLevel < 3) return;

    if (this.category) args.unshift(this.category);
    args.unshift(this.surround(chalk.green('Info')));
    console.log(...args);
  }

  warn(...args: any[]) {
    if (this.logLevel < 2) return;

    if (this.category) args.unshift(this.category);
    args.unshift(this.surround(chalk.yellow('Warn')));
    console.warn(...args);
  }

  error(...args: any[]) {
    if (this.logLevel < 1) return;

    if (this.category) args.unshift(this.category);
    args.unshift(this.surround(chalk.red('Error')));
    console.error(...args);
  }

  // eslint-disable-next-line class-methods-use-this
  private surround(string: string) {
    return chalk.gray('[') + string + chalk.gray(']');
  }
}
