# v-signature

`v-signature` is a JavaScript library for capturing and managing digital signatures on an HTML canvas. It provides functionality to draw, clear, save, and configure signature settings.

## Installation

You can install `v-signature` via npm.

```bash
npm install v-signature
```


## Importing

### For ES Modules

If your project uses ES Modules, you can import `v-signature` into your JavaScript files.

```javascript
import vSignature from 'v-signature';
// ...

window.vSignature = vSignature;
```


### For CommonJS

If your project uses CommonJS, you can require `v-signature` in your JavaScript files.

```javascript
const vSignature = require('v-signature');
// ...
window.vSignature = vSignature;
```


## Usage

### Basic Usage

1. **Create HTML Elements**

    Make sure to have an HTML input element for storing the signature data and optionally buttons for clearing and saving.

    ```html
    <input type="hidden" class="signature">
    ```


2. **Initialize signature**

    Initialize the `vSignature` class by specifying the selectors for the input, canvas, clear button, and save button. You can also provide options to configure the appearance and behavior of the signature canvas.

    ```javascript
    document.addEventListener('DOMContentLoaded', function() {
        const signature = new vSignature('signature');
    });
    ```


### Options

You can customize the appearance and behavior of the signature canvas through the `options` parameter when initializing the `vSignature` class. This allows you to adjust properties such as width, height, color, line width, background color, border, and border radius.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const signature = new vSignature('signature', {
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
});
```


### Manually Adding Canvas

If you prefer to manually add a canvas element instead of using the default creation, you can provide a custom selector when initializing the `vSignature` class to get more customization abilities.

```html
<input type="hidden" class="signature">
<canvas class="signature_pad"></canvas>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const signature = new vSignature('signature', {
        canvas: 'signature_pad',
        // ...
        options: {
            // ....
        }
    });
});
```


### Providing Clear and Save Functionality

You can specify buttons for clearing and saving the signature. Ensure that these buttons exist in your HTML and are correctly selected when initializing the `vSignature` class. You can customize them as you wish.

```html
<input type="hidden" class="signature">
<button class="signature_clear">Clear</button>
<button class="signature_save">Save</button>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const signature = new vSignature('signature', {
        // ...
        clear: 'signature_clear',
        save: 'signature_save',
        options: {
            // ....
        }
    });
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

MIT License. See the [LICENSE](https://github.com/SalekurPolas/v-signature/blob/master/LICENSE) file for more details.

## Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/SalekurPolas/v-signature/issues/new).


## Acknowledgments

- [jQuery UI Signature](http://keith-wood.name/signature.html) - Inspiration for the project.


## Support

If you like this project, please consider giving it a ⭐. Thanks for your support!