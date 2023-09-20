# NOMBRE DE TIENDA

Sistema de gestión de inventario de una tienda de zapatillas

## Herramientas necesarias

- Nodejs y npm
- Docker desktop

## Instalar proyecto

1. Renombrar el archivo .env.example a .env

```bash
mv .env.example .env
```

2. Instalar las dependencias del proyecto

```bash
npm install
```

3. Preparar la base de datos(Puede que tengas que cambiar el nombre del contenedor)

```bash
docker cp ./database/seeder.csv stocktracker-postgres-1:/docker-entrypoint-initdb.d/products.csv
cat ./database/migrations.sql | docker exec -i stocktracker-postgres-1 psql -U postgres -d stocks
```

4. Iniciar la aplicacion con docker

```bash
docker compose up -d
```
