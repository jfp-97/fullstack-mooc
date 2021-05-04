# HTML

## Forms

#### Example form

```javascript
<form onSubmit={eventHandler}>
  <input /* ...input attributes */ />
  <button type="submit">send</button>
</form>
```

#### `onSubmit` attribute 

The event handler function set as the value for this attribute should always take an `event` parameter and start with the command `event.preventDefault()`. The `event` parameter is the event that triggers the call to the event handler function.

Example:

```javascript
const eventHandler = (event) => {
  event.preventDefault()
  
  // ...rest of the function
}
```

#### `input` sub-element

The data contained within the `input` element will be handled through a controlled component: the `value` attribute will be set to an external variable, which will be modified by the event handler set to the `onChange` attribute.

Attributes:

* `placeholder`: grayed-out text that appears when the input is empty.
* `value`: the actual text written in the box. Set initially to an empty string through a controlled component.
* `onChange`: event handler for when the text in the input is modified.

The value written in the input can be accessed from the `onChange` event handler as `event.target.value`. In this case it's not necessary to call `preventDefault()`.
