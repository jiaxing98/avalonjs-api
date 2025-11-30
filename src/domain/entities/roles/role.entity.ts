export const faction = ['good', 'evil'] as const
export type Faction = (typeof faction)[number]

interface RoleProps {
  faction: Faction
}

export abstract class Role {
  faction: Faction
  leader: boolean
  team: boolean
  withLadyOfTheLake: boolean
  usedLadyOfTheLake: boolean

  constructor({ faction }: RoleProps) {
    this.faction = faction
  }

  abstract view(roles: Role[]): Role[]
}
