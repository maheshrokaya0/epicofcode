---
title: Sessions in Go
description: Learn to maintain stateful information across multiple HTTP requests
indexVal: 8
---

Sessions allows you to maintain stateful information across multiple HTTP requests. In Go, managing sessions typically involves using session packages or libraries to handle tasks such as session creation, storage, and retrieval. In this chapter, we'll explore the basics of sessions in Go and provide an example using the popular Gorilla Sessions library.

## Basics of Sessions in Go

Sessions are used to store and retrieve user-specific information, such as authentication status, user preferences, or any other data that needs to persist between multiple requests. Sessions are identified by unique session IDs, often stored as cookies on the client side.

Here are the basic steps involved in managing sessions:

1.  **Session Creation:** When a user visits a website, a new session is created, and a unique session ID is generated.
    
2.  **Storing Session Data:** User-specific data is stored in the session, which can include information like user ID, username, or other relevant details.
    
3.  **Associating Session ID with the User:** The session ID is often stored as a cookie on the client side. On subsequent requests, the server uses this session ID to identify and retrieve the associated session data.
    
4.  **Session Expiry:** Sessions often have an expiration time to ensure that the stored data doesn't persist indefinitely. The user needs to re-authenticate if the session expires.
    

## Using Gorilla Sessions

Gorilla Sessions is a popular session management library for Go. It provides a flexible and easy-to-use API for managing sessions in web applications.

Before using Gorilla Sessions, you need to install it. Open a terminal and run the following command to install:

```bash
go get -u github.com/gorilla/sessions
```
Let's create a simple example that uses Gorilla Sessions to manage user sessions.
```go
package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/sessions"
)

// Key used to sign and encrypt session cookies
var sessionKey = [] byte("your-secret-key")

// Store to keep sessions in memory. Replace it with a persistent store in production.
var store = sessions.NewCookieStore(sessionKey)

func homeHandler(w http.ResponseWriter, r * http.Request) {
	// Get the session for the current request
	session, err: = store.Get(r, "my-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Check if the user is authenticated
	authStatus, ok: = session.Values["authenticated"].(bool)
	if !ok || !authStatus {
		// If not authenticated, redirect to the login page
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	// If authenticated, display the home page
	fmt.Fprint(w, "Welcome to the Home Page!")
}

func loginHandler(w http.ResponseWriter, r * http.Request) {
	// Get the session for the current request
	session, err: = store.Get(r, "my-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Authenticate the user
	session.Values["authenticated"] = true
	session.Save(r, w)

	// Redirect to the home page
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func logoutHandler(w http.ResponseWriter, r * http.Request) {
	// Get the session for the current request
	session, err: = store.Get(r, "my-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Clear the authenticated status
	session.Values["authenticated"] = false
	session.Save(r, w)

	// Redirect to the home page
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func main() {
	// Define routes
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/logout", logoutHandler)

	// Start the server
	http.ListenAndServe(":8080", nil)
}
```
In this example:

-   The `store` variable is initialized with a Gorilla Sessions cookie store using a secret key (`sessionKey`). In a production environment, consider using a more secure store, such as a database-backed store.
    
-   The `homeHandler` checks if the user is authenticated by looking at the session data. If not authenticated, it redirects the user to the login page.
    
-   The `loginHandler` authenticates the user by setting the `authenticated` flag in the session. After authentication, it redirects the user to the home page.
    
-   The `logoutHandler` clears the authenticated status in the session, effectively logging the user out.
    

Remember that this is a simple example, and in a real-world application, you would integrate user authentication, handle session expiration, and use a secure session store.
