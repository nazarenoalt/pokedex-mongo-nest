import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
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

  async findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({ _id: term });
    } else {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );

    return pokemon;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  async remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

  async rebuildIndexes() {
    // Eliminar todos los índices excepto _id
    await this.pokemonModel.collection.dropIndexes();

    // Recrear los índices según tu schema actual
    await this.pokemonModel.syncIndexes();

    return { message: 'Indexes rebuilt successfully' };
  }
}
