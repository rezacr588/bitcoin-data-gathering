export const config = {
  connectionString:
    "postgres://fchszuxs:hKdwCjO_2u3ogekA_LvMShLA2uUnIIrt@berry.db.elephantsql.com/fchszuxs",
};

export const vercelDatabaseConfig = {
  connectionString: config.vercel_pg_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
  polygonApiKey: "Wzp8WvJLReKw73O9TmgILKiUTA2lnfFA",
};
