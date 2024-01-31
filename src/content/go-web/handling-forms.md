---
title: Handling Forms
description: Working with form data in Golang
indexVal: 6
---

In Go, the `net/http` package provides functionality to parse form data and work with form submissions allowing users to submit data to your sever. In this part, we'll explore the basics of handling forms in Go, covering both the GET and POST methods.

Lets create a basic HTML form that submits username and password to /signup route using POST method.  You can easily render the form in webpage using `html/template` package as shown in the previous chapter.

```html
<form action="/signup" method="POST">
	<input type="text" name="username" required/>
	<input type="password" name="password" required/>
	<button type="submit">Login</button>
</form>
```
Now, create a /signup route to handle the form data.

```go
func main() {
	http.HandleFunc("/signup", signupHandler)
	http.ListenAndServe(":8080", nil)
	}
  
 signupHandler() {
	  r.ParseForm()
	  username := r.FormValue("username")
	  password := r.FormValue("password")
    }
```
In signupHandler, we first parsed the submitted form data from the URL query parameters then we accessed the data using FormValue method.

Now, you can process the collected data how you want.
