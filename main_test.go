package main

import "testing"

// TestFunc shows tests work for server
func TestFunc(t *testing.T) {
	if testable(7) != 7 {
		t.Fail()
	}
	if testable(-5) != -5 {
		t.Fail()
	}
}
