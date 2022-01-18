export interface User {
    id: number,
    username: string;
    password: string;
}

export interface UserRegister {
    username: string;
    password: string;
}

export interface UserAuth{
    access_token: string;
    user: User;
}
