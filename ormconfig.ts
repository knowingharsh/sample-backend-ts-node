module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [
    "src/database/entities/*.ts"
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ],
  cli: {
    "entitiesDir": "src/database/entities",
    "migrationsDir": "src/database/migrations",
    "subscribersDir": "src/database/subscribers"
  },
  // https://betterprogramming.pub/typeorm-migrations-explained-fdb4f27cb1b3
  // make sure synchronize is always false, true -> can be used at fresh db startup
  synchronize: false, 
  logging: true
}