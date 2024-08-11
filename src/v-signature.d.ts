// src/v-signature.d.ts
interface vSignatureOptions {
    width?: string;
    height?: string;
    color?: string;
    lineWidth?: number;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
}

interface vSignatureConfig {
    canvas?: string | null;
    clear?: string | null;
    save?: string | null;
    options?: vSignatureOptions;
}

declare class vSignature {
    inputSelector: string;
    canvasSelector: string | null;
    clearSelector: string | null;
    saveSelector: string | null;
    options: vSignatureOptions;

    inputElement: HTMLInputElement | null;
    canvasElement: HTMLCanvasElement | null;
    clearButton: HTMLElement | null;
    saveButton: HTMLElement | null;
    onChange: ((data: string | null) => void) | null;
    
    context: CanvasRenderingContext2D | null;
    isDrawing: boolean;
    lastX: number;
    lastY: number;

    constructor(input: string, config?: vSignatureConfig);

    init(): void;

    startDrawing(e: MouseEvent): void;

    draw(e: MouseEvent): void;

    stopDrawing(): void;

    pauseDrawing(e: MouseEvent): void;

    resumeDrawing(e: MouseEvent): void;

    clearCanvas(): void;

    toPNG(): void;

    toJPEG(): void;

    pos(e: MouseEvent): { x: number; y: number };

    on(event: 'change', callback: (data: string | null) => void): void;

    isEmpty(): boolean;
}

export default vSignature;