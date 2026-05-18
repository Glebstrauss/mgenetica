const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'change_this_in_production',
  pgConnection: process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING || 'postgres://postgres:postgres@localhost:5432/mgenetica'
};
