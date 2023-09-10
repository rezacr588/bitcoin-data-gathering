export const config = {
  connectionString:
    "postgres://fchszuxs:hKdwCjO_2u3ogekA_LvMShLA2uUnIIrt@berry.db.elephantsql.com/fchszuxs",
  vercel_pg_connection_string:
    "postgres://default:HsPubQ4t2vMp@ep-delicate-sun-86744836.us-east-1.postgres.vercel-storage.com:5432/verceldb",
};

export const vercelDatabaseConfig = {
  connectionString: config.vercel_pg_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
};
