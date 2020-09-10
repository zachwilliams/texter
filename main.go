package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/zachwilliams/texter/api"
	"github.com/zachwilliams/texter/core"
)

func main() {
	address := "localhost:5000"
	if len(os.Args) > 1 {
		address = os.Args[1]
	}

	ctx := context.Background()

	ctx = core.Init(ctx)
	defer core.Exit(ctx)

	var handler http.Handler
	handler = core.Router
	handler = core.PanicHandler{Next: handler}

	serveHTTP(ctx, handler, address)
}

func serveHTTP(ctx context.Context, handler http.Handler, address string) {
	srv := &http.Server{
		Addr:         address,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
		Handler:      handler,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && !isServerClosed(err) {
			log.Fatal("failed run server --  ListenAndServe")
		}
	}()

	log.Println(core.WaitExitSignal())

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("failed to shutdown server --  srv.Shutdown")
	}
}

func isServerClosed(err error) bool {
	return err.Error() == "http: Server closed"
}

// temporary function to validate testing framework works
func testable(a int) int {

	core.OnInit(func(ctx context.Context) {
		log.Print("confirm init hooks run")

	})
	core.OnExit(func(ctx context.Context) {
		log.Print("confirm exit hooks run")

	})
	return a
}
