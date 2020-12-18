export const logConfig: { [index: string]: number } = {
  default: parseInt(process.env.LOG_LEVEL!, 10) || 4,
  Database: 3,
};

export default {
  logConfig,
};
