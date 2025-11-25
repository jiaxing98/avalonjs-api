import { Module } from '@nestjs/common'
import { RoomsController } from './controllers/v1/rooms.controller'
import {
  RoomsDataSourceRedisImpl,
  RoomsDataSourceToken,
} from './data/data-sources/rooms.datasource'
import { RoomsServiceImpl, RoomsServiceToken } from './domain/services/rooms.service'
import { CacheModule } from '@nestjs/cache-manager'
import KeyvRedis from '@keyv/redis'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const REDIS_CONNECTION = config.get<string>('REDIS_CONNECTION')
        return {
          stores: [new KeyvRedis(REDIS_CONNECTION)],
        }
      },
    }),
  ],
  controllers: [RoomsController],
  providers: [
    {
      provide: RoomsDataSourceToken,
      useClass: RoomsDataSourceRedisImpl,
    },
    {
      provide: RoomsServiceToken,
      useClass: RoomsServiceImpl,
    },
  ],
})
export class AppModule {}
