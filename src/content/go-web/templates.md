---
title: Templates
description: Understanding net/http package
indexVal: 5
---
Templates provides a way to dynamically generate HTML content and serve it to clients. Go's standard library provides `text/templates` and `html/templates` packages to work with dynamic content. These templates can then be executed with specific data to generate the final HTML output.

`text/template` implements data-driven templates for generating textual output whereas `html/template` implements data-driven templates for generating HTML output safe against code injection.

Both `html/template` and `text/template` works same except `html/template` is more secure. It is suggested to use `html/template` whenever the output is HTML.

Templates live either as strings in your code or in their own files alongside your code.
Here's a simple example:
```go
    package main
    
    import (
    	"net/http"
    	"html/template"
    )
    
    // Page represents data for rendering the HTML page
    type Page struct {
    	Title   string
    	Content string
    }
    
    func main() {
    	// Parse the HTML template
    	tmpl, err := template.New("index").Parse(`
    	<!DOCTYPE html>
    	<html>
    	<head>
    		<title>{{.Title}}</title>
    	</head>
    	<body>
    		<h1>{{.Title}}</h1>
    		<p>{{.Content}}</p>
    	</body>
    	</html>
    	`)
    	if err != nil {
    		panic(err)
    	}
    
    	// Define a handler that renders the template
    	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    		// Data for rendering the page
    		pageData := Page{
    			Title:   "Welcome to My Website",
    			Content: "This is some dynamic content.",
    		}
    
    		// Execute the template with data and write the result to the response
    		err := tmpl.Execute(w, pageData)
    		if err != nil {
    			http.Error(w, err.Error(), http.StatusInternalServerError)
    			return
    		}
    	})
    
    	// Start the server
    	http.ListenAndServe(":8080", nil)
    }
```
In this example, we define an HTML template with placeholders ( `{{.Title}}` and `{{.Content}}` ). The Go program then parses and executes the template with specific data, rendering the HTML output.

## Parsing Files
If you want to execute above template through HTML files, you have to first parse it then execute it.

```go
func main() {
	// Create a new template and parse the HTML file
	tmpl, err := template.ParseFiles("index.html")
	if err != nil {
		panic(err)
	}

	// Define a handler function
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Create data
		pageData := Page{
    			Title:   "Welcome to My Website",
    			Content: "This is some dynamic content.",
    		}

		// Execute the template and write the output to the response writer
		err := tmpl.Execute(w, pageData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	// Start the HTTP server on port 8080
	http.ListenAndServe(":8080", nil)
}
```


