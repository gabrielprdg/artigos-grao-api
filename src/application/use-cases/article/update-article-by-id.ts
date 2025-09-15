import { Article } from '@application/entities/article';
import { ArticleRepository } from '@application/protocols/db/article-repository';
import { ArticleNotFound } from '@application/use-cases/errors/article-not-found';
import { Injectable } from '@nestjs/common';

interface UpdateArticleRequest {
  id: string;
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
}

@Injectable()
export class UpdateArticleById {
  constructor(
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(data: UpdateArticleRequest): Promise<Article> {
    const existingArticle = await this.articleRepository.findById(data.id);

    if (!existingArticle) {
      throw new ArticleNotFound();
    }

    const updatedArticle = new Article({
      title: data.title ?? existingArticle.title,
      content: data.content ?? existingArticle.content,
      author: data.author ?? existingArticle.author,
      tags: data.tags ?? existingArticle.tags,
      createdAt: existingArticle.createdAt,
    }, existingArticle.id);

    await this.articleRepository.update(updatedArticle);

    return updatedArticle;
  }
}