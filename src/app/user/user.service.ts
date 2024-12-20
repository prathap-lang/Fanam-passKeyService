import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {

  CreateUserDto,
 
  UpdateUserDto,
} from './dto';
import { BaseResUser } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /*  async create({
    first_name,
    last_name,
    email,
    phone_no,
    state_id,
    city_id,
    zip_code,
    country_id,
  }: CreateUserDto) {
    const country = await this.prisma.country.findFirst({
      where: { country_id },
    });
    const state = await this.prisma.state.findUnique({ where: { state_id } });
    const city = await this.prisma.city.findUnique({ where: { city_id } });
    if (!country) throw new NotFoundException('Country not found');

    if (!state) throw new NotFoundException('State not found');

    if (!city) throw new NotFoundException('City not found');

    const data: Prisma.UserCreateInput = {
      first_name,
      last_name,
      email,
      phone_no,
      state: { connect: { state_id } },
      city: { connect: { city_id } },
      zip_code,
      country: { connect: { country_id } },
      role: {
        connect: { role_id: await getRole(this.prisma, Roles.ROLE_USER) },
      },
      // customer_hash,
    };
    return this.prisma.user.create({
      data,
      include: {
        country: {
          select: {
            country_id: true,
            country_name: true,
            iso2: true,
            currency: true,
            emojiU: true,
            phone_code: true,
          },
        },
        state: {
          select: {
            state_id: true,
            state_name: true,
          },
        },
        city: { select: { city_id: true, city_name: true } },
      },
    });
  }*/

  async findAll() {
    return await this.prisma.user.findMany({
     
      
    });
  }

  async findOne(user_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { user_id },
      include: {
        
        
        country: {
          select: {
            country_name: true,
            iso2: true,
            iso3: true,
            currency: true,
            country_id: true,
            currency_symbol: true,
            emoji: true,
            emojiU: true,
            phone_code: true,
            bankInputs: true,
          },
        },
        state: {
          select: {
            state_id: true,
            state_name: true,
          },
        },
        city: { select: { city_id: true, city_name: true } },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getProfile({ user_id }: BaseResUser) {
    const result: any = await this.prisma.user.findUnique({
      where: { user_id },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        business_name: true,
        email: true,
        phone_no: true,
        date_of_birth: true,
        address_line_1: true,
        address_line_2: true,
        account_no: true,
        account_type: true,
        country: {
          select: {
            country_name: true,
            iso2: true,
            iso3: true,
            currency: true,
            country_id: true,
            currency_symbol: true,
            emoji: true,
            emojiU: true,
            phone_code: true,
            bankInputs: true,
          },
        },
        state: {
          select: {
            state_id: true,
            state_name: true,
          },
        },
        city: { select: { city_id: true, city_name: true } },
        zip_code: true,
        status: true,
      },
    });
    if (!result) throw new NotFoundException('User not found');
  
    /*  if (!result.kyc_details?.length || result.kyc_details?.length < 2) {
      result.status = 'Pending';
    } else if (result.kyc_details.length >= 2) {
      const aadhaarKyc = result.kyc_details.find(
        (kyc) => kyc.type === 'Aadhaar',
      );
      const panKyc = result.kyc_details.find((kyc) => kyc.type === 'PAN');

      if (
        !aadhaarKyc ||
        aadhaarKyc.is_verified === false ||
        !panKyc ||
        panKyc.is_verified === false
      ) {
        result.status = 'Pending';
      }
    }*/
    return result;
  }

  async update(
    user_id: string,
    {
      first_name,
      last_name,
   
      
    }: UpdateUserDto,
  ) {
    const user = await this.findOne(user_id);
   
 
    
   
    const data: Prisma.UserUpdateInput = {
      first_name,
      last_name,
     
    };
    const result = await this.prisma.user.update({
      where: { user_id },
      data,
      include: {
      
        country: {
          select: {
            country_id: true,
            country_name: true,
            iso2: true,
            iso3: true,
            currency: true,
            emojiU: true,
            phone_code: true,
            bankInputs: true,
          },
        },
        state: {
          select: {
            state_id: true,
            state_name: true,
          },
        },
        city: { select: { city_id: true, city_name: true } },
      },
    });

  

    return result;
  }

  async syncUser({ user_id }: BaseResUser, body: CreateUserDto) {
    const {
     
      first_name,
      last_name,
    
    } = body;
    const user = await this.prisma.user.findUnique({
      where: { user_id },
    });
    
   
    const data: Prisma.UserUpdateInput = {
      first_name,
      last_name,
     
    
     
    };

    return await this.prisma.user.update({
      where: { user_id },
      data,
      include: {
       
        country: {
          select: {
            country_id: true,
            country_name: true,
            iso2: true,
            iso3: true,
            currency: true,
            emojiU: true,
            phone_code: true,
            bankInputs: true,
          },
        },
        state: {
          select: {
            state_id: true,
            state_name: true,
          },
        },
        city: { select: { city_id: true, city_name: true } },
      },
    });
  }

 

 
  
}
