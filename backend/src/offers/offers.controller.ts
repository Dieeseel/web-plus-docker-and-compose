import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from 'src/auth/guards/jwt-guard';
import { CreateOfferDto } from './dto/create-offer.dto';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('')
  findAllOrders()  {
    return this.offersService.findAllOffer()
  }

  @Get(':id')
  findOneOffer(@Param('id') id: number)  {
    return this.offersService.findOneOffer(id)
  }

  @Post()
  addOffer(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    return this.offersService.addOffer(createOfferDto, req.user)
  }
}
