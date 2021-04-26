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

```jsx
ReactDOM.render(
  <Welcome name="Juan" age={20 + 3} />,
  document.getElementById('root')
)

const Welcome = ({ name, age }) => {
  return <h1>Hello, {name}. You are {age} years old</h1>
}
```

##### In objects in general (object spread)

```jsx
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

```jsx
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

```jsx
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
