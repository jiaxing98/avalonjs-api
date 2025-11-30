import { randomUUID } from 'crypto'
import { Player } from './player.entity'
import { QuestManager } from './quest-manager/quest-manager.entity'

interface RoomProps {
  players: Player[]
}

export class Room {
  uid: string
  questManager: QuestManager
  players: Player[]

  constructor({ players }: RoomProps) {
    this.uid = randomUUID().split('-').at(0)!
    this.questManager = new QuestManager()
    this.players = players
  }
}
