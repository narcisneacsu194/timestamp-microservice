# Timestamp Microservice

API that lets you input a date with a format like **YYYY-MM-DD**, or as a millisecond timestamp. It will return a json response that contains the same date as a **millisecond** timestamp and in a nice format.

**Examples:**
* When using *GET '/api/timestamp/2015-11-20'*, you will get the following response:
```
{
    "unix": 1447977600000,
    "utc": "Fri, 20 Nov 2015 00:00:00 GMT"
}
```
* When using *GET '/api/timestamp/1447977600000'*, you are putting the same date from above, but in millisecond timestamp form. You will get the same response:
```
{
    "unix": 1447977600000,
    "utc": "Fri, 20 Nov 2015 00:00:00 GMT"
}
```
* When only using *GET '/api/timestamp/'*, you will get the current date and time, in the form of the following response:
```
{
    "unix": 1543092163934,
    "utc": "Sat, 24 Nov 2018 20:42:43 GMT"
}
```

Keep in mind, that for the first example, if you try to input gibberish text, or a date in a format that doesn't comply with the **ISO-8601** standard, you will get an error response like the following:

```
{
    "error": "Invalid Date"
}

```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have ***git***, ***yarn*** and ***nodejs*** installed on your computer.

You have the *config/config.json* file, where you can set up the port that
***express*** will use for different environments (development and test).

### Installation steps

```
> git clone git@github.com:narcisneacsu194/timestamp-microservice.git
> cd {your_local_path}/timestamp-microservice
> yarn install
> node server.js
```

You can then access the application with any browser or with software like Postman, using the following URL:

```
localhost:3000
```
