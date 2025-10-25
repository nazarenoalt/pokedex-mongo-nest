import { Controller, Get, Query } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('insert')
  async insert(@Query('limit') limit: number) {
    await this.seedService.insertPokemons(limit);
  }

  @Get('deleteinsert')
  async deletendInsert(@Query('limit') limit: number) {
    await this.seedService.deleteAllPokemons();
    await this.seedService.insertPokemons(limit);
  }

  @Get('delete')
  async delete() {
    await this.seedService.deleteAllPokemons();
  }
}
