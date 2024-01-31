---
title: Basic Example
description: First step of printing hello world in webpage using Go.
indexVal: 2
---

Let's start by creating a basic HTTP server example that responds with "Hello World!" when accessed.

Creating a simple "Hello World!" webpage using Go can be achieved by using the `net/http` package. We will learn more about `net/http` package in next chapter.

Create a new file, let's call it `main.go`, and open it in your preferred code editor.

Add the following code to your `main.go` file:

```go
package main
     
import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello World!")
	})
	
	http.ListenAndServe(":8080", nil)
}
``` 
Open a terminal, navigate to the directory containing your `main.go` file, and run the following command:

```bash
go run main.go
```
Open your web browser and navigate to http://localhost:8080. You should see "Hello World!" displayed on the webpage.

Congratulations, You have just created your first webpage using Go.