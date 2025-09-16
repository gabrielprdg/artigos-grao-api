import { UpdateArticleById } from './update-article-by-id';
import { Article } from '@application/entities/article';
import { ArticleNotFound } from '@application/use-cases/errors/article-not-found';
import { InMemoryArticleRepository } from '@test/in-memory-article-repository';

describe('UpdateArticleById', () => {
  let updateArticleById: UpdateArticleById;
  let articleRepository: InMemoryArticleRepository;

  beforeEach(() => {
    articleRepository = new InMemoryArticleRepository();
    updateArticleById = new UpdateArticleById(articleRepository);
  });

  describe('execute', () => {
    it('should update an existing article with new data', async () => {
      const originalArticle = new Article({
        title: 'Original Title',
        content: 'Original content',
        author: 'Original Author',
        tags: ['original']
      });

      await articleRepository.create(originalArticle);

      const updateData = {
        id: originalArticle.id,
        title: 'Updated Title',
        content: 'Updated content',
        author: 'Updated Author',
        tags: ['updated', 'test']
      };

      const result = await updateArticleById.execute(updateData);

      expect(result).toBeInstanceOf(Article);
      expect(result.id).toBe(originalArticle.id);
      expect(result.title).toBe('Updated Title');
      expect(result.content).toBe('Updated content');
      expect(result.author).toBe('Updated Author');
      expect(result.tags).toEqual(['updated', 'test']);
      expect(result.createdAt).toBe(originalArticle.createdAt);
    });

    it('should update only provided fields and keep others unchanged', async () => {
      const originalArticle = new Article({
        title: 'Original Title',
        content: 'Original content',
        author: 'Original Author',
        tags: ['original']
      });

      await articleRepository.create(originalArticle);

      const updateData = {
        id: originalArticle.id,
        title: 'Updated Title'
      };

      const result = await updateArticleById.execute(updateData);

      expect(result.id).toBe(originalArticle.id);
      expect(result.title).toBe('Updated Title');
      expect(result.content).toBe('Original content');
      expect(result.author).toBe('Original Author');
      expect(result.tags).toEqual(['original']);
      expect(result.createdAt).toBe(originalArticle.createdAt);
    });

    it('should update tags to empty array when empty tags array is provided', async () => {
      const originalArticle = new Article({
        title: 'Original Title',
        content: 'Original content',
        author: 'Original Author',
        tags: ['original', 'multiple', 'tags']
      });

      await articleRepository.create(originalArticle);

      const updateData = {
        id: originalArticle.id,
        tags: []
      };

      const result = await updateArticleById.execute(updateData);

      expect(result.tags).toEqual([]);
    });

    it('should throw ArticleNotFound when article does not exist', async () => {
      const updateData = {
        id: 'non-existent-id',
        title: 'Updated Title'
      };

      await expect(updateArticleById.execute(updateData)).rejects.toThrow(ArticleNotFound);
    });

    it('should throw ArticleNotFound when id is empty string', async () => {
      const updateData = {
        id: '',
        title: 'Updated Title'
      };

      await expect(updateArticleById.execute(updateData)).rejects.toThrow(ArticleNotFound);
    });

    it('should persist the updated article in repository', async () => {
      const originalArticle = new Article({
        title: 'Original Title',
        content: 'Original content',
        author: 'Original Author'
      });

      await articleRepository.create(originalArticle);

      const updateData = {
        id: originalArticle.id,
        title: 'Updated Title'
      };

      await updateArticleById.execute(updateData);

      const repositoryArticle = await articleRepository.findById(originalArticle.id);
      expect(repositoryArticle?.title).toBe('Updated Title');
    });
  });
});