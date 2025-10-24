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
import { MONGO_ERROR_CODE } from 'src/constants/code-errors';
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
      this.handleExceptions(error);
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: Pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const updatedPokemon: Pokemon = await pokemon.updateOne(
        updatePokemonDto,
        {
          new: true,
        },
      );
      if (!updatedPokemon) throw new NotFoundException(`Pokemon not found.`);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount == 0)
      throw new BadRequestException(`The Id inserted is not valid.`);
    return id;
  }

  private handleExceptions(error: MongoServerError) {
    if (error.code === MONGO_ERROR_CODE.DUPLICATE_KEY) {
      throw new BadRequestException(
        `Some of the fields cannot be inserted due they must be unique. ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(`Error updating the pokemon.`);
  }
}
