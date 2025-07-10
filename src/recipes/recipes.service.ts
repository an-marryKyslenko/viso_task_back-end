import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Recipe } from './recipes.type';

@Injectable()
export class RecipesService {
	constructor(private prisma: PrismaService) {}

	async create(data: Recipe) {
		return this.prisma.recipe.create({ data });
	}

	async findAll() {
		return this.prisma.recipe.findMany({ orderBy: { createdAt: 'desc' } });
	}

	async findOne(id: string) {
		const recipe = await this.prisma.recipe.findUnique({ where: { id } });
		if (!recipe) throw new NotFoundException('Recipe not found');
		return recipe;
	}

	async remove(id: string) {
		return this.prisma.recipe.delete({ where: { id } });
	}
}
