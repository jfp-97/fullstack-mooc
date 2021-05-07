# JavaScript

## Destructuring assignment

##### In arrays

```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

##### In objects passed as props/parameters

```javascript
ReactDOM.render(
  <Welcome name="Juan" age={20 + 3} />,
  document.getElementById('root')
)

const Welcome = ({ name, age }) => {
  return <h1>Hello, {name}. You are {age} years old</h1>
}
```

##### In objects in general (object spread)

```javascript
const values = {
  left: 1,
  middle: 1,
  right: 1
}

const increasedRight = values => {
  return {
    ...values,
    right: values.right + 1
  }
}
```

## Event handlers

Event handlers are functions that are set up to be executed when specific events occur. Note that the argument passed when declaring an event handler in HTML sould be a function reference or a function declaration, but not a function call. Otherwise the function will be called when the component renders and not set to be called upon the event.

Note: a function call will usually mean that it is written with parenthesis afterwards.

```javascript
const Greeter = () => {
  const handleClick = () => {
    console.log('Hi!')
  }

  // RIGHT
  return <button onClick={handleClick}> Greet </button>

  // RIGHT
  return <button onClick={() => {console.log('Hi!')}}> Greet </button>

  // WRONG
  return <button onClick={handleClick()}> Greet </button>
}
```

Note: another valid way to set an event handler is by calling a function that returns another function.

```javascript
const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
```

## Promises

A promise is an object representing the eventual completion or failure of an asynchronous operation. It can have three differnet states:

* *Pending*: the final value (one of the following two) is not known yet.

* *Fulfilled*: the operation has completed and the final value is available. It generally represents a successful operation. It's sometimes called *resolved*.

* *Rejected*: an error prevented determining the final value. Generally means a failed operation.

If and when we want to access the result of a promise, we have to set an event handler with the `then` method to it. It takes `request` and `response` parameters. Example:

```javascript
const promise = axios.get('http://localhost:3001/notes')

promise.then((request, response) => {
  console.log(response)
})
```

From the `response` parameter, we can access the `data`, `statusCode` and `headers`, fields. Even when the server returns a JSON text string, axios will parse it into a JS object stored in the `data` field.

Note: it's generally unnecessary to store promises into variables, so it'd be sensible to chain the `then` method to the axios method call, like this for example:

```javascript
axios.get('http://localhost:3001/notes').then(response => console.log(response.data))
```
