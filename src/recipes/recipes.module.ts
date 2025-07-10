import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "./recipes.service";

@Module({
	imports: [PrismaModule],
	controllers: [RecipesController],
	providers: [RecipesService],
})
export class RecipesModule {}