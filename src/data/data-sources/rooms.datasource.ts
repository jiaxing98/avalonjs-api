import { Inject, Injectable } from '@nestjs/common'
import { Player } from '../../domain/entities/player.entity'
import { Room } from '../../domain/entities/room.entity'
import { REDIS_CLIENT } from 'src/redis.module'
import { type RedisClientType } from 'redis'
import { plainToInstance } from 'class-transformer'

export const RoomsDataSourceToken = Symbol('RoomsDataSource')

export interface RoomsDataSource {
  create(room: Room): Promise<void>
  findAll(): Promise<Room[]>
  remove(roomUID: string): Promise<void>

  getPlayers(roomUID: string): Promise<Player[]>
  addPlayer(roomUID: string, player: Player): Promise<void>
  removePlayer(roomUID: string, playerUID: string): Promise<void>
}

@Injectable()
export class RoomsDataSourceRedisImpl implements RoomsDataSource {
  constructor(@Inject(REDIS_CLIENT) private redis: RedisClientType) {}

  async create(room: Room): Promise<void> {
    await this.redis.set(`room:${room.uid}`, JSON.stringify(room))
  }

  async findAll(): Promise<Room[]> {
    const keys = await this.redis.keys('room:*')
    const rooms = (await Promise.all(keys.map((k) => this.redis.get(k))))
      .filter((r): r is string => r !== null)
      .map((r) => plainToInstance(Room, JSON.parse(r)))
    return rooms
  }

  async remove(roomUID: string): Promise<void> {
    // this.rooms = this.rooms.filter((x) => x.id !== roomUID)
  }

  async getPlayers(roomUID: string): Promise<Player[]> {
    // const room = this.rooms.find((x) => x.id === roomUID)
    // if (!room) throw Error(`Room ${roomUID} not found.`)
    // return room.players
    return []
  }

  async addPlayer(roomUID: string, player: Player): Promise<void> {
    // const room = this.rooms.find((x) => x.id === roomUID)
    // if (!room) throw Error(`Room ${roomUID} not found.`)
    // room.addPlayer(player)
  }

  async removePlayer(roomUID: string, playerUID: string): Promise<void> {
    // const room = this.rooms.find((x) => x.id === roomUID)
    // if (!room) throw Error(`Room ${roomUID} not found.`)
    // room.removePlayer(playerUID)
  }
}
