import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  // GET Profiles
  @Get()
  get() {
    return this.profileService.get();
  }

  // GET profiles/:id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.profileService.getById(id);
  }
  // POST profiles
  @Post()
  create(@Body() payload: CreateProfileDto) {
    return this.profileService.create(payload);
  }
  // PUT profiles/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProfileDto) {
    console.log('log here');

    return this.profileService.update(id, payload);
  }

  // DELETE profiles/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.profileService.delete(id);
  }
}
