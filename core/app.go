package core

import (
	"context"
	"log"
	mathRand "math/rand"
	"os"
	"os/signal"
	"sync"
	"sync/atomic"
	"syscall"
	"time"

	"golang.org/x/exp/rand"
)

var (
	// WaitGroup -- waitgroup for core init and exit hooks running syncronously
	WaitGroup sync.WaitGroup
	// ExitCh -- channel for core exit hooks running syncronously
	ExitCh  = make(chan struct{})
	exiting uint32
)

// Exiting -- returns true in app is currently exiting
func Exiting() bool {
	return atomic.LoadUint32(&exiting) == 1
}

// Running -- is app running
func Running() bool {
	return !Exiting()
}

// Ctx -- global context reference for core (available after init)
var Ctx context.Context

// Init -- initialize and populate context, initialize config
func Init(ctx context.Context) context.Context {

	rand.Seed(uint64(time.Now().UnixNano()))
	mathRand.Seed(time.Now().UnixNano())

	BuildConfig("saasjaz")
	callInitHooks(ctx)

	Ctx = ctx

	return ctx
}

// Exit -- if not yet in exit process run everything in exitHooks
// time out after 30 seconds
func Exit(ctx context.Context) {
	if !atomic.CompareAndSwapUint32(&exiting, 0, 1) {
		return
	}

	close(ExitCh)
	if waitTimeout(&WaitGroup, 30*time.Second) {
		log.Print("waitTimeout")
	}

	run(ctx, exitHooks)
}

type hookFn func(context.Context)

var (
	initHooks []hookFn
	exitHooks []hookFn
)

func callInitHooks(ctx context.Context) {
	run(ctx, initHooks)
	initHooks = nil
}

// OnInit -- register a hook to be called on core.Init()
// if context already exists call function imediately
func OnInit(fn hookFn) {
	if Ctx != nil {
		fn(Ctx)
		return
	}
	initHooks = append(initHooks, fn)
}

// OnExit -- register a hook to be called on core.Exit()
func OnExit(h hookFn) {
	exitHooks = append(exitHooks, h)
}

func waitTimeout(wg *sync.WaitGroup, timeout time.Duration) bool {
	c := make(chan struct{})
	go func() {
		defer close(c)
		wg.Wait()
	}()
	select {
	case <-c:
		return false // completed normally
	case <-time.After(timeout):
		return true // timed out
	}
}

// run all functions in hook list concurrently on context
func run(ctx context.Context, hookFns []hookFn) {
	var wg sync.WaitGroup
	wg.Add(len(hookFns))
	for _, h := range hookFns {
		go func(h hookFn) {
			defer wg.Done()
			h(ctx)
		}(h)
	}
	wg.Wait()
}

// WaitExitSignal -- function to hold main go routine until os signal is caught
func WaitExitSignal() os.Signal {
	ch := make(chan os.Signal, 3)
	signal.Notify(
		ch,
		syscall.SIGINT,
		syscall.SIGQUIT,
		syscall.SIGTERM,
	)
	return <-ch
}
