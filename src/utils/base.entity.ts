import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ example: 200 })
  status_code: number;

  @ApiProperty({ example: 'Success' })
  status: string;

  @ApiProperty({ example: 'Request Processed Successfully' })
  message: string;

  @ApiProperty({ example: false })
  is_encrypted: boolean;
}

export class AppResponse<R> {
  status_code: number;
  status: string;
  message: string;
  is_encrypted: boolean;
  result: R;

  constructor(
    result: R,
    message: string = 'Request is processed successfully',
    status: string = 'Success',
    statusCode: number = 200,
    isEncrypted: boolean = false,
  ) {
    this.status_code = statusCode;
    this.status = status;
    this.message = message;
    this.is_encrypted = isEncrypted;
    this.result = result;
  }
}

export class EntityErrorResponse {
  @ApiProperty({ example: 400 })
  status_code: number;

  @ApiProperty({ example: 'Error' })
  status: string;

  @ApiProperty({ example: 'Something went wrong' })
  message: string;

  @ApiProperty({ example: false })
  is_encrypted: boolean;

  @ApiProperty({ example: null })
  result: any;
}
