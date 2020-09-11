FROM golang:alpine


# default values for local development only
ARG DB_USER=postgres 
ARG DB_PWD=pwdtime123
ARG DB_ADDR

ENV POSTGRES_USER=$DB_USER POSTGRES_ADDR=$DB_ADDR POSTGRES_PASSWORD=$DB_PWD

ENV GIN_MODE=release 
ENV PORT=80

WORKDIR /github.com/zachwilliams/texter

COPY main.go .

COPY api api
COPY core core

COPY go.mod .
COPY go.sum .

# run download independently so it is cached
RUN go mod download

# get frontend code
COPY frontend/build /github.com/zachwilliams/texter/frontend/build

RUN go build main.go 

EXPOSE $PORT

ENTRYPOINT ./main :${PORT}