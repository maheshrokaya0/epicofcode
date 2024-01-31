---
title: net/http
description: Understanding net/http package
indexVal: 3
---

The `net/http` package in Go provides a rich set of functionalities for working with HTTP. It includes tools for building both servers and clients, making it a versatile package for a wide range of web-related tasks.

## Setting Up a Simple HTTP Server
Lets understand the previous example.
```go
package main
    
import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, World!")
	})

	http.ListenAndServe(":8080", nil)
} 
```
This program sets up a server that listens on port 8080 and responds with "Hello, World!" for any request to the root ("/") path.

## Handling HTTP Requests

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World!")
})
```

The `http.HandleFunc` function is used to define how the server responds to specific routes. The provided function takes two parameters: `http.ResponseWriter` and `*http.Request`. The response writer is used to send the response back to the client, and the request contains information about the incoming request.

## Starting Server
```go
http.ListenAndServe(":80", nil)
```
This line starts the HTTP server. It listens on port 8080, and the  `nil` argument means that it will use the default ServeMux (multiplexer) provided by the `http` package. The server will handle incoming HTTP requests based on the registered handlers.


## Working with Query Parameters

You can easily handle query parameters using the `r.URL.Query()` method. Let's modify our server to greet a user based on a provided name parameter:
```go
func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		name := r.URL.Query().Get("name")
		if name == "" {
			name = "Guest"
		}
		fmt.Fprintf(w, "Hello, %s!", name)
	})

	// ... rest of the code
} 
```
Now, you can visit http://localhost:8080/?name=John and the server will respond with "Hello, John!"


## Serving Static Files
```go
staticDir := http.Dir("./static")
fileServer := http.FileServer(staticDir)
http.Handle("/static/", http.StripPrefix("/static/", fileServer))
```
Create a 'static' folder alongside your main.go file and add any static files like HTML, CSS and JavaScript. For example, you created 'hello.html' inside 'static' folder.

Now, when you visit http://localhost:8080/static/hello.html, you will be able to see your HTML served.

**Exaplanation:**

The `http.Dir` is a function that converts a string (representing a directory path) into a type that implements the `http.FileSystem` interface.

The `http.FileServer` is used to serve static files in the directory.

The `http.StripPrefix` function is used to remove the "/static/" prefix from the request URL before passing it to the file server. This is useful to avoid exposing the actual directory structure in the URL.
