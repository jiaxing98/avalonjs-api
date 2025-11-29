import { Player } from './player.entity'

interface RoomProps {
  uid: string
  players: Player[]
}

export class Room {
  static MIN_PLAYER = 5
  static MAX_PLAYER = 10

  uid: string
  players: Player[]

  constructor(props: RoomProps) {
    Object.assign(this, props)
  }
}
