import { Article } from "@application/entities/article";

export abstract class ArticleRepository {
  abstract create(article: Article): Promise<string>;
  abstract loadAll(): Promise<Article[]>;
  abstract findById(id: string): Promise<Article | null>
  abstract update(article: Article): Promise<void>;
}