import { Authority } from "./authority";
import { Role } from "./role";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  city: string | null;
  address: string | null;
  roles: Role[];
  verified: boolean;
  companySeen: string | null;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string | null,
    city: string | null,
    address: string | null,
    roles: Role[],
    verified: boolean,
    companySeen: string | null,
    enabled: boolean,
    username: string,
    authorities: Authority[],
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.city = city;
    this.address = address;
    this.roles = roles;
    this.verified = verified;
    this.companySeen = companySeen;
    this.enabled = enabled;
    this.username = username;
    this.authorities = authorities;
    this.accountNonExpired = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.credentialsNonExpired = credentialsNonExpired;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getPhone(): string | null {
    return this.phone;
  }

  public getCity(): string | null {
    return this.city;
  }

  public getAddress(): string | null {
    return this.address;
  }

  public getRoles(): Role[] {
    return this.roles;
  }

  public getVerified(): boolean {
    return this.verified;
  }

  public getCompanySeen(): string | null {
    return this.companySeen;
  }

  public getEnabled(): boolean {
    return this.enabled;
  }

  public getUsername(): string {
    return this.username;
  }

  public getAuthorities(): Authority[] {
    return this.authorities;
  }

  public getAccountNonExpired(): boolean {
    return this.accountNonExpired;
  }

  public getAccountNonLocked(): boolean {
    return this.accountNonLocked;
  }

  public getCredentialsNonExpired(): boolean {
    return this.credentialsNonExpired;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setPhone(phone: string | null): void {
    this.phone = phone;
  }

  public setCity(city: string | null): void {
    this.city = city;
  }

  public setAddress(address: string | null): void {
    this.address = address;
  }

  public setRoles(roles: Role[]): void {
    this.roles = roles;
  }

  public setVerified(verified: boolean): void {
    this.verified = verified;
  }

  public setCompanySeen(companySeen: string | null): void {
    this.companySeen = companySeen;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setAuthorities(authorities: Authority[]): void {
    this.authorities = authorities;
  }

  public setAccountNonExpired(accountNonExpired: boolean): void {
    this.accountNonExpired = accountNonExpired;
  }

  public setAccountNonLocked(accountNonLocked: boolean): void {
    this.accountNonLocked = accountNonLocked;
  }

  public setCredentialsNonExpired(credentialsNonExpired: boolean): void {
    this.credentialsNonExpired = credentialsNonExpired;
  }
}
