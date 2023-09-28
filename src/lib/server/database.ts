import pg from 'pg';
import { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } from '$env/static/private';

const connection = new pg.Pool({
	user: PGUSER,
	password: PGPASSWORD,
	host: PGHOST,
	database: PGDATABASE
});

export const pool = connection;
