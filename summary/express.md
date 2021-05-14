# Express

## Step-by-step Express app

* Run `npm init` in the project's root directory. Add a `"start": "node index.js"` script to the `package.json` file.

* Install Express a runtime dependency with `npm install express`.

* Install nodemon as a development dependency: `npm install --save-dev nodemon`, and add a script: `"dev": "nodemon index.js"`. Nodemon will automatically restart the server when a file is changed.

* Create the index.js file in the root directory:

```javascript
const express = require('express')
const app = express()

// app goes here

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

* Put all necessary middleware into use.

* Define routes for the application.

## Routes

We can define a route by assigning event handlers to the `app` object through its methods, which mirror the names of http requests.

These methods take two parameters: the url of the request for which the functionality is defined, and the callback function to be executed. This callback function takes `request` and `response` parameters.

Example:

```javascript
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
```

#### The `request` parameter

This parameter contains information of the HTTP request.

* `request.body`: if json-parser is set up, this field will contain the data of the request as a javascript object.

* `request.get(headerName)`: returns the value of the specified header.

* `request.headers`: contains all the headers of the request.

#### The `response` parameter

This parameter is used to define how the request will be answered.

* `response.end()`: this method takes no arguments and responds to the request without sending any data.

* `response.send(text)`: this method will answer with the argument sent as the body of the response, with a defualt *Content-Type* of *text/html*.

* `response.json(object)`: this method takes a javascript object and sends it as a JSON-parsed string, with *Content-Type* header of *application/json*.

* `response.status(number)`: this method takes a number, which will be set as the status code of the response. Should be chained befor the `end` method.


#### Parametrizing URLs

To use part of an URL as a parameter from within a route's callback function, we use the colon syntax. Example:

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  response.json(notes.find(note => note.id === id))
})
```

Remember that the value for this parameter is string by default, so should be cast to number if necessary.

## Routing

#### Fetching a single resource

To fetch a single resource, we set a callback function to the `get` method of the `app` object, and we use a parametrized URL.

In case we found the specified resource, we send it back with `response.json`. But, we should watch out for and handle the situation in which we can't find a resource that matches the requested id, and respond with a 404 status code.

Example:

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```

#### Deleting a resource

Deleting a resource is done with the `delete` method of the `app` object. Since no data is to be sent with a deletion, we respond only with a 204 status code. Example:

```javascript
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

#### Receiving data

To add new resources, we use the `post` method of the `app` object. This time, the url doesn't have a parameter, since the POST method is called on a collection.

Once the resource is added to the database, we respond by sending the added resource via `response.json`.

It's crucial for receiving data to add Express' json-parser middleware (`app.use(express.json())`).

We also must make sure that the received data has the properties we need to integrate it to our database. Otherwise, we should response with a 400 status code and an object (sent with the `json` of the `response` object), containing an `error` field with a description of the error.

Example:

```javascript
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
```

## Middleware

Middleware are functions that handle the `request` and `response` objects. They are executed in the order they are taken into use.

We can use pre-defined middleware or define them ourselves. For example, to put Express' json-parser into use, we pass it as an argument to the `use` method of the `app` object:

```javascript
app.use(express.json())
```

We can also define our own middleware and put it into use. When doing so, we create a function that takes the `request`, `response`, and `next` parameters. `request` and `response` are the objects that will be passed to the route handlers, and will carry any changes we make to them here. `next` is a function that yields control to the next middleware. Example:

```javascript
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}
```

#### Recommended middleware (in rough order)

##### Before routes:

* json-parser (`app.use(express.json())`): parses the JSON string attached to requests with the application/json Content-Type header into a JS object and sets it as the `body` field of the `request` object.

* (Optional) Request logger: a custom-made request logger can be helpful for debugging.

##### After routes:

* Unkown endpoint handler: catches requests made to non-existant routes.

```javascript
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```
