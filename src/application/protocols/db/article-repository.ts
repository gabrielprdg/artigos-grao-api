import { Article } from "@application/entities/article";

export abstract class ArticleRepository {
  abstract create(article: Article): Promise<void>;
  abstract findById(id: string): Promise<Article | null>
  abstract save(Article: Article): Promise<void>;
  abstract loadArticles(): Promise<Article[]>;
}