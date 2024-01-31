export class Authority {
  authority: string;

  constructor(authority: string) {
    this.authority = authority;
  }

  public getAuthority(): string {
    return this.authority;
  }

  public setAuthority(authority: string): void {
    this.authority = authority;
  }
}
