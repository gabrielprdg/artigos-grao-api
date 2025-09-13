import { AddArticle } from './add-article';
import { Article } from '@application/entities/article';
import { InMemoryArticleRepository } from '@test/in-memory-article-repository';

describe('AddArticle', () => {
  let addArticle: AddArticle;
  let articleRepository: InMemoryArticleRepository;

  beforeEach(() => {
    articleRepository = new InMemoryArticleRepository();
    addArticle = new AddArticle(articleRepository);
  });

  describe('execute', () => {
    it('should create an article with provided data and return its id', async () => {
      const articleData = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: ['test', 'article']
      };

      const result = await addArticle.execute(articleData);

      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(articleRepository.articles).toHaveLength(1);

      const createdArticle = articleRepository.articles[0];
      expect(createdArticle).toBeInstanceOf(Article);
      expect(createdArticle.title).toBe(articleData.title);
      expect(createdArticle.content).toBe(articleData.content);
      expect(createdArticle.author).toBe(articleData.author);
      expect(createdArticle.tags).toEqual(articleData.tags);
      expect(result.id).toBe(createdArticle.id);
    });

    it('should create an article without tags when tags are not provided', async () => {
      const articleData = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe'
      };

      const result = await addArticle.execute(articleData);

      expect(result.id).toBeDefined();
      expect(articleRepository.articles).toHaveLength(1);

      const createdArticle = articleRepository.articles[0];
      expect(createdArticle.tags).toEqual([]);
    });

    it('should create an article with empty tags when tags array is empty', async () => {
      const articleData = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: []
      };

      const result = await addArticle.execute(articleData);

      expect(result.id).toBeDefined();
      expect(articleRepository.articles).toHaveLength(1);

      const createdArticle = articleRepository.articles[0];
      expect(createdArticle.tags).toEqual([]);
    });

    it('should store article in repository', async () => {
      const articleData = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: ['test']
      };

      await addArticle.execute(articleData);

      expect(articleRepository.articles).toHaveLength(1);
      expect(articleRepository.articles[0]).toBeInstanceOf(Article);
    });

    it('should return the same id as the created article', async () => {
      const articleData = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe'
      };

      const result = await addArticle.execute(articleData);

      expect(articleRepository.articles).toHaveLength(1);
      const createdArticle = articleRepository.articles[0];
      expect(result.id).toBe(createdArticle.id);
    });
  });
});