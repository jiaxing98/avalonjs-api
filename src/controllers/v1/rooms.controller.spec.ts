import { Test, TestingModule } from '@nestjs/testing'
import {
  RoomsService,
  RoomsServiceImpl,
  RoomsServiceToken,
} from '../../domain/services/rooms.service'
import { RoomsController } from './rooms.controller'

describe('RoomsController', () => {
  let roomsController: RoomsController
  let service: Record<keyof RoomsService, jest.Mock>

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
      getPlayers: jest.fn(),
      addPlayer: jest.fn(),
      removePlayer: jest.fn(),
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsServiceToken,
          useValue: service,
        },
      ],
    }).compile()

    roomsController = app.get<RoomsController>(RoomsController)
  })

  it('', () => {})
})
