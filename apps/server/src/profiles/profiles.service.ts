import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { randomUUID } from 'node:crypto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  getById(id: string) {
    return this.profiles.find((_prof) => _prof.id === id);
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

  update(id: string, payload: UpdateProfileDto) {
    const profileExists = this.profiles.findIndex((_prof) => _prof.id === id);

    if (profileExists != -1) {
      this.profiles.map((_prof) =>
        _prof.id === id
          ? { ..._prof, name: payload.name, description: payload.description }
          : _prof,
      );

      return {
        ...payload,
        id,
      };
    }
    return payload;
  }

  delete(id: string) {
    const deleteIndex = this.profiles.findIndex((_prof) => _prof.id === id);

    if (deleteIndex != -1) {
      this.profiles.splice(deleteIndex, 1);
      console.log('.');
    }
  }
}
