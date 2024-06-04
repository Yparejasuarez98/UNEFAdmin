export interface ResponseData {
    data: any;
    message: string;
    code: number;
}

export interface Result {
    data: string;
    message: string;
    code: number;
}

export interface ResponsePagination {
    code: number;
    current_page: number;
    data: any;
    message: string;
    per_page: number;
    total_pages: number;
    total_records: number;
    total_results?: number;
}