import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	text: string;

	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsString()
	@IsNotEmpty()
	recipeId: string;
}

