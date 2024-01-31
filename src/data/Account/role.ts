export class Role {
  id: number;
  roleName: string;

  constructor(id: number, roleName: string) {
    this.id = id;
    this.roleName = roleName;
  }

  public getId(): number {
    return this.id;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setRoleName(roleName: string): void {
    this.roleName = roleName;
  }
}
