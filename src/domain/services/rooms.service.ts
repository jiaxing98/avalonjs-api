import { Inject, Injectable } from '@nestjs/common'
import { Player } from '../entities/player.entity'
import { Room } from '../entities/room.entity'
import { CreatePlayerDto } from 'src/data/dtos/create-player.dto'
import { type RoomsDataSource, RoomsDataSourceToken } from 'src/data/data-sources/rooms.datasource'

export const RoomsServiceToken = Symbol('RoomsService')

export interface RoomsService {
  create(dto: CreatePlayerDto): Promise<void>
  findAll(): Promise<Room[]>
  remove(roomUID: string): Promise<void>

  getPlayers(roomUID: string): Promise<Player[]>
  addPlayer(roomUID: string, dto: CreatePlayerDto): Promise<void>
  removePlayer(roomUID: string, playerUID: string): Promise<void>
}

@Injectable()
export class RoomsServiceImpl implements RoomsService {
  constructor(
    @Inject(RoomsDataSourceToken)
    private readonly ds: RoomsDataSource
  ) {}

  async create(dto: CreatePlayerDto): Promise<void> {
    const host = new Player(dto.name, true)
    await this.ds.create(new Room([host]))
  }

  async findAll(): Promise<Room[]> {
    return await this.ds.findAll()
  }

  async remove(roomUID: string): Promise<void> {
    await this.ds.remove(roomUID)
  }

  async getPlayers(roomUID: string): Promise<Player[]> {
    return await this.ds.getPlayers(roomUID)
  }

  async addPlayer(roomUID: string, dto: CreatePlayerDto): Promise<void> {
    const player = new Player(dto.name)
    await this.ds.addPlayer(roomUID, player)
  }

  async removePlayer(roomUID: string, playerUID: string): Promise<void> {
    await this.ds.removePlayer(roomUID, playerUID)
  }
}
