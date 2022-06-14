export class UserStorage {
    set token(token: string | undefined) {
        if (!token) {
            localStorage.removeItem('token');
            return;
        }

        localStorage.setItem('token', token);
    }

    get token() {
        return localStorage.getItem('token') ?? undefined;
    }
}