export interface User {
    _id?: string;
    email: string;
    username: string;
    flights?: string[];
    admin?: boolean
};