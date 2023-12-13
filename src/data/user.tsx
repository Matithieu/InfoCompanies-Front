export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  role: string;
  photo: string;
  provider: string;
  verified: string;

  constructor(id: string, name: string, email: string, phone: string, city: string, address: string, role: string, photo: string, provider: string, verified: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.address = address;
    this.role = role;
    this.photo = photo;
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

  getPhoto(): string {
    return this.photo;
  }

  getProvider(): string {
    return this.provider;
  }

  getVerified(): string {
    return this.verified;
  }

  setVerified(verified: string): void {
    this.verified = verified;
  }

  setPhoto(photo: string): void {
    this.photo = photo;
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
