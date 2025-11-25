import { Inject, Injectable } from '@nestjs/common'
import { Player } from '../../domain/entities/player.entity'
import { Room } from '../../domain/entities/room.entity'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

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
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(room: Room): Promise<void> {
    await this.cacheManager.set('key', 'value')

    // if (this.rooms.length >= this.maxCapacity) {
    //   throw Error('No more capacity.')
    // }
    // this.rooms.push(room)
  }

  async findAll(): Promise<Room[]> {
    // return this.rooms
    return []
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
