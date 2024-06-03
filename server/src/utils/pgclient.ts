import pkg from "pg";
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL as string;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool
  .connect()
  .then(() => {
    console.log("Database is connected successfully.");
  })
  .catch((err: any) => {
    console.error("Error connecting to the database:", err);
  });

export default pool;
