# Node

## npm

npm is a package manager that will allow us to define a standard structure for our projects, as well as fetching dependencies from the cloud. All specifications of a project are defined in its `package.json` file in the root directory.

#### Commands

* To start a new npm project in the current directory, run:

```
npm init
```

This will guide us through a step by step configuracion of our project. For now it's enough to configure only the author name nad the license (MIT).

* To install all dependencies defined for a project (for example one that has been cloned from git), run:

```
npm install
```

* To install a package globally, run:

```
npm install -g package-name
```

* To install a package in a project (as a runtime dependency), run, in the root of the project:

```
npm install package-name
```

* To install a package as a development dependency (only used during development), run, in the root of the project:

```
npm install --save-dev json-server
```

## package.json

#### dependencies

This is where all the packages needed for the project to work are specified. It mostly shouldn't be changed manually.

#### scripts

In this part, scripts can be placed to make long commands readily available. They can then be run with the `npm run` prefix + the script name. Example, if we define the script:

```javascript
{
  // ...
  "scripts": {
    // ...
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

We can then run the server in development mode with:

```
npm run dev
```

There are some exceptional scripts where the `run` keyword is not needed, for example `npm start`.

## Packages

#### axios

axios is used in the frontend to communicate with the server. Install in the project.

Files using axios go in the `/services` directory, and there's one file per route, in which methods for it will be defined. Axios methods are named directly after the http methods.

Inside each file, we can define several functions for different http methods, and then export each of them. For example:

```javascript
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => response.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update 
}
```

Note: it's beter to return only the pertinent information instead of the whole http response. But even when doing this, a promise is returned.

Then, we import them as an object and use these exported functions as its methods:

```javascript
import noteService from './services/notes'

// ...

noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })

// ...
```
