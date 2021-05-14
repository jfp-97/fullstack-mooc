# CSS

A CSS file consists of a set of *rules*.

Rules are defined by *selectors* and *declarations*. The selector determines the scope of the elements to which the the rule (declaration) will be applied.

A declaration consists of a list of properties to which values are assigned. Example:

```css
h1 {
  color: green;
  font-style: italic;
}
```

This in its entirety is a declaration, `h1` is the selector, the lines inside the brackets are the declaration, `color` and `font-style` are properties, and `gree` and `italic` are the values assigned, respectively.

#### Types of selectors

* Universal (`*`): affects all elements.

* Type (`elementName`): affects all elements with the specified tag.

* Class (`.className`): affects all the elements that have been assigned the specified name as the value of its `class` attribute. Several different elements can share a class. Also, several classes can be assigned to an element.

* ID (`#idName`): affects all the elements that have been assigned the specified name as the value of its `id` attribute. The id assigned to an element should be unique within a document.

Note: in react, the attribute should be assigned `className` instead of `class`.
