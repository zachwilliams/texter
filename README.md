

# Run Locally
- install go
- install docker
- install npm
- install yarn
- install psql

## Build Frontend
```bash
yarn --cwd ./client install
yarn --cwd ./client run build  
```

## Set up DB
- set up postgres docker container for local use (should download image fist time)
```bash
docker run --name texter_db -p 5432:5432 -e POSTGRES_PASSWORD=pwdtime123 -d postgres
```
- test local connection and build initial db (enter above password when prompted) and create new database texter
```bash
psql -h localhost -p 5432 -U postgres -W
```

- create the texter database (name currently hard coded)
```
CREATE DATABASE texter;
```

- if you want to run the server directly on your machine you will need to set local environment variables the app pulls db connection info from
```
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=pwdtime123
export POSTGRES_ADDR=localhost:5432
```
### DB migrations 
- more information: https://github.com/go-pg/migrations
- init migration (only run once)
```
go run scripts/migrate_db/migrate_db.go init
```
- run all *.up.sql migrations in the scripts/migrate_db directory
```
go run scripts/migrate_db/migrate_db.go init
```

To create a new migration create a new sql file in scripts/migrate_db

Some other basic postgres command:
- `\l` to show all databases
- `\c texter` to connect to texter db
- `\dt` to show all tables

## Run App In Docker
- build container (go code compiled in container) by running: 
```bash
docker build . -t texter-image
```
- run container
```bash
docker run -it -p 5000:80 texter-image
```
- point browser to `localhost:5000`

## Frontend dev
Interactive real time front end dev environment using createreactapp built-in node server
```bash
cd client 
yarn start
```
- point broswer to localhost:3000
- save files to update
### Note: 
You will have to rebuild the front end to serve changes up in docker image

## Local Go Server Execution
run tests:
```bash
go test ./server/
```

run server locally
```bash
go run server/main.go
```

call local server
```bash
curl localhost:5000/api
```


# Prod
A few notes about the "prod" environment:
currently at zactang.com
- currently on my personal aws account
- SSL/TLS is handled at the ELB level
- only other environemnt is local dev
- github actions used for CI/CD and such

## CI/CD
- secrets in github secrets
- configured in `.github/workflows/*`
- `integrate.yml` to run tests on PR to master (currently just golang tests)
- `deploy.yml` to create docker image and deploy to ECS cluster behind ELB

