import { Article } from "@application/entities/article";
import { ArticleRepository } from "@application/protocols/db/article-repository";

export class InMemoryArticleRepository implements ArticleRepository {
  public articles: Article[] = [];

  async create(article: Article): Promise<string> {
    this.articles.push(article);
    return article.id
  }

  async loadAll(): Promise<Article[]> {
    return this.articles;
  }

  async findById(id: string): Promise<Article | null> {
    const article = this.articles.find(article => article.id === id);
    return article || null;
  }

  async update(article: Article): Promise<void> {
    const index = this.articles.findIndex(a => a.id === article.id);
    if (index !== -1) {
      this.articles[index] = article;
    }
  }
}