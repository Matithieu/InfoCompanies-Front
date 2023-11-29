export default class Account {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    dateOfCreation: string;

    constructor(username: string, password: string, email: string, firstName: string, lastName: string, dateOfBirth: string, address: string, city: string, postalCode: string, country: string, phoneNumber: string, dateOfCreation: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.dateOfCreation = dateOfCreation;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getDateOfBirth(): string {
        return this.dateOfBirth;
    }

    public getAddress(): string {
        return this.address;
    }

    public getCity(): string {
        return this.city;
    }

    public getPostalCode(): string {
        return this.postalCode;
    }

    public getCountry(): string {
        return this.country;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public getDateOfCreation(): string {
        return this.dateOfCreation;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public setDateOfBirth(dateOfBirth: string): void {
        this.dateOfBirth = dateOfBirth;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public setPostalCode(postalCode: string): void {
        this.postalCode = postalCode;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public setDateOfCreation(dateOfCreation: string): void {
        this.dateOfCreation = dateOfCreation;
    }
}
