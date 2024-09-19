import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { JwtGuard } from 'src/auth/guards/jwt-guard';
import { Wish } from './entities/wishes.entity';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('top')
  findTop() {
    return this.wishesService.findTopWishes()
  }
  
  @Get('last')
  findLast() {
    return this.wishesService.findLastWishes()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne(id)
  }
  
  @Post()
  addWish(@Req() req, @Body() whish: Wish) {
    return this.wishesService.addWish(req.user, whish)
  }

  @Post(':id/copy')
  copyWish(@Param('id') id: number, @Req() req) {
    return this.wishesService.copyWish(id, req.user)
  }

  @Delete(':id')
  deleteWish(@Param('id') id: number, @Req() req) {
    return this.wishesService.deleteWish(id, req.user)
  }

  @Patch(':id')
  updateWish(@Param('id') id: number, @Req() req, @Body() data) {
    return this.wishesService.updateWish(id, req.user, data)
  }
}
