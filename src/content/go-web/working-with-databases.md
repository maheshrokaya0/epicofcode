---
title: Working with databases
description: Understand databases to work with dynamic data
indexVal: 10
---

Go relies on database drivers to interact with various database management systems. These drivers serve as connectors between your Go code and the specific database.

Before you can start working with databases, you need to install the required drivers. Open a terminal and execute the following command:

`go get -u github.com/go-sql-driver/mysql`

This driver allows Go programs to connect and interact with MySQL databases.

Along with installed driver, also we have to import `database/sql` standard package. This package provides generic interface around SQL (or SQL-like) databases.

## Example

This example covers on executing the basic queries like inserting, fetching, deleting and updating data in MYSQL database.

Lets create variables for the MYSQL connection.
```go
const (
    username = "your_username"
    password = "your_password"
    database = "your_database"
    hostname = "your_hostname"
    port     = "your_port"
)
```
Replace the placeholders with your actual connection details.

### Establish a database connection
Before executing queries, we have to make a connection between our program and a database. In Go, you can do in this way:

```go
db, err := sql.Open(“mysql”, fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", username, password, hostname, port, database))  
if err != nil {  
log.Fatal(err)  
}  
defer db.Close()
```
Here, we used `defer` statement to avoid closing the database connection until all the functions related to **db** executed.

### Inserting data
```go
_, err = db.Exec("INSERT INTO your_table_name (column1, column2) VALUES (?, ?)", value1, value2)
if err != nil {
	log.Fatal(err)
}
```

### Fetching data 
```go
rows, err := db.Query("SELECT * FROM your_table_name")
if err != nil {
    log.Fatal(err)
}

defer rows.Close()

// Iterate through the result set
for rows.Next() {
var  column1, column2  string
if  err := rows.Scan(&column1, &column2); err != nil {
	log.Fatal(err)
}

fmt.Println(column1, column2)
}
```

### Updating data
```go
_, err = db.Exec("UPDATE your_table_name SET column1 = ? WHERE condition_column = ?", new_value, condition_value)
if err != nil {
    log.Fatal(err)
}
```

### Deleting data
```go
_, err = db.Exec("DELETE FROM your_table_name WHERE condition_column = ?", value_to_delete)
if err != nil {
    log.Fatal(err)
}
```

Replace placeholders such as `your_table_name`, `column1`, `column2`, `value1`, etc., with your actual table and column names.

The example given is very basic. you can do more with it. It is sufficient to work with simple applications but if your app is complex and heavily dependent on databases I recommend you to use ORM like GORM, Beego, etc.  
