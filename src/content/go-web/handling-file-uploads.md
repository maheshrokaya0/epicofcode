---
title: Handling File Uploads
description: Learn How to upload files in Go server
indexVal: 7
---


Handling file uploads typically involves processing the uploaded file on the server side. Here's a basic example:
```go
package main

import (
"fmt"
"io"
"net/http"
"os"
)

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

// Copy the uploaded file to the new file
io.Copy(dst, file)

// Print file information
fmt.Fprintf(w, "File %s uploaded successfully\n", handler.Filename)

}

func  main() {

// Handle requests to the "/upload" path
http.HandleFunc("/upload", uploadHandler)

// Create an "uploads" directory if it doesn't exist
os.Mkdir("./uploads", os.ModePerm)

// Serve static files from the "uploads" directory
http.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

// Start the server
http.ListenAndServe(":8080", nil)
}
```
In this example, a basic file upload handler is created. The form file with the name "file" is processed, and information about the uploaded file is printed. Then, we saved the uploaded file to disk in uploads folder and a static file server is set up to serve files from this directory.

