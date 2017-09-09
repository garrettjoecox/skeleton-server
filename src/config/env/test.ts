
export = {

  logLevel: 'error',

  database: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'skeletontest',
  },

};
