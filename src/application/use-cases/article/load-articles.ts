import { Article } from '@application/entities/article';
import { ArticleRepository } from '@application/protocols/db/article-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadArticles {
  constructor(
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(): Promise<Article[]> {
    return await this.articleRepository.loadAll();
  }
}