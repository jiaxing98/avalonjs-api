import { Assassin } from '../roles/assassin.entity'
import { Merlin } from '../roles/merlin.entity'
import { Mordred } from '../roles/mordred.entity'
import { Morgana } from '../roles/morgana.entity'
import { Oberon } from '../roles/oberon.entity'
import { Percival } from '../roles/percival.entity'
import { Role } from '../roles/role.entity'
import { Servant } from '../roles/servant.entity'

export interface Quest {
  teamSize: number
  failRequired: number
}

export interface QuestNumber {
  [numberOfPlayers: number]: Quest
}

export interface QuestMatrix {
  [questNumber: number]: QuestNumber
}

export const questMatrix: QuestMatrix = {
  1: {
    5: { teamSize: 2, failRequired: 1 },
    6: { teamSize: 2, failRequired: 1 },
    7: { teamSize: 2, failRequired: 1 },
    8: { teamSize: 3, failRequired: 1 },
    9: { teamSize: 3, failRequired: 1 },
    10: { teamSize: 3, failRequired: 1 },
  },
  2: {
    5: { teamSize: 3, failRequired: 1 },
    6: { teamSize: 3, failRequired: 1 },
    7: { teamSize: 3, failRequired: 1 },
    8: { teamSize: 4, failRequired: 1 },
    9: { teamSize: 4, failRequired: 1 },
    10: { teamSize: 4, failRequired: 1 },
  },
  3: {
    5: { teamSize: 2, failRequired: 1 },
    6: { teamSize: 4, failRequired: 1 },
    7: { teamSize: 3, failRequired: 1 },
    8: { teamSize: 4, failRequired: 1 },
    9: { teamSize: 4, failRequired: 1 },
    10: { teamSize: 4, failRequired: 1 },
  },
  4: {
    5: { teamSize: 3, failRequired: 1 },
    6: { teamSize: 3, failRequired: 1 },
    7: { teamSize: 4, failRequired: 2 },
    8: { teamSize: 5, failRequired: 2 },
    9: { teamSize: 5, failRequired: 2 },
    10: { teamSize: 5, failRequired: 2 },
  },
  5: {
    5: { teamSize: 3, failRequired: 1 },
    6: { teamSize: 4, failRequired: 1 },
    7: { teamSize: 4, failRequired: 1 },
    8: { teamSize: 5, failRequired: 1 },
    9: { teamSize: 5, failRequired: 1 },
    10: { teamSize: 5, failRequired: 1 },
  },
}

export interface QuestRoleMatrix {
  [numberOfPlayers: number]: Role[]
}

export const questRoleMatrix: QuestRoleMatrix = {
  5: [new Merlin(), new Percival(), new Servant(), new Assassin(), new Morgana()],
  6: [new Merlin(), new Percival(), new Servant(), new Servant(), new Assassin(), new Morgana()],
  7: [
    new Merlin(),
    new Percival(),
    new Servant(),
    new Servant(),
    new Assassin(),
    new Morgana(),
    new Mordred(),
  ],
  8: [
    new Merlin(),
    new Percival(),
    new Servant(),
    new Servant(),
    new Servant(),
    new Assassin(),
    new Morgana(),
    new Mordred(),
  ],
  9: [
    new Merlin(),
    new Percival(),
    new Servant(),
    new Servant(),
    new Servant(),
    new Servant(),
    new Assassin(),
    new Morgana(),
    new Mordred(),
  ],
  10: [
    new Merlin(),
    new Percival(),
    new Servant(),
    new Servant(),
    new Servant(),
    new Servant(),
    new Assassin(),
    new Morgana(),
    new Mordred(),
    new Oberon(),
  ],
}
