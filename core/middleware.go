package core

import (
	"fmt"
	"net/http"
	"os"
	"runtime"
)

// PanicHandler -- wrapper that adds a panic/recovery function to http handler
type PanicHandler struct {
	Next http.Handler
}

func (h PanicHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			buf := make([]byte, 1<<20)
			n := runtime.Stack(buf, true)
			fmt.Fprintf(os.Stderr, "panic: %v\n\n%s", err, buf[:n])
			os.Exit(1)
		}
	}()
	h.Next.ServeHTTP(w, req)
}
