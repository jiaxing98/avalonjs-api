import { Role } from './role.entity'

export class Oberon extends Role {
  constructor() {
    super({ faction: 'evil' })
  }

  view(roles: Role[]): Role[] {
    return []
  }
}
