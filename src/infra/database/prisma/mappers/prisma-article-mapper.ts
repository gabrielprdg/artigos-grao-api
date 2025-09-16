import { Article } from "@application/entities/article";
import { Article as RawArticle } from "@prisma/client";

export class PrismaArticleMapper {
  static toPrisma(article: Article) {
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      content: article.content,
      url: article.url,
      tags: article.tags,
      createdAt: article.createdAt
    };
  }

  static toDomain(raw: RawArticle): Article {
    return new Article(
      {
        title: raw.title,
        author: raw.author,
        content: raw.content,
        url: raw.url || undefined,
        tags: Array.isArray(raw.tags) ? raw.tags as string[] : [],
        createdAt: raw.createdAt
      },
      raw.id
    );
  }

   static toArrayDomain(raw: RawArticle[]): Article[] {
    const articles = raw.map(
      (article) =>
        new Article(
          {
            title: article.title,
            author: article.author,
            content: article.content,
            url: article.url || undefined,
            tags: Array.isArray(article.tags) ? article.tags as string[] : [],
            createdAt: article.createdAt
          },
          article.id,
        ),
    );

    return articles;
  }
}