import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from '../auth/decorators/user.decorator';
import { UnauthorizedException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { User } from '../auth/entities/user.entity';
import { ROLES } from '../auth/constants/roles.constants';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.EMPLOYEE)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
@Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
 @Get()
findAll(@UserData() user: User) {
  if (!user.userRoles.includes('admin')) {
    throw new UnauthorizedException("No estas autorizado, solo admins");
  }

  return this.providersService.findAll();
}
@Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('/name/:name')
  findByName(@Param(':name') name: string){
    return this.providersService.findOneByName(name);
  }
@Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException()
      return provider
  }
@Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }
@Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
