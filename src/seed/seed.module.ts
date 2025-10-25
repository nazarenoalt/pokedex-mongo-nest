import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { PokemonModule } from '../pokemon/pokemon.module';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule],
})
export class SeedModule {}
