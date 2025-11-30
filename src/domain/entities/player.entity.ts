import { randomUUID } from 'crypto'
import { Role } from './roles/role.entity'

export class Player {
  private readonly id: string
  private readonly name: string
  private _isHost: boolean

  public role: Role | undefined

  constructor(name: string, isHost = false) {
    this.id = randomUUID()
    this.name = name
    this._isHost = isHost
  }

  assignRole(role: Role) {
    this.role = role
  }

  assignLeader() {
    if (!this.role) return
    this.role.leader = true
  }

  assignTeam() {
    if (!this.role) return
    this.role.team = true
  }

  resetTeamAssignment() {
    if (!this.role) return
    this.role.leader = false
    this.role.team = false
  }
}
