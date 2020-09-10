package core

import (
	"context"
	"log"
	"net"
	"sync"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/pgext"
)

var (
	pgMainOnce sync.Once
	pgMain     *pg.DB
)

// PGMain -- create new postgres connection
// use connection pooling with pgbouncer in prod only
func PGMain() *pg.DB {
	pgMainOnce.Do(func() {
		pgMain = newPostgres(hasPgbouncer())
	})
	return pgMain
}

func hasPgbouncer() bool {
	switch CoreConfig.Env {
	case "test", "dev":
		return false
	default:
		return true
	}
}

func newPostgres(usePool bool) *pg.DB {
	cfg := CoreConfig.PGMain
	addr := cfg.Addr
	if usePool {
		addr = replacePort(addr, cfg.ConnectionPoolPort)
	}

	opt := cfg.Options()
	opt.Addr = addr

	db := pg.Connect(opt)
	OnExit(func(ctx context.Context) {
		if err := db.Close(); err != nil {
			log.Print("pg.Close failed")
		}
	})

	db.AddQueryHook(pgext.OpenTelemetryHook{})

	return db
}

func replacePort(s, newPort string) string {
	if newPort == "" {
		return s
	}
	host, _, err := net.SplitHostPort(s)
	if err != nil {
		host = s
	}
	return net.JoinHostPort(host, newPort)
}
