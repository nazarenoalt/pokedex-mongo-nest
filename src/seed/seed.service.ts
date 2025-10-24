import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fetcher } from 'src/common/adapters/fetcher';
import {
  MongoErrorCode,
  MongoErrorMessages,
} from 'src/constants/error-handling';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

interface IPokemonApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async insertPokemons() {
    const fetcher = new Fetcher();
    const retrievedPokemons: IPokemonApiResponse = await fetcher.get(
      'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
    );

    const pokemonList: CreatePokemonDto[] = retrievedPokemons?.results?.map(
      (pokemon, i) => {
        return {
          name: pokemon.name,
          no: i,
        };
      },
    );

    try {
      this.pokemonModel.insertMany(pokemonList);
    } catch (error) {
      if (error.code === MongoErrorCode.DUPLICATE_KEY) {
        throw new BadRequestException(
          MongoErrorMessages[MongoErrorCode.DUPLICATE_KEY],
        );
      }
    }
  }
}
