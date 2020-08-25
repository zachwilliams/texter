

# Run Locally
- get go and set up gopath ( should be done since you pulled this repo into the correct spot I hope)
- get docker
- get npm/yarn
- build frontend:
```bash

yarn --cwd ./client install
yarn --cwd ./client run build  
```

## In Docker

- build container (go code compiled in container) by running: 
```bash
docker build . -t texter-image
```
- run container
```bash
docker run -it -p 5000:5000 texter-image
```
- point browser to `localhost:5000`

## Local Frontend Dev
```bash
cd client 
yarn start
```
served up from localhost:3000

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

# CI/CD
there are currently only 2 environments (local and prod) and we are using git hub actions for all CI/CD
- configured in `.github/workflows/*`
- `integrate.yml` to run tests on PR to master
- `deploy.yml` to create docker image and deploy to ECS cluster behind ELB

(definitnely some room for improvement here)

