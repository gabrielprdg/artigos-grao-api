import { LoadArticles } from './load-articles';
import { Article } from '@application/entities/article';
import { InMemoryArticleRepository } from '@test/in-memory-article-repository';

describe('LoadArticles', () => {
  let loadArticles: LoadArticles;
  let articleRepository: InMemoryArticleRepository;

  beforeEach(() => {
    articleRepository = new InMemoryArticleRepository();
    loadArticles = new LoadArticles(articleRepository);
  });

  describe('execute', () => {
    it('should return empty array when no articles exist', async () => {
      const result = await loadArticles.execute();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return all articles when they exist', async () => {
      const article1 = new Article({
        title: 'First Article',
        content: 'First content',
        author: 'Author 1',
        tags: ['first', 'test']
      });

      const article2 = new Article({
        title: 'Second Article',
        content: 'Second content',
        author: 'Author 2',
        tags: ['second']
      });

      const article3 = new Article({
        title: 'Third Article',
        content: 'Third content',
        author: 'Author 3'
      });

      await articleRepository.create(article1);
      await articleRepository.create(article2);
      await articleRepository.create(article3);

      const result = await loadArticles.execute();

      expect(result).toHaveLength(3);
      expect(result).toContainEqual(article1);
      expect(result).toContainEqual(article2);
      expect(result).toContainEqual(article3);
    });

    it('should return single article when only one exists', async () => {
      const article = new Article({
        title: 'Only Article',
        content: 'Only content',
        author: 'Only Author',
        tags: ['only']
      });

      await articleRepository.create(article);

      const result = await loadArticles.execute();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Article);
      expect(result[0].id).toBe(article.id);
      expect(result[0].title).toBe('Only Article');
      expect(result[0].content).toBe('Only content');
      expect(result[0].author).toBe('Only Author');
      expect(result[0].tags).toEqual(['only']);
    });

    it('should return articles with correct properties', async () => {
      const article = new Article({
        title: 'Test Article',
        content: 'Test content',
        author: 'Test Author',
        tags: ['test', 'article']
      });

      await articleRepository.create(article);

      const result = await loadArticles.execute();

      expect(result[0]).toBeInstanceOf(Article);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
      expect(result[0]).toHaveProperty('author');
      expect(result[0]).toHaveProperty('tags');
      expect(result[0]).toHaveProperty('createdAt');
    });

    it('should return articles with empty tags when articles have no tags', async () => {
      const article = new Article({
        title: 'No Tags Article',
        content: 'Content without tags',
        author: 'Author'
      });

      await articleRepository.create(article);

      const result = await loadArticles.execute();

      expect(result).toHaveLength(1);
      expect(result[0].tags).toEqual([]);
    });
  });
});