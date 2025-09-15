import { Article } from '@application/entities/article';
import { ArticleRepository } from '@application/protocols/db/article-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadArticleById {
  constructor(
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(id: string): Promise<Article | null> {
    return await this.articleRepository.findById(id);
  }
}