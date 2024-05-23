export class UserEntity {
    private id?: string;
    private name: string;
    private email: string;
    private isAdmin: boolean;
    private password: string;

    constructor(name: string, email: string, isAdmin: boolean, password: string, id?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    getId(): string | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }
}
