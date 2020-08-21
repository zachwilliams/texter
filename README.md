

# run locally
- get go and set up gopath ( should be done since you pulled this repo into the correct spot I hope)
- get docker
- get npm/yarn
- build frontend into client/build (copied from here for container)
```
yarn --cwd ./client build  
```

## in docker

- build container (go code compiled in container) by running: 
```
docker build . -t texter-image
```
- run container
```
docker run -p 5000:5000 texter-image
```
- point browser to `asdf`

## local frontend dev
```
cd client 
yarn start
```
served up from localhost:3000

## local go server execution
```
cd server
go run main.go
```
to test
```
curl localhost:5000/api
```

# deploy to ECS
- todo