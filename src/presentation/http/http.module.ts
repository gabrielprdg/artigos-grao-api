import { AddArticle } from "@application/use-cases/article/add-article";
import { LoadArticles } from "@application/use-cases/article/load-articles";
import { Module } from "@nestjs/common";
import { ArticleController } from "./controllers/articles/article.controller";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [
    AddArticle,
    LoadArticles
  ],
})
export class HttpModule { }