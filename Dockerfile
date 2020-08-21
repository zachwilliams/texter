FROM golang:alpine

ENV GIN_MODE=release
ENV PORT=5000

WORKDIR /go/src/texter

# get server
COPY server .

# get client
COPY client/build /go/src/texter/client/build

RUN apk update && apk add --no-cache git
RUN go get ./...

#if you don't want to pull dependencies from git 
# COPY dependencies /go/src 

RUN go build main.go

EXPOSE $PORT

ENTRYPOINT ["./main"]