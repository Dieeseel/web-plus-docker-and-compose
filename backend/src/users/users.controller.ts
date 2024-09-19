import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne({
      where: {id: req.user.id},
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }

  @Get(':username')
  async findByUserName(@Param('username') username: string) {
    const user = await this.usersService.findOne({
      where: {username: username},
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true
      },
    })

    return user
  }

  @Get('me/wishes')
  findMyWishes(@Req() req) {
    const { id } = req.user
    return this.usersService.findMyWishes(id)
  }

  @Get(':username/wishes')
  findUserWishes(@Param('username') username: string) {
    return this.usersService.findUserWishes(username)
  }

  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user
    return this.usersService.updateMe(id, updateUserDto)
  }

  @Post('find')
  findManyUsers(@Body() value) {
    return this.usersService.findManyUsers(value.query)
  }
}
