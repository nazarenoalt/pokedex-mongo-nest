import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';
@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      if (error instanceof MongoServerError && error?.code == '11000') {
        throw new BadRequestException(
          `This pokemon already exists in the database: ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        'Something wrong happened creating the pokemon.',
      );
    }

    return createPokemonDto;
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(term: string) {
    return `This action returns a #${term} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
