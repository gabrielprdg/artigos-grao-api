import { LoadArticleById } from './load-article-by-id';
import { Article } from '@application/entities/article';
import { InMemoryArticleRepository } from '@test/in-memory-article-repository';

describe('LoadArticleById', () => {
  let loadArticleById: LoadArticleById;
  let articleRepository: InMemoryArticleRepository;

  beforeEach(() => {
    articleRepository = new InMemoryArticleRepository();
    loadArticleById = new LoadArticleById(articleRepository);
  });

  describe('execute', () => {
    it('should return an article when it exists', async () => {
      const article = new Article({
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: ['test', 'article']
      });

      await articleRepository.create(article);

      const result = await loadArticleById.execute(article.id);

      expect(result).toBeInstanceOf(Article);
      expect(result?.id).toBe(article.id);
      expect(result?.title).toBe('Test Article');
      expect(result?.content).toBe('This is test content');
      expect(result?.author).toBe('John Doe');
      expect(result?.tags).toEqual(['test', 'article']);
    });

    it('should return null when article does not exist', async () => {
      const nonExistentId = 'non-existent-id';

      const result = await loadArticleById.execute(nonExistentId);

      expect(result).toBeNull();
    });

    it('should return null when id is empty string', async () => {
      const result = await loadArticleById.execute('');

      expect(result).toBeNull();
    });

    it('should return correct article when multiple articles exist', async () => {
      const article1 = new Article({
        title: 'First Article',
        content: 'First content',
        author: 'Author 1',
        tags: ['first']
      });

      const article2 = new Article({
        title: 'Second Article',
        content: 'Second content',
        author: 'Author 2',
        tags: ['second']
      });

      await articleRepository.create(article1);
      await articleRepository.create(article2);

      const result = await loadArticleById.execute(article2.id);

      expect(result).toBeInstanceOf(Article);
      expect(result?.id).toBe(article2.id);
      expect(result?.title).toBe('Second Article');
      expect(result?.content).toBe('Second content');
      expect(result?.author).toBe('Author 2');
      expect(result?.tags).toEqual(['second']);
    });

    it('should return article with empty tags when article has no tags', async () => {
      const article = new Article({
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe'
      });

      await articleRepository.create(article);

      const result = await loadArticleById.execute(article.id);

      expect(result).toBeInstanceOf(Article);
      expect(result?.tags).toEqual([]);
    });
  });
});