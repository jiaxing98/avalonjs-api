import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common'
import { CreatePlayerDto } from 'src/data/dtos/create-player.dto'
import { CreateRoomDto } from 'src/data/dtos/create-room.dto'
import { type RoomsService, RoomsServiceToken } from '../../domain/services/rooms.service'

@Controller({
  path: 'rooms',
  version: '1',
})
export class RoomsController {
  constructor(
    @Inject(RoomsServiceToken)
    private readonly roomService: RoomsService
  ) {}

  @Post()
  async create(@Body() dto: CreateRoomDto) {
    return await this.roomService.create(dto)
  }

  @Get()
  async findAll() {
    return await this.roomService.findAll()
  }

  @Delete(':roomUID')
  async remove(@Param('roomUID') roomUID: string) {
    return await this.roomService.remove(roomUID)
  }

  @Get(':roomUID')
  async getPlayers(@Param('roomUID') roomUID: string) {
    return await this.roomService.getPlayers(roomUID)
  }

  @Post(':roomUID/add-player')
  async addPlayer(@Param('roomUID') roomUID: string, @Body() dto: CreatePlayerDto) {
    return await this.roomService.addPlayer(roomUID, dto)
  }

  @Post(':roomUID/remove-player')
  async removePlayer(@Param('roomUID') roomUID: string, @Body() playerUID: string) {
    return await this.roomService.removePlayer(roomUID, playerUID)
  }
}
