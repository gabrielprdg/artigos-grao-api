import { Injectable } from '@nestjs/common';
import { Article } from '@application/entities/article';
import { ArticleRepository } from '@application/protocols/db/article-repository';
import { PrismaService } from '../../prisma.service';
import { PrismaArticleMapper } from '../mappers/prisma-article-mapper';

@Injectable()
export class PrismaArticleRepository implements ArticleRepository {
  constructor(private prismaService: PrismaService) {}

  async create(article: Article): Promise<string> {
    const raw = PrismaArticleMapper.toPrisma(article);

    const createdArticle = await this.prismaService.article.create({
      data: raw,
      select: {
        id: true,
      },
    });

    return createdArticle.id;
  }

  async loadAll(): Promise<Article[]> {
    const articles = await this.prismaService.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return PrismaArticleMapper.toArrayDomain(articles);
  }

  async findById(id: string): Promise<Article | null> {
    const article = await this.prismaService.article.findUnique({
      where: { id },
    });

    if (!article) {
      return null;
    }

    return PrismaArticleMapper.toDomain(article);
  }

  async update(article: Article): Promise<void> {
    const raw = PrismaArticleMapper.toPrisma(article);

    await this.prismaService.article.update({
      where: { id: article.id },
      data: raw,
    });
  }
}