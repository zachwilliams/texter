FROM golang:alpine


# default values for local development only
# 
ARG DB_USER=postgres 
ARG DB_PWD=pwdtime123
ARG DB_ADDR=localhost:5432

ENV POSTGRES_USER=$DB_USER POSTGRES_ADDR=$DB_ADDR POSTGRES_PASSWORD=$DB_PWD

ENV GIN_MODE=release 
ENV PORT=80

WORKDIR /go/src/texter

COPY main.go .

COPY api .
COPY core .

COPY go.mod .
COPY go.sum .

# run download independently so it is cached
RUN go mod download

# get frontend code
COPY frontend/build /go/src/texter/frontend/build

RUN go build main.go 

EXPOSE $PORT

ENTRYPOINT ["./main :$PORT"]