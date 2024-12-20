import { ApiProperty, PickType } from '@nestjs/swagger';


import { Exclude } from 'class-transformer';
import { BaseResponse } from 'utils';


export class BaseResUser {
  @ApiProperty({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' })
  user_id: string;

  @ApiProperty({ example: 'James Albert' })
  first_name: string;

  @ApiProperty({ example: 'James Albert' })
  last_name: string;




  @ApiProperty({ example: 'Active' })
  status: string;

 

 

  @Exclude()
  pin: string;
}



export class DeleteResUser extends PickType(BaseResUser, [
  'user_id',
] as const) {}





export class EntityGetUser extends BaseResponse {
  @ApiProperty({
    type: BaseResUser,
  })
  result: BaseResUser;
}

export class EntityCreateUser extends BaseResponse {
  @ApiProperty({
    type: BaseResUser,
  })
  result: BaseResUser;
}

export class EntityUpdateUser extends BaseResponse {
  @ApiProperty({
    type: BaseResUser,
  })
  result: BaseResUser;
}

export class EntityDeleteUser extends BaseResponse {
  @ApiProperty({
    type: DeleteResUser,
  })
  result: DeleteResUser;
}
