export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  role: string;
  provider: string;
  verified: boolean;

  constructor(id: string, name: string, email: string, phone: string, city: string, address: string, role: string, provider: string, verified: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.address = address;
    this.role = role;
    this.provider = provider;
    this.verified = verified;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getCity(): string {
    return this.city;
  }

  getAddress(): string {
    return this.address;
  }

  getRole(): string {
    return this.role;
  }

  getProvider(): string {
    return this.provider;
  }

  getVerified(): boolean {
    return this.verified;
  }

  setVerified(verified: boolean): void {
    this.verified = verified;
  }

  setRole(role: string): void {
    this.role = role;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setCity(city: string): void {
    this.city = city;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setName(name: string): void {
    this.name = name;
  }

  setId(id: string): void {
    this.id = id;
  }

  // Exemple de méthode
  getProfileInfo() {
    return `Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
  }
}
