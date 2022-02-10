module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'ran-chat',
  entities: ['dist/**/**.entity{.ts,.js}'],
  synchronize: true,
  timezone: 'Z',
  logging: false,
};
