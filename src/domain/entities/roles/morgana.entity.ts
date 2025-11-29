import { Oberon } from './oberon.entity'
import { Role } from './role.entity'

export class Morgana extends Role {
  constructor() {
    super({ faction: 'evil' })
  }

  view(roles: Role[]): Role[] {
    return roles.filter(
      (x) =>
        !(x instanceof (this.constructor as any)) && x.faction === 'evil' && !(x instanceof Oberon)
    )
  }
}
