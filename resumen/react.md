# React

## Step-by-step React app

* `npx create-react-app <app name>`
* Clear `src` folder.
* Set up `index.js` file in `src`:

```jsx
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(
  <App />,
  document.getElementById('root')
))
```

* Set up `App.js` file in `src` (main entry point to the project):

```jsx
import React from "react"

const App = () => {
  /* your app goes here */
  
  return (/* ... */)
}

export default App
```

* 

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

```jsx
ReactDOM.render(
  <Welcome name="Juan" />,
  document.getElementById('root')
)

const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
}
```

## Hooks

In order to add state fo functional components, we use a React tool called *hooks*.

To use hooks in a file, we import each hook function to be used like so:

```jsx
import React, { useState } from 'react'
```

Then, within a component's body, we declare state as a destructured list which consists of the state variable itself first, then its setter. This variable is set by calling the imported `useState` function, passing the initial value as its parameter.

```jsx
import React, { useState } from 'react'
/* ... */

const Game = () => {
  const [ points, setPoints ] = useState(0)

  /* ... */
}
```

Note that it's crucial to only modify the state through its declared setter, since otherwise the component won't be re-rendered.

`useState` and `useEffect` should only be called on the body of a functional component, and not from within a loop or a conditional statement.
