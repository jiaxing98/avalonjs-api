import { Role } from './role.entity'

export class Servant extends Role {
  constructor() {
    super({ faction: 'good' })
  }

  view(roles: Role[]): Role[] {
    return []
  }
}
