import { randomUUID } from 'crypto'
import { QuestManager, QuestManagerProps } from './quest-manager/quest-manager.entity'

type RoomProps = {} & QuestManagerProps

export class Room {
  uid: string
  questManager: QuestManager

  constructor({ players }: RoomProps) {
    this.uid = randomUUID().split('-').at(0)!
    this.questManager = new QuestManager({ players })
  }
}
