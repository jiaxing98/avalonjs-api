import { Module } from '@nestjs/common'
import { RoomsController } from './controllers/v1/rooms.controller'
import {
  LocalRoomsDataSourceImpl,
  RoomsDataSourceToken,
} from './data/data-sources/rooms.datasource'
import { RoomsServiceImpl, RoomsServiceToken } from './domain/services/rooms.service'

@Module({
  controllers: [RoomsController],
  providers: [
    {
      provide: RoomsDataSourceToken,
      useClass: LocalRoomsDataSourceImpl,
    },
    {
      provide: RoomsServiceToken,
      useClass: RoomsServiceImpl,
    },
  ],
})
export class AppModule {}
