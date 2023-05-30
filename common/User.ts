export interface Password {
    password: string ;
    iv: string ;
}

export interface User {
    userId: string | null;
    userName: string | null;
    email: string | null;
    password: Password;
    birthday: string | null;
}