export class ValidationError extends Error {
    public code: number;
    constructor(message: string, code: number) {
        super(message);
        this.name = 'ValidationError';
        this.code = code;
    }
}
