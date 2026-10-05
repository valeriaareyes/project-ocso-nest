import {IsEmail,isObject,IsOptional,IsString,MaxLength} from 'class-validator';
import { Employee } from '../entities/employee.entity';
import { Location } from '../../locations/entities/location.entity';
import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto extends Employee {
  @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string;
 @ApiProperty()
    @IsString()
    @MaxLength(70)
    declare employeeLastName: string;
 @ApiProperty()
    @IsString()
    @MaxLength(10)
    declare employeePhoneNumber: string;
 @ApiProperty()
    @IsString()
    @IsEmail()
    declare employeeEmail: string;
@IsOptional()
    @IsObject()
    declare location: Location;
}

export class LocationEmployeeDto extends Location {
    @ApiProperty()
    declare locationId: number;

    @ApiPropertyOptional()
    declare locationName: string;

    @ApiPropertyOptional()
    declare locationLatLng: number[];

    @ApiPropertyOptional()
    declare locationAddress: string;
}