import chalk from 'chalk';
import Logger from 'services/Logger';

const consoleMock: { [index: string]: jest.SpyInstance } = {};

beforeAll(() => {
  consoleMock.log = jest.spyOn(global.console, 'log').mockImplementation();
  consoleMock.warn = jest.spyOn(global.console, 'warn').mockImplementation();
  consoleMock.error = jest.spyOn(global.console, 'error').mockImplementation();
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('Can be newed', () => {
  const logger = new Logger();

  expect(logger).toBeInstanceOf(Logger);
});

test('.get returns an instance of the Logger', () => {
  expect(Logger.get()).toBeInstanceOf(Logger);
});

test('.get returns a singleton of the Logger', () => {
  expect(Logger.get()).toEqual(Logger.get());
});

test('.verbose logs to the console', () => {
  const logger = new Logger({ config: { default: 'verbose' } });
  logger.verbose('Test');
  expect(consoleMock.log).toBeCalledWith(surround(chalk.magenta('Verbose')), 'Test');
});

test('.info logs to the console', () => {
  const logger = new Logger({ config: { default: 'verbose' } });
  logger.info('Test');
  expect(consoleMock.log).toBeCalledWith(surround(chalk.green('Info')), 'Test');
});

test('.warn logs to the console', () => {
  const logger = new Logger({ config: { default: 'verbose' } });
  logger.warn('Test');
  expect(consoleMock.warn).toBeCalledWith(surround(chalk.yellow('Warn')), 'Test');
});

test('.error logs to the console', () => {
  const logger = new Logger({ config: { default: 'verbose' } });
  logger.error('Test');
  expect(consoleMock.error).toBeCalledWith(surround(chalk.red('Error')), 'Test');
});

test('Respects log level', () => {
  const logger = new Logger({ config: { default: 'warn' } });
  logger.verbose('Test');
  logger.info('Test');
  logger.warn('Test');
  expect(consoleMock.warn).toBeCalledWith(surround(chalk.yellow('Warn')), 'Test');
  logger.error('Test');
  expect(consoleMock.error).toBeCalledWith(surround(chalk.red('Error')), 'Test');
  expect(consoleMock.log).toBeCalledTimes(0);
});

test("Silent shouldn't log anything", () => {
  const logger = new Logger({ config: { default: 'silent' } });
  logger.verbose('Test');
  logger.info('Test');
  logger.warn('Test');
  logger.error('Test');
  expect(consoleMock.log).toBeCalledTimes(0);
  expect(consoleMock.warn).toBeCalledTimes(0);
  expect(consoleMock.error).toBeCalledTimes(0);
});

test('Ability to add category prefix', () => {
  const logger = new Logger({ category: 'Category', config: { default: 'verbose' } });
  logger.verbose('Test');
  expect(consoleMock.log).toBeCalledWith(surround(chalk.magenta('Verbose')), surround('Category'), 'Test');
  logger.info('Test');
  expect(consoleMock.log).toBeCalledWith(surround(chalk.green('Info')), surround('Category'), 'Test');
  logger.warn('Test');
  expect(consoleMock.warn).toBeCalledWith(surround(chalk.yellow('Warn')), surround('Category'), 'Test');
  logger.error('Test');
  expect(consoleMock.error).toBeCalledWith(surround(chalk.red('Error')), surround('Category'), 'Test');
});

test('Category respects log level', () => {
  const logger = new Logger({ category: 'Category', config: { default: 'verbose', Category: 'warn' } });
  logger.verbose('Test');
  logger.info('Test');
  logger.warn('Test');
  expect(consoleMock.warn).toBeCalledWith(surround(chalk.yellow('Warn')), surround('Category'), 'Test');
  logger.error('Test');
  expect(consoleMock.error).toBeCalledWith(surround(chalk.red('Error')), surround('Category'), 'Test');
  expect(consoleMock.log).toBeCalledTimes(0);
});

test('Category should keep colors', () => {
  const logger = new Logger({ category: chalk.green('Category') });
  logger.error('Test');
  expect(consoleMock.error).toBeCalledWith(surround(chalk.red('Error')), surround(chalk.green('Category')), 'Test');
});

function surround(string: string) {
  return chalk.gray('[') + string + chalk.gray(']');
}
