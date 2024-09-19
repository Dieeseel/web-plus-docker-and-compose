export default () => ({
    server: {
        port: parseInt(process.env.PORT, 10) || 3000,
    },

    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE)
    },

    jwt: {
      jwt_secret: process.env.JWT_SECRET
    }
});