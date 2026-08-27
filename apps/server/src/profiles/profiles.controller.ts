import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import type { UUID } from 'node:crypto';

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
  getById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profileService.getById(id);
  }
  // POST profiles
  @Post()
  create(@Body(new ValidationPipe()) payload: CreateProfileDto) {
    return this.profileService.create(payload);
  }
  // PUT profiles/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body(new ValidationPipe()) payload: UpdateProfileDto,
  ) {
    return this.profileService.update(id, payload);
  }

  // DELETE profiles/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: UUID) {
    this.profileService.delete(id);
  }
}
