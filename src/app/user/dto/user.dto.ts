import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';



export class CreateUserDto {
  @ApiProperty({ example: 'Gaurav' })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'sam' })
  @IsOptional()
  @IsString()
  last_name: string;


 
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}


