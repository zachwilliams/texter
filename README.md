# Run Locally

- install go
- install docker
- install npm
- install yarn
- install psql

## Build Frontend

```bash
yarn --cwd ./frontend install
yarn --cwd ./frontend run build
```

## Set up local environment variables

```bash
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=pwdtime123
export POSTGRES_ADDR=localhost:5432
```

## Set up DB

- set up postgres docker container for local use (should download image fist time)

```bash
docker run --name saasjaz_db -p 5432:5432 -e POSTGRES_PASSWORD=pwdtime123 -d postgres
```

- test local connection and build initial db (enter above password when prompted) and create new database saasjaz

```bash
psql -h localhost -p 5432 -U postgres -W
```

- create the saasjaz database (name currently hard coded)

```
CREATE DATABASE saasjaz;
```

- Some other basic postgres command:
  - `\l` to show all databases
  - `\c saasjaz` to connect to saasjaz db
  - `\dt` to show all tables

### DB migrations

- more information: https://github.com/go-pg/migrations
- init migration (only run once)

```
go run scripts/migrate_db/migrate_db.go init
```

- run all \*.up.sql migrations in the scripts/migrate_db directory

```
go run scripts/migrate_db/migrate_db.go up
```

To create a new migration create a new sql file in scripts/migrate_db

Some other basic postgres command:

- `\l` to show all databases
- `\c saasjaz` to connect to saasjaz db
- `\dt` to show all tables
- `\q` to disconnect

## Run App In Docker

- you will need to get the ipaddress of the postgres container (localhost wont work for container to container)

```bash
docker inspect <postgres-container-id> | grep "IPAddress"
```

- build container pass address of postgres container (usually 172.17t.0.2) with running:

```bash
docker build . -t saasjaz-image --build-arg DB_ADDR=<ip-from-above>:5432
```

> NOTE: since we use the same dockerfile for prod, this will run without debugging and on port 80

- run container

```bash
docker run -it -p 5000:80 saasjaz-image
```

- point browser to `localhost:5000`

## Frontend dev

Interactive real time front end dev environment using createreactapp built-in node server

```bash
cd frontend
yarn start
```

- point broswer to localhost:3000
- save files to update

### Note:

You will have to rebuild the front end to serve changes up in docker image

## Local Go Server Execution

If you want to run the server directly on your machine you will need to set
local environment variables the app pulls db connection info from.

```bash
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=pwdtime123
export POSTGRES_ADDR=localhost:5432
```

NOTE: These values will be set as defaults in the docker file and will be pulled from github secrets for prod

run tests:

```bash
go test .
```

run server locally

```bash
go run main.go
```

you can change the port it is running on by setting a command line arg

```bash
go run main.go localhost:80
```

call local server

```bash
curl localhost:5000/api/healthcheck
```

# Production

Currently deployed to saasjaz.com

- currently on my personal aws account
- SSL/TLS is handled at the ELB level
- only other environment is local dev
- github actions used for CI/CD and such

## CI/CD

- secrets in github secrets
- configured in `.github/workflows/*`
- `integrate.yml` to run tests on PR to master (currently just golang tests)
- `deploy.yml` to create docker image and deploy to ECS cluster behind ELB

## Infrastructure (AWS)

This section documents all the steps for creating the production(ish)
infrstructure used by the saasjaz application in AWS.

- register domain (Route53)
- request a public ssl cert (ACM, validate by updateing CNAME in Route53)
- create ssh key pair (EC2)

- create VPC (VPC, use 10.0.0.0/16)
- create subnets(VPC, use 10.0.0.0/24 and 10.0.1.0/24)
- create internet gateway and attach (VPC)
- create route table

- create database (RDS)
- create security groups (ECS)

- create image repository (ECS)
- create fargate cluster (ECS)
- create task definition and save json in project (ECS, create container in flow)
- create load balancer and target group (EC2, inside new VPC) (can do inline in service creation step)
- create service (ECS, in new cluster)

- point A record to ALB (Route53)
- set name (find and replace all saasjaz with new project name)
