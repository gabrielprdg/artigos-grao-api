import { AddArticle } from "@application/use-cases/article/add-article";
import { LoadArticles } from "@application/use-cases/article/load-articles";
import { LoadArticleById } from "@application/use-cases/article/load-article-by-id";
import { UpdateArticleById } from "@application/use-cases/article/update-article-by-id";
import { Module } from "@nestjs/common";
import { ArticleController } from "./controllers/articles/article.controller";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [
    AddArticle,
    LoadArticles,
    LoadArticleById,
    UpdateArticleById
  ],
})
export class HttpModule { }