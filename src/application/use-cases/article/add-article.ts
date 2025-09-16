import { Article } from '@application/entities/article';
import { ArticleRepository } from '@application/protocols/db/article-repository';
import { Injectable } from '@nestjs/common';

interface ArticleDataResponse {
  id: string;
}

interface ArticleDataRequest {
  title: string;
  content: string;
  author: string;
  url?: string;
  tags?: string[];
}

@Injectable()
export class AddArticle {
  constructor(
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(articleData: ArticleDataRequest): Promise<ArticleDataResponse> {
    const { title, content, author, url, tags } = articleData;

    const article = new Article({
      title,
      content,
      author,
      url,
      tags,
    });

    const id = await this.articleRepository.create(article);

    return { id };
  }
}