import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.type';

@Controller('recipes')
export class RecipesController {
	constructor(private readonly recipesService: RecipesService) {}

	@Post()
	create(@Body() data: Recipe) {
		return this.recipesService.create(data);
	}

	@Get()
	findAll() {
		return this.recipesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.recipesService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.recipesService.remove(id);
	}
}
