import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
  return this.prisma.comment.create({
    data: {
      text: createCommentDto.text,
      userId: createCommentDto.userId,
      recipeId: createCommentDto.recipeId,
    },
  });
}

  findAll(recipeId: string) {
    return this.prisma.comment.findMany({
      where: {
        recipeId
      }
    })
  }

  remove(id: string) {
    return this.prisma.comment.delete({
      where: {
        id
      }
    });
  }
}
