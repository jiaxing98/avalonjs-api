import { IsString, IsNotEmpty } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  hostname!: string
}
