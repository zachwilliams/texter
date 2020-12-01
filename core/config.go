package core

import (
	"os"
	"time"

	"github.com/go-pg/pg/v10"
)

// Config -- struct to hold base configuration
type Config struct {
	Service string
	Env     string

	PGMain *Postgres
}

// Postgres -- struct to hold postgress config
type Postgres struct {
	Addr               string
	ConnectionPoolPort string

	Database string
	User     string
	Password string
	SSL      bool

	MaxRetries int

	DialTimeout  time.Duration
	ReadTimeout  time.Duration
	WriteTimeout time.Duration

	PoolSize     int
	MinIdleConns int
	MaxConnAge   time.Duration
	PoolTimeout  time.Duration
	IdleTimeout  time.Duration
}

// CoreConfig -- the core configuration object
var CoreConfig Config

// BuildConfig -- load configuration values from environment variables
func BuildConfig(service string) {

	env := os.Getenv("APP_ENV")
	if len(env) == 0 {
		env = "dev"
	}
	CoreConfig.Env = env

	CoreConfig.Service = service
	CoreConfig.PGMain = loadDbConfig()
}

func loadDbConfig() *Postgres {

	pgConfig := new(Postgres)

	pgConfig.User = os.Getenv("POSTGRES_USER")
	pgConfig.Password = os.Getenv("POSTGRES_PASSWORD")
	pgConfig.Addr = os.Getenv("POSTGRES_ADDR")

	pgConfig.Database = "saasjaz"

	// TODO read environment variables for Postgres and set default values

	return pgConfig
}

// Options -- return expanded set of options for creating PG connection
// based on data from configuration
func (cfg *Postgres) Options() *pg.Options {
	return &pg.Options{
		User:     cfg.User,
		Password: cfg.Password,
		Database: cfg.Database,

		MaxRetries: cfg.MaxRetries,

		DialTimeout:  cfg.DialTimeout,
		ReadTimeout:  cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,

		PoolSize:     cfg.PoolSize,
		MinIdleConns: cfg.MinIdleConns,
		MaxConnAge:   cfg.MaxConnAge,
		PoolTimeout:  cfg.PoolTimeout,
		IdleTimeout:  cfg.IdleTimeout,
	}
}
