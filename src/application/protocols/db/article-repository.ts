import { Article } from "@application/entities/article";

export abstract class ArticleRepository {
  abstract create(article: Article): Promise<string>;
  // abstract findById(id: string): Promise<Article | null>
  // abstract update(Article: Article): Promise<void>;
  // abstract loadArticles(): Promise<Article[]>;
}