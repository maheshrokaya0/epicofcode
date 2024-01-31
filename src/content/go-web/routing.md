---
title: Routing (using gorilla/mux)
description: Creating routes with gorilla/mux
indexVal: 4
---

The built-in package `net/http` has a simple default router, but it may not cover more advanced routing scenarios, especially if your application requires complex URL patterns or parameter extraction. That's why we use `gorilla/mux` package for advanced routing.

`gorilla/mux` is a powerful URL router and dispatcher for Go. It extends the capabilities of the standard `net/http` package, providing additional features like route variables, subrouters, and middleware support. With `gorilla/mux`, you can create complex routing structures for your web applications.

Before using `gorilla/mux`, you need to install it. Open a terminal and run the following command to install:

`go get -u github.com/gorilla/mux` 

Before installation, you have to run `go mod init <module_name>` command. It creates a go. mod file that defines the module's path and sets it up for dependency management.

## Basic Routing

Let's create a simple Go program that uses `gorilla/mux` for basic routing:

   ```go
    package main
    
    import (
    	"fmt"
    	"net/http"
    
    	"github.com/gorilla/mux"
    )
    
    func main() {
    	router := mux.NewRouter()
    
    	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    		fmt.Fprint(w, "Welcome to the homepage!")
    	})
    
    	http.ListenAndServe(":8080", router)
    }
   ```

In this example, we create a new gorilla/mux router, define a route for the root path ("/"), and handle the request with a simple message.

## Route Variables

`gorilla/mux` allows you to capture variables from the URL.

Example:
```go
    router.HandleFunc("/user/{name}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
    	name := vars["name"]
    	fmt.Fprintf(w, "Hello, %s!", name)
    }).Methods("GET")
```
In this example, the route `/user/{name}` captures the `name` variable from the URL and responds with a personalized greeting.

### Route Patterns
`gorilla/mux` supports flexible route patterns. For example, you can define routes with specific constraints or match patterns:

```go
	router.HandleFunc("/articles/{category:[a-z]+}/{id:[0-9]+}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		category := vars["category"]
		id := vars["id"]
		fmt.Fprintf(w, "Category: %s, ID: %s", category, id)
	}).Methods("GET")
```

In this example, the route pattern `/articles/{category:[a-z]+}/{id:[0-9]+}` ensures that `category` is lowercase letters, and `id` is numeric.
    
## Subrouters
   `gorilla/mux` allows you to create subrouters, which can be useful for organizing routes:
    
   ```go
    	apiRouter := router.PathPrefix("/api").Subrouter()
    	apiRouter.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
    		fmt.Fprint(w, "List of users")
    	}).Methods("GET")
    
    	apiRouter.HandleFunc("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
    		vars := mux.Vars(r)
    		id := vars["id"]
    		fmt.Fprintf(w, "User ID: %s", id)
    	}).Methods("GET")
   ```

In this example, all routes under the `/api` path are grouped within a subrouter.

## Middleware

`gorilla/mux` supports middleware, allowing you to execute code before or after handling a request. Here's a simple middleware example:
```go
    func LoggingMiddleware(next http.Handler) http.Handler {
    	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    		fmt.Println("Request received:", r.Method, r.URL.Path)
    		next.ServeHTTP(w, r)
    	})
    }
    
    func main() {
    	router := mux.NewRouter()
    
    	// Apply the LoggingMiddleware to all routes
    	router.Use(LoggingMiddleware)
    } 
```
In this example, the `LoggingMiddleware` logs information about each incoming request.

## Handling HTTP Methods

`gorilla/mux` makes it easy to handle different HTTP methods on the same route:
    
  ```go
    	router.HandleFunc("/articles", func(w http.ResponseWriter, r *http.Request) {
    		switch r.Method {
    		case http.MethodGet:
    			fmt.Fprint(w, "Get articles")
    		case http.MethodPost:
    			fmt.Fprint(w, "Create a new article")
    		default:
    			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    		}
    	})
```

In this example, the route `/articles` responds differently based on the HTTP method used.
