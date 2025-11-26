import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from 'redis'

export const REDIS_CLIENT = 'REDIS_CLIENT'

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const REDIS_CONNECTION = config.get<string>('REDIS_CONNECTION')
        const client = createClient({ url: REDIS_CONNECTION })
        client.on('error', (err) => console.error('❌ Redis Client Error', err))

        await client.connect()
        console.log('✅ Redis connected')
        return client
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
