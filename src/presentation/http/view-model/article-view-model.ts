import type { Article } from "@application/entities/article";

export class ArticleViewModel {
  static toHTTP(article: Article) {
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      content: article.content,
      tags: article.tags,
      createdAt: article.createdAt
    };
  }
}