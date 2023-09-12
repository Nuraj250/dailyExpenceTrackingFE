// This interface accept Http response, which has data-array
export interface HttpListResponse<T> {

    status: string;
    data: Array<T>;
    error?: HttpError | null;

}
// This interface accept Http response, which has simple object response
export interface HttpResponse<T> {
    status: string;
    data: T;
    error?: HttpError | null;
}

// This interface accept Http response, which has errors
interface HttpError {

    httpStatus: number;
    code: string;
    message?: string;
    invalidFields?: Map<string, string>
}

