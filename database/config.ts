import postgres from 'postgres';
async function connectionDb() {
    const sql = postgres(process.env.DATABASE_URL as string, { ssl: 'require' });
    return sql;
}
export default connectionDb;