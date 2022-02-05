export type Status = {
    loading?: string;
    success?: string;
    error?: ServorError;
}

export type ServorError = {
    errorMessage: string;
    errorCode: number;
}