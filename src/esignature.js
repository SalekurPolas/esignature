// src/esignature.js
class ESignature {
    constructor(input, {
        canvas = null,
        clear = null,
        save = null,
        options = {}
    } = {}) {
        this.inputSelector = input;
        this.canvasSelector = canvas;
        this.clearSelector = clear;
        this.saveSelector = save;
        this.options = Object.assign({}, {
            width: '100%',
            height: '300px',
            color: '#000000',
            lineWidth: 2,
            backgroundColor: '#f2f2f2',
            border: '1px dashed #b3b3b3',
            borderRadius: '5px',
        }, options);
    
        this.inputElement = null;
        this.canvasElement = null;
        this.clearButton = null;
        this.saveButton = null;
        this.onChange = null;
    
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            // check if input selector is class name
            if (this.inputSelector && !this.inputSelector.startsWith('.')) {
                this.inputSelector = `.${this.inputSelector}`;
            }
            
            // check if canvas selector is class name
            if (this.canvasSelector && !this.canvasSelector.startsWith('.')) {
                this.canvasSelector = `.${this.canvasSelector}`;
            }

            // check if clear button selector is class name
            if (this.clearSelector && !this.clearSelector.startsWith('.')) {
                this.clearSelector = `.${this.clearSelector}`;
            }

            // check if save button selector is class name
            if (this.saveSelector && !this.saveSelector.startsWith('.')) {
                this.saveSelector = `.${this.saveSelector}`;
            }

            // initialize input, canvas, actions elements
            this.inputElement = document.querySelector(this.inputSelector);
            this.canvasElement = document.querySelector(this.canvasSelector);
            this.clearButton = document.querySelector(this.clearSelector);
            this.saveButton = document.querySelector(this.saveSelector);

            // check if input element exists
            if (!this.inputElement) {
                console.log('Input element not found');
                return;
            }

            if (this.canvasElement) {
                if (!this.canvasElement.style.width) {
                    this.canvasElement.style.width = this.options.width;
                }
                if (!this.canvasElement.style.height) {
                    this.canvasElement.style.height = this.options.height;
                }
                if (!this.canvasElement.style.border) {
                    this.canvasElement.style.border = this.options.border;
                }
                if (!this.canvasElement.style.borderRadius) {
                    this.canvasElement.style.borderRadius = this.options.borderRadius;
                }
                if (!this.canvasElement.style.backgroundColor) {
                    this.canvasElement.style.backgroundColor = this.options.backgroundColor;
                }
            } else {
                this.canvasElement = document.createElement('canvas');
                this.canvasElement.style.width = this.options.width;
                this.canvasElement.style.height = this.options.height;
                this.canvasElement.style.border = this.options.border;
                this.canvasElement.style.borderRadius = this.options.borderRadius;
                this.canvasElement.style.backgroundColor = this.options.backgroundColor;
            }

            // hide input element and insert canvas element after input element
            this.inputElement.style.display = 'none';
            this.inputElement.parentNode.insertBefore(this.canvasElement, this.inputElement.nextSibling);

            // set canvas context and initialize drawing variables
            this.context = this.canvasElement.getContext('2d', { willReadFrequently: true });
            this.isDrawing = false;
            this.lastX = 0;
            this.lastY = 0;

            // add event listeners
            this.canvasElement.addEventListener('mousedown', (e) => this.startDrawing(e));
            this.canvasElement.addEventListener('mousemove', (e) => this.draw(e));
            this.canvasElement.addEventListener('mouseup', () => this.stopDrawing());
            this.canvasElement.addEventListener('mouseleave', (e) => this.pauseDrawing(e));
            this.canvasElement.addEventListener('mouseenter', (e) => this.resumeDrawing(e));

            // add clear button event listener
            if (this.clearButton) {
                this.clearButton.addEventListener('click', () => this.clearCanvas());
            }

            // add save button event listener
            if (this.saveButton) {
                this.saveButton.addEventListener('click', () => this.toPNG());
            }
        });
    }

    startDrawing(e) {
        this.isDrawing = true;
        const position = this.pos(e);
        [this.lastX, this.lastY] = [position.x, position.y];
    }

    draw(e) {
        if (!this.isDrawing) return;

        const position = this.pos(e);

        this.context.lineCap = 'round';
        this.context.lineWidth = this.options.lineWidth;
        this.context.strokeStyle = this.options.color;

        this.context.beginPath();
        this.context.moveTo(this.lastX, this.lastY);
        this.context.lineTo(position.x, position.y);
        this.context.stroke();

        [this.lastX, this.lastY] = [position.x, position.y];
    }

    stopDrawing() {
        this.isDrawing = false;
        this.inputElement.value = this.canvasElement.toDataURL();

        if (this.onChange) {
            this.onChange(this.canvasElement.toDataURL());
        }
    }

    pauseDrawing(e) {
        if (this.isDrawing) {
            const position = this.pos(e);
            [this.lastX, this.lastY] = [position.x, position.y];
        }
    }

    resumeDrawing(e) {
        if (this.isDrawing) {
            const position = this.pos(e);
            [this.lastX, this.lastY] = [position.x, position.y];
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        if (this.onChange) {
            this.onChange(null);
        }
    }

    toPNG() {
        const dataURL = this.canvasElement.toDataURL('image/png', 1.0);
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'signature.png';
        a.click();
    }

    toJPEG() {
        const dataURL = this.canvasElement.toDataURL('image/jpeg', 1.0);
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'signature.jpeg';
        a.click();
    }

    pos(e) {
        const rect = this.canvasElement.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (this.canvasElement.width / rect.width),
            y: (e.clientY - rect.top) * (this.canvasElement.height / rect.height)
        };
    }

    on(event, callback) {
        if (event === 'change') {
            this.onChange = callback;
        }
    }

    isEmpty() {
        const pixels = this.context.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height).data;
        
        for (let counter = 0; counter < pixels.length; counter += 4) {
            if (pixels[counter + 3] !== 0) {
                return false;
            }
        }

        return true;
    }
}

// export ESignature class
export default ESignature;