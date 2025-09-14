import { ArticleRepository } from "@application/protocols/db/article-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaArticleRepository } from "./prisma/repositories/prisma-article-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: ArticleRepository,
      useClass: PrismaArticleRepository,
    }
  ],
  exports: [ArticleRepository],
})
export class DatabaseModule { }