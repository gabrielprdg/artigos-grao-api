import { AddArticle } from "@application/use-cases/article/add-article";
import { Module } from "@nestjs/common";
import { ArticleController } from "./controllers/articles/article.controller";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [
    AddArticle
  ],
})
export class HttpModule { }