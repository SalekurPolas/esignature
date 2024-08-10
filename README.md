# esignature

`esignature` is a JavaScript library for capturing and managing digital signatures on an HTML canvas. It provides functionality to draw, clear, save, and configure signature settings.

## Installation

You can install `esignature` via npm.

```bash
npm install esignature
```


## Importing

### For ES Modules

If your project uses ES Modules, you can import `esignature` into your JavaScript files.

```javascript
import esignature from 'esignature';
```


### For CommonJS

If your project uses CommonJS, you can require `esignature` in your JavaScript files.

```javascript
const esignature = require('esignature');
```


## Usage

### Basic Usage

1. **Create HTML Elements**

    Make sure to have an HTML input element for storing the signature data and optionally buttons for clearing and saving.

    ```html
    <input type="hidden" class="esignature">
    ```


2. **Initialize esignature**

    Initialize the `esignature` class by specifying the selectors for the input, canvas, clear button, and save button. You can also provide options to configure the appearance and behavior of the signature canvas.

    ```javascript
    const signature = new esignature('esignature');
    ```


### Options

You can customize the appearance and behavior of the signature canvas through the `options` parameter when initializing the `esignature` class. This allows you to adjust properties such as width, height, color, line width, background color, border, and border radius.

```javascript
const signature = new esignature('esignature', {
    // ...
    options: {
        width: '100%',
        height: '300px',
        color: '#000000',
        lineWidth: 2,
        backgroundColor: '#f2f2f2',
        border: '1px dashed #b3b3b3',
        borderRadius: '5px',
    }
});
```


### Manually Adding Canvas

If you prefer to manually add a canvas element instead of using the default creation, you can provide a custom selector when initializing the `esignature` class to get more customization abilities.

```html
<input type="hidden" class="esignature">
<canvas class="esignature_pad"></canvas>
```

```javascript
const signature = new esignature('esignature', {
    canvas: 'esignature_pad',
    // ...
    options: {
        // ....
    }
});
```


### Providing Clear and Save Functionality

You can specify buttons for clearing and saving the signature. Ensure that these buttons exist in your HTML and are correctly selected when initializing the `esignature` class. You can customize them as you wish.

```html
<input type="hidden" class="esignature">
<button class="esignature_clear">Clear</button>
<button class="esignature_save">Save</button>
```

```javascript
const signature = new esignature('esignature', {
    // ...
    clear: 'esignature_clear',
    save: 'esignature_save',
    options: {
        // ....
    }
});
```


## Methods

- **`on(event, callback)`**: Register an event listener for the `change` event, which is triggered when the signature data changes.

```javascript
signature.on('change', (data) => {
    console.log('Signature changed:', data);
});
```


- **`isEmpty()`**: Check if the canvas is empty. This method allows you to determine whether any signature has been drawn.

```javascript
if (signature.isEmpty()) {
    console.log('Canvas is empty');
}
```


## Events

- **`change`**: This event is fired when the signature changes and provides the data URL of the canvas image.

## License

MIT License. See the [LICENSE](https://github.com/SalekurPolas/esignature/blob/master/LICENSE) file for more details.

## Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/SalekurPolas/esignature/issues/new).


## Acknowledgments

- [jQuery UI Signature](http://keith-wood.name/signature.html) - Inspiration for the project.


## Support

If you like this project, please consider giving it a ⭐. Thanks for your support!