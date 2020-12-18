export const logConfig: { [index: string]: string } & { default: string } = {
  default: process.env.LOG_LEVEL || 'info',
  Database: 'error',
};

export default {
  logConfig,
};
