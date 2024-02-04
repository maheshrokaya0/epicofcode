---
title: Handling File Uploads
description: Learn How to upload files in Go server
indexVal: 7
---

Handling file uploads typically involves processing the uploaded file on the server side. Here's a basic example:

Create a HTML form to upload file to the server.
```html
<form action="/upload" method="POST" enctype="multipart/form-data">
	<label for="file">Choose a file:</label>
	<input type="file" name="file" id="file" required/>
	<button type="submit">Upload</button>
</form>
```
Render the form in webpage as shown in [Templates](https://epicofcode.com/go-web/templates) chapter.

```go
package main

import (
"fmt"
"io"
"net/http"
"os"
)

func  main() {
// Handle requests to the "/upload" path
http.HandleFunc("/upload", uploadHandler)

// Create an "uploads" directory if it doesn't exist
os.Mkdir("./uploads", os.ModePerm)

// Start the server
http.ListenAndServe(":8080", nil)
}
```

`io` package provides interface to work with I/O primitives and `os` package provides platform-independent interface to _operating system_ functionality.

When the file is uploaded to the /upload route, the uploadHandler is initialized, which reads the file and saves it to the disk.

```go
func  uploadHandler(w http.ResponseWriter, r *http.Request) {
// Parse the form data, including the uploaded file
err := r.ParseMultipartForm(10 << 20) // 10 MB limit
if err != nil {
	http.Error(w, err.Error(), http.StatusInternalServerError)
	return
}

// Get the file from the request
file, handler, err := r.FormFile("file")
if err != nil {
	http.Error(w, err.Error(), http.StatusBadRequest)
	return
}
defer file.Close()

// Print file information
fmt.Fprintf(w, "Uploaded File: %+v\n", handler.Header)

// Create a new file on the server
dst, err := os.Create("./uploads/" + handler.Filename)
if err != nil {
	http.Error(w, err.Error(), http.StatusInternalServerError)
	return
}
defer dst.Close()

// Copy the uploaded file data to the new file
io.Copy(dst, file)

// Print file information
fmt.Fprintf(w, "File %s uploaded successfully\n", handler.Filename)
}
```
Here, _defer_ statement defers the execution of a function until the surrounding functions has completed.

The provided example is quite basic. In a production environment, it is essential to implement additional security measures, such as validating the file format, checking for potential security vulnerabilities, and applying stringent file upload policies to mitigate potential risks.