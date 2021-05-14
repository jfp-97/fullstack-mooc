# React

## Step-by-step React app

* `npx create-react-app <app name>`
* Clear `src` folder.
* Set up `index.js` file in `src`:

```javascript
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(
  <App />,
  document.getElementById('root')
))
```

* Set up `App.js` file in `src` (main entry point to the project):

```javascript
import React from "react"

const App = () => {
  /* your app goes here */
  
  return (/* ... */)
}

export default App
```

* (Optional) Add a `.env` file in the root of the project containing the line `FAST_REFRESH=false`, in order to reflect changes to the `index.js` file on the page without the need to reload it.

* (Optional) Install json-server by running `npm install --save-dev json-server` and create a `"server": "json-server --port 3001 --watch db.json"` script. This package watches a `db.json` file in the root directory and serves as a faux-rest api.

* Install packages:
  * `axios`

* Define new components as modules in the `project/src/components` folder, then import them when necessary.

* For communication with the backend, use the axios module and add a file for each resource type in the `project/src/services` directory. Then implement functionality in its file.

## JSX

JSX allows us to seemingly return HTML code from JavaScript functions. Under the hood, Babel is actually transpiling the return values of component functions into vanilla JS. This way, the returned "HTML code" winds up being some object created by React.

The main advantage of JSX is that it lets us write JS within HTML, inside curly braces.


## Components

React code is split into components. They are reusable pieces of UI that can be parametrized.

Components may be defined as functions or classes. In the case of function-style definition, the return value of the function is what will be rendered. When using class-style components, the method `render()` must be defined. Function-style components are preferred.

In both cases, the return value of the component must be wholly wrapped in a single root element (by default, a *div* element, or an empty pair of tags if need be: `MyComponent = () => (<> /* ... */ </>)`).

##### Props

Props (short for "properties") are objects which the component takes are their parameters. Each component takes a single `props` object asi its input.

Props are read-only, hence they should not be mutated.

Each attribute set when using a component will be added as a field of the `props` parameter, then accesible from within the component.

Example:

```javascript
ReactDOM.render(
  <Welcome name="Juan" />,
  document.getElementById('root')
)

const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
}
```

#### Rendering collections

When placing an array of components inside JSX, all its elements will be appended to the element above.

When doing this, React necessitates adding a `key` attribute to each element of the list. However, when generating the array through a high order function, using the index as key should be avoided.

## Hooks

#### State hook

In order to add state fo functional components, we use a React tool called *hooks*.

To use hooks in a file, we import each hook function to be used like so:

```javascript
import React, { useState } from 'react'
```

Then, within a component's body, we declare state as a destructured list which consists of the state variable itself first, then its setter. This variable is set by calling the imported `useState` function, passing the initial value as its parameter.

```javascript
import React, { useState } from 'react'
/* ... */

const Game = () => {
  const [ points, setPoints ] = useState(0)

  /* ... */
}
```

Note that it's crucial to only modify the state through its declared setter, since otherwise the component won't be re-rendered.

`useState` and `useEffect` should only be called on the body of a functional component, and not from within a loop or a conditional statement.

#### Effect hook

Effect hooks allow us to perform side-effects (like fetching data). Just like with state hooks, the function needs to be imported:

```javascript
import React, { useEffect } from 'react'
```

Effect hooks start executing immediatly after the componens render. It will take two parameters: first, the callback function that will be executed. The second parameter will specify how often the effect is run. By default, every time the component renders, the effect will be triggered. To limit the execution to only the first time the component renders, an empty array (`[]`) must be passed as the second parameter.

Here's an example of an effect hook used to fetch data from the backend (only the first time the component renders):

```javascript
import React, { useState, useEffect } from 'react'
// ...

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => setNotes(response.data))
  }, [])

  // ...
}

```

## Project structure

```
my-project
  src
    components
    services
```
