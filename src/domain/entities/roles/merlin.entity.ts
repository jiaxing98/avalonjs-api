import { Mordred } from './mordred.entity'
import { Role } from './role.entity'

export class Merlin extends Role {
  constructor() {
    super({ faction: 'good' })
  }

  view(roles: Role[]): Role[] {
    return roles.filter((x) => x.faction === 'evil' && !(x instanceof Mordred))
  }
}
