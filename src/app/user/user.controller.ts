import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'decorators';

import { AppResponse, EntityErrorResponse } from 'utils';
import {
  
  CreateUserDto,

  UpdateUserDto,
} from './dto';
import {
  BaseResUser,
  EntityGetUser,
  EntityUpdateUser,
} from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@ApiBadRequestResponse({
  type: EntityErrorResponse,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @Post('create')
  @ApiOperation({ summary: 'Create User' })
  @ApiOkResponse({ type: EntityCreateUser })
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return new AppResponse(user, 'Created Users Successfully');
  }*/

  // @ApiOperation({ summary: 'Get all User' })
  // @ApiOkResponse({ type: any })
  // @Get()
  // async findAll() {
  //   const users = await this.userService.findAll();
  //   return new AppResponse(users, 'Fetched Users Successfully');
  // }

  @ApiOperation({ summary: 'Get User Profile' })
  @ApiOkResponse({ type: EntityGetUser })
  @Get('me')
  async findUserProfile(@CurrentUser() user: BaseResUser) {
    const result = await this.userService.getProfile(user);
    return new AppResponse(result, 'Fetched User Profile Successfully');
  }

  @ApiOperation({ summary: 'Sync User' })
  @ApiOkResponse({ type: EntityUpdateUser })
  @Put('sync')
  async syncUser(
    @Body() body: CreateUserDto,
    @CurrentUser() user: BaseResUser,
  ) {
    const result = await this.userService.syncUser(user, body);
    return new AppResponse(result, 'Updated User Successfully');
  }

  @ApiOperation({ summary: 'Get User by id' })
  @ApiOkResponse({ type: EntityGetUser })
  @Get(':user_id')
  async findOne(@Param('user_id') user_id: string) {
    const user = await this.userService.findOne(user_id);
    return new AppResponse(user, 'Fetched User Detail Successfully');
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({ type: EntityUpdateUser })
  @Put(':user_id')
  async update(@Param('user_id') user_id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(user_id, body);
    return new AppResponse(user, 'Updated User Successfully');
  }

  
 





  /* @Delete(':user_id')
  async remove(@Param('user_id') user_id: string) {
    await this.findOne(user_id);
    const user = await this.userService.remove(user_id);
    return new AppResponse(user, 'Removed User Successfully');
  }*/
}
