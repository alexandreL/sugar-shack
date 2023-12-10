import { IsEnum, IsOptional, IsString } from 'class-validator'
import { SyrupType } from '../enum/SyrupType'

export class FilterProductDto {
    @IsEnum(SyrupType)
    @IsOptional()
    syrupType?: SyrupType

    @IsString()
    @IsOptional()
    skip?: string

    @IsString()
    @IsOptional()
    take?: string
}
