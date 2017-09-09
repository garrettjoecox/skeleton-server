
export = {

  logLevel: 'error',

  database: {
    user: process.env.MYSQL_USER || undefined,
    password: process.env.MYSQL_PASSWORD || undefined,
    database: process.env.MYSQL_DATABASE || 'skeletontest',
  },

};
