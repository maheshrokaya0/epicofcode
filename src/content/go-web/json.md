---
title: Working with JSON
description: Understanding net/http package
indexVal: 9
---

JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. In Go, the `encoding/json` package provides functionality to encode Go data structures into JSON format (marshaling) and decode JSON data into Go values (unmarshaling). In this chapter, we'll explore the basics of working with JSON in Go.

## Marshaling (Encoding) JSON
Marshaling is the process of converting Go data structures into JSON format. The `json.Marshal` function is used for this purpose.

Let's start with a basic example of marshaling a Go struct into JSON:

```go
    package main

    import (
        "encoding/json"
        "fmt"
    )

    // Person represents a person's information
    type Person struct {
        Name string `json:"name"`
        Age int `json:"age"`
        City string `json:"city"`
        Email string `json:"email,omitempty"`
    }

    func main() {
        // Create a Person instance
        person: = Person {
            Name: "John Doe",
            Age: 30,
            City: "New York",
            Email: "john.doe@example.com",
        }

        // Marshal the Person struct into JSON
            jsonData,
        err: = json.Marshal(person)
        if err != nil {
            fmt.Println("Error:", err)
            return
        }

        // Print the JSON data
        fmt.Println(string(jsonData))
    }
```

In this example, the `Person` struct represents information about a person. The `json` tags are used to specify the JSON field names. The `json:"email,omitempty"` tag indicates that the `Email` field should be omitted from the JSON output if it is an empty string.

## Unmarshaling (Decoding) JSON

Unmarshaling is the process of converting JSON data into Go values. The `json.Unmarshal` function is used for this purpose.

Let's use the JSON data from the previous example and unmarshal it back into a Go struct:

```go
    package main

    import (
        "encoding/json"
        "fmt"
    )

    // Person represents a person's information
    type Person struct {
        Name string `json:"name"`
        Age int `json:"age"`
        City string `json:"city"`
        Email string `json:"email,omitempty"`
    }

    func main() {
        // JSON data representing a person
        jsonData: = `{"name":"Jane Doe","age":25,"city":"San Francisco"}`

        // Create a Person instance for storing the decoded data
            var person Person

        // Unmarshal the JSON data into the Person struct
            err: = json.Unmarshal([] byte(jsonData), & person)
        if err != nil {
            fmt.Println("Error:", err)
            return
        }

        // Print the decoded data
        fmt.Printf("Name: %s\nAge: %d\nCity: %s\nEmail: %s\n", person.Name, person.Age, person.City, person.Email)
    }
```
In this example, the `jsonData` variable contains JSON data representing a person. The `json.Unmarshal` function is used to decode this JSON data into a `Person` struct.

## Handling JSON Arrays

JSON arrays are represented using slices in Go.

### Example
Let's marshal and unmarshal JSON data containing an array:
```go
    package main

    import (
        "encoding/json"
        "fmt"
    )

    // Post represents a post's information
    type Post struct {
        ID int `json:"id"`
        Title string `json:"title"`
    }

    func main() {
        // Create an array of Post instances
        posts: = [] Post {
            {
                ID: 1,
                Title: "Introduction to Go"
            }, {
                ID: 2,
                Title: "Working with JSON"
            }, {
                ID: 3,
                Title: "Web Development in Go"
            },
        }

        // Marshal the array into JSON
            jsonData,
        err: = json.Marshal(posts)
        if err != nil {
            fmt.Println("Error:", err)
            return
        }

        // Print the JSON data
        fmt.Println(string(jsonData))

        // Unmarshal the JSON data into a slice of Post structs
        var decodedPosts[] Post
        err = json.Unmarshal(jsonData, & decodedPosts)
        if err != nil {
            fmt.Println("Error:", err)
            return
        }

        // Print the decoded data
        for _,
        post: = range decodedPosts {
            fmt.Printf("ID: %d, Title: %s\n", post.ID, post.Title)
        }
    }
```
In this example, the `Post` struct represents information about a post. We create an array of `Post` instances, marshal it into JSON, and then unmarshal it back into a slice of `Post` structs.

## Working with Maps

JSON objects are represented using maps in Go.

Let's marshal and unmarshal JSON data containing a map:

```go
    package main

    import (
        "encoding/json"
        "fmt"
    )

    func main() {
        // Create a map with string keys and interface{} values
        data: = map[string] interface {} {
            "name": "Alice",
            "age": 28,
            "city": "Seattle",
            "email": nil, // will be omitted in JSON
        }

        // Marshal the map into JSON
            jsonData,
        err: = json.Marshal(data)
        if err != nil {
            fmt.Println("Error:", err)
            return
        }

        // Print the JSON data
        fmt.Println(string(jsonData))

        // Unmarshal the JSON data into a map
        var decodedData map[string] interface {}
        err = json.Unmarshal(jsonData, & decodedData)
        if err != nil {
            fmt.Println("Error:", err)
            return
        }

        // Print the decoded data
        fmt.Printf("Name: %s\nAge: %v\nCity: %s\nEmail: %v\n",
            decodedData["name"], decodedData["age"], decodedData["city"], decodedData["email"])
    }
```
In this example, the `data` variable is a map with string keys and `interface{}` values. The map is then marshaled into JSON, and the JSON data is unmarshaled back into a map.

## Custom Marshaling and Unmarshaling

You can customize the marshaling and unmarshaling process for your custom types by implementing the `MarshalJSON` and `UnmarshalJSON` methods.

### Example
```go
	package main

    import (
    	"encoding/json"
    	"fmt"
    )
    
    // CustomDate represents a custom date format
    type CustomDate struct {
    	Year  int `json:"year"`
    	Month int `json:"month"`
    	Day   int `json:"day"`
    }
    
    // MarshalJSON customizes the JSON encoding for CustomDate
    func (d CustomDate) MarshalJSON() ([]byte, error) {
    	dateString := fmt.Sprintf("%04d-%02d-%02d", d.Year, d.Month, d.Day)
    	return json.Marshal(dateString)
    }
    
    // UnmarshalJSON customizes the JSON decoding for CustomDate
    func (d *CustomDate) UnmarshalJSON(data []byte) error {
    	var dateString string
    	if err := json.Unmarshal(data, &dateString); err != nil {
    		return err
    	}
    
    	_, err := fmt.Sscanf(dateString, "%04d-%02d-%02d", &d.Year, &d.Month, &d.Day)
    	return err
    }
    
    func main() {
    	// Create a CustomDate instance
    	date := CustomDate{Year: 2022, Month: 1, Day: 15}
    
    	// Marshal the CustomDate into JSON
    	jsonData, err := json.Marshal(date)
    	if err != nil {
    		fmt.Println("Error:", err)
    		return
    	}
    
    	// Print the JSON data
    	fmt.Println(string(jsonData))
    
    	// Unmarshal the JSON data into a CustomDate
    	var decodedDate CustomDate
    	err = json.Unmarshal(jsonData, &decodedDate)
    	if err != nil {
    		fmt.Println("Error:", err)
    		return
    	}
    
    	// Print the decoded data
    	fmt.Printf("Decoded Date: %v\n", decodedDate)
    }
```
In this example, the `CustomDate` type has custom `MarshalJSON` and `UnmarshalJSON` methods to control the JSON encoding and decoding process. The `MarshalJSON` method formats the date as a string, and the `UnmarshalJSON` method parses the string back into the `CustomDate` struct.

Working with JSON in Go is straightforward due to the standard library's `encoding/json` package. You can easily marshal Go structs, slices, maps, and other types into JSON, as well as unmarshal JSON data back into Go values. Customizing the marshaling and unmarshaling process allows you to handle special cases and ensure that your Go types are represented in JSON format as needed.

