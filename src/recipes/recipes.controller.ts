import { Controller, Post, Get, Param, Delete, Body, Req, UseGuards, Put } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.type';
import { Public } from 'src/constants';
import { AuthenticatedRequest } from 'src/types';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('recipes')
export class RecipesController {
	constructor(private readonly recipesService: RecipesService) {}

	@Post()
	create(@Body() data: Recipe) {
		return this.recipesService.create(data);
	}

	@Public()
	@Get()
	findAll() {
		return this.recipesService.findAll();
	}

	@UseGuards(AuthGuard)
	@Get('my')
	findByUser(@Req() req: AuthenticatedRequest) {
		const userId = req.user.id
		return this.recipesService.findByUser(userId);
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.recipesService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	updateOne(@Param('id') id: string, @Body() data: Recipe) {
		return this.recipesService.update(id, data);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.recipesService.remove(id);
	}

}
