import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { randomUUID } from 'node:crypto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { UUID } from 'node:crypto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: 'd202be42-ae0b-4b25-9639-0b92b3da2e34',
      name: 'John Doe',
      description: 'Frontend Engineer',
    },
    {
      id: '7c82758f-aa4a-4b14-9bf0-b3b4d6f7f2f7',
      name: 'Keanu Reeves',
      description: 'Actor',
    },
    {
      id: '164fd120-5744-4cc9-856f-de32bf126d52',
      name: 'Harry Porter',
      description: 'An Actor',
    },
  ];

  get() {
    return this.profiles;
  }

  getById(id: UUID) {
    const profile = this.profiles.find((_prof) => _prof.id === id);

    if (!profile) {
      throw new NotFoundException(`Profile with ID: ${id} doesn't exists.`);
    }
    return profile;
  }

  create(payload: CreateProfileDto) {
    const payloadToSave = {
      id: randomUUID(),
      name: payload.name,
      description: payload.description,
    };
    this.profiles.push(payloadToSave);
    return payloadToSave;
  }

  update(id: UUID, payload: UpdateProfileDto) {
    const profileToUpdate = this.profiles.findIndex((_prof) => _prof.id === id);

    if (profileToUpdate === -1) {
      throw new NotFoundException(`Profile with ID: ${id} doesn't exists`);
    }

    this.profiles.splice(profileToUpdate, 1, { ...payload, id });

    return {
      ...payload,
      id,
    };
  }

  delete(id: UUID) {
    const deleteIndex = this.profiles.findIndex((_prof) => _prof.id === id);

    if (deleteIndex === -1) {
      throw new NotFoundException(`Profile with ID: ${id} doesn't exists`);
    }
    this.profiles.splice(deleteIndex, 1);
  }
}
