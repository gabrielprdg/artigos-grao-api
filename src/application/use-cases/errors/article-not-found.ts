export class ArticleNotFound extends Error {
  statusCode: number
  constructor() {
    super('Article not found');
    this.name = 'ArticleNotFound';
    this.statusCode = 404;
  }
}