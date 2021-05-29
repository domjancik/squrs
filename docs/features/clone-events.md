Cloning is done via custom DOM events

### Detail fields

- expression
    new expression to update to
- condition
    optional condition specifying whether to set the expression
    evaluated using expression-eval, has access to Squr's variables

### Listening for events

Each Squr listens for setExpression events.

``` js
window.addEventListener('setExpression', callback)
```

Squrs handle these events using the active setExpression function.
This way the expression will always be persisted using the wrapping state manager.

### Firing events

Events can be fired from anywhere inside of a Squr, make sure to allow for bubbling (bubbles: true).

``` js
const event = new CustomEvent('setExpression', {
    detail: {
        expression: 'sin(t)',
        condition: 'x == 0',
    },
    bubbles: true
})

element.dispatchEvent(event)
```

## Conditions

The condition field can be used for the following scenarios (and others):
- clone to a single row or column
- clone only to selected squrs
- clone to random squr
- clone to squr based on time