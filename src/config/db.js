import { Pool } from "pg"
import { configDotenv } from "dotenv"
configDotenv()
let pool=new Pool({
    user:process.env.pguser,
    host:process.env.pghost,
    password:process.env.pgpassword,
    port:process.env.pgport,
    database:process.env.pgdatabase
}
)

export default pool




