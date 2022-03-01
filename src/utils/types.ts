/* Types for fetch-related stuff */
export type StatusError = {
    message: string;
    status: number;
};

export type FetchError = {
    error: StatusError;
};
/*-------------------------------*/

export type Question = {
    user: string;
    email: string;
    carBrand: string;
    carModel: string;
    text: string;
    date?: string;
};
