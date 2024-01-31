---
title: Working with databases
description: Understand databases to work with dynamic data
indexVal: 10
---

Go relies on database drivers to interact with various database management systems. These drivers serve as connectors between your Go code and the specific database.

Before you can start working with databases, you need to install the required drivers. Open a terminal and execute the following command:

```bash
go get -u github.com/go-sql-driver/mysql
```
This driver allows Go programs to connect and interact with MySQL databases.

## Example: Connecting to MySQL and Executing a Query

```go
package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

// Connection information
const (
    username = "your_username"
    password = "your_password"
    database = "your_database"
    hostname = "your_hostname"
    port     = "your_port"
)

func main() {
    // Establish a database connection
    db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", username, password, hostname, port, database))
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Selecting data
    rows, err := db.Query("SELECT * FROM your_table_name")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

    // Iterate through the result set
    for rows.Next() {
        var column1, column2 string
        if err := rows.Scan(&column1, &column2); err != nil {
            log.Fatal(err)
        }
        fmt.Println(column1, column2)
    }

    // Inserting data
    _, err = db.Exec("INSERT INTO your_table_name (column1, column2) VALUES (?, ?)", value1, value2)
    if err != nil {
        log.Fatal(err)
    }

    // Updating data
    _, err = db.Exec("UPDATE your_table_name SET column1 = ? WHERE condition_column = ?", new_value, condition_value)
    if err != nil {
        log.Fatal(err)
    }

    // Deleting data
    _, err = db.Exec("DELETE FROM your_table_name WHERE condition_column = ?", value_to_delete)
    if err != nil {
        log.Fatal(err)
    }
}
```
**Note:** Replace placeholders such as `your_table_name`, `column1`, `column2`, `value1`, etc., with your actual table and column names, as well as the correct connection details.
In this example, we connect to a MySQL database, execute a SELECT, INSERT, UPDATE and DELETE query on the "your_table_name" table, and print the results.
