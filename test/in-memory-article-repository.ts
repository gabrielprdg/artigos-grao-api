import { Article } from "@application/entities/article";
import { ArticleRepository } from "@application/protocols/db/article-repository";

export class InMemoryArticleRepository implements ArticleRepository {
  public articles: Article[] = [];

  async create(article: Article): Promise<string> {
    this.articles.push(article);
    return article.id;
  }
}