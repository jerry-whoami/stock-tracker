import { Pool } from 'pg';
import { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } from '$env/static/private';

const connection = new Pool({
	user: PGUSER,
	password: PGPASSWORD,
	host: PGHOST,
	database: PGDATABASE
});

export const pool = connection;
