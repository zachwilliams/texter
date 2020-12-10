package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"time"

	"github.com/go-pg/migrations/v8"
	"github.com/zachwilliams/saasjaz/core"
)

const stmtTimeout = 5 * time.Minute

const usageText = `This program runs command on the db. Supported commands are:
  - init - creates version info table in the database
  - up - runs all available migrations.
  - up [target] - runs available migrations up to the target one.
  - down - reverts last migration.
  - reset - reverts all migrations.
  - version - prints current db version.
  - set_version [version] - sets db version without running migrations.
Usage:
  go run migrate_db.go <command> [args]
`

func main() {
	flag.Usage = usage
	flag.Parse()

	args := flag.Args()
	if len(args) == 0 {
		usage()
	}

	ctx := core.Init(context.Background())
	defer core.Exit(ctx)

	core.CoreConfig.PGMain.ReadTimeout = stmtTimeout
	core.CoreConfig.PGMain.PoolTimeout = stmtTimeout

	oldVersion, newVersion, err := migrations.Run(core.PGMain(), args...)
	if err != nil {
		fmt.Printf("migration %d -> %d failed: %s\n",
			oldVersion, newVersion, err)
		os.Exit(2)
	}

	if newVersion != oldVersion {
		fmt.Printf("migrated from %d to %d\n", oldVersion, newVersion)
	} else {
		fmt.Printf("version is %d\n", oldVersion)
	}
}

func usage() {
	fmt.Print(usageText)
	flag.PrintDefaults()
	os.Exit(2)
}
