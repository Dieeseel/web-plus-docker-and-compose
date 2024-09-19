import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAllWishlists() {
    return this.wishlistsService.findAllWishlists()
  }

  @Get(':id')
  findWishlistById(@Param('id') id: number) {
    return this.wishlistsService.findWishlistById(id)
  }

  @Post()
  addWishlist(@Body() data: CreateWishlistDto, @Req() req) {
    return this.wishlistsService.addWishlist(data, req.user)
  }

  @Delete(':id')
  deleteWishlist(@Param('id') id: number, @Req() req) {
    return this.wishlistsService.deleteWishlist(id, req.user)
  }
}
