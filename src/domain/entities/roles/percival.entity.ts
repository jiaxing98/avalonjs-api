import { Merlin } from './merlin.entity'
import { Morgana } from './morgana.entity'
import { Role } from './role.entity'

export class Percival extends Role {
  constructor() {
    super({ faction: 'good' })
  }

  view(roles: Role[]): Role[] {
    return roles.filter((x) => x instanceof Merlin || x instanceof Morgana)
  }
}
