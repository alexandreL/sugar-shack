import { IsEnum } from 'class-validator'
import { SyrupType } from '../enum/SyrupType'

export class FilterProductDto {
    @IsEnum(SyrupType)
    syrupType?: SyrupType
}
