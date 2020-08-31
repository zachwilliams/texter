FROM golang:alpine

ENV GIN_MODE=release
ENV PORT=80

WORKDIR /go/src/texter

# get server
COPY server .
COPY go.* ./

# get client
COPY client/build /go/src/texter/client/build

#if you don't want to pull dependencies from git 
# COPY dependencies /go/src 

RUN go build main.go

EXPOSE $PORT

ENTRYPOINT ["./main"]