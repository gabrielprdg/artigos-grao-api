import { Article } from './article';

describe('Article', () => {
  describe('constructor', () => {
    it('should create an article with provided props', () => {
      const props = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: ['test', 'article'],
      };

      const article = new Article(props);

      expect(article.title).toBe(props.title);
      expect(article.content).toBe(props.content);
      expect(article.author).toBe(props.author);
      expect(article.tags).toEqual(props.tags);
      expect(article.id).toBeDefined();
      expect(article.createdAt).toBeInstanceOf(Date);
    });

    it('should create an article with custom id', () => {
      const customId = 'custom-id-123';
      const props = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
      };

      const article = new Article(props, customId);

      expect(article.id).toBe(customId);
    });

    it('should create an article with default empty tags when not provided', () => {
      const props = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
      };

      const article = new Article(props);

      expect(article.tags).toEqual([]);
    });

    it('should create an article with current date when createdAt not provided', () => {
      const beforeCreation = new Date();
      const props = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
      };

      const article = new Article(props);
      const afterCreation = new Date();

      expect(article.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
      expect(article.createdAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });

    it('should create an article with provided createdAt date', () => {
      const customDate = new Date('2023-01-01');
      const props = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        createdAt: customDate,
      };

      const article = new Article(props);

      expect(article.createdAt).toBe(customDate);
    });
  });

});