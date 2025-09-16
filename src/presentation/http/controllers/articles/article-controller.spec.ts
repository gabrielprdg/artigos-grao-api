import { AddArticle } from '@application/use-cases/article/add-article';
import { LoadArticles } from '@application/use-cases/article/load-articles';
import { LoadArticleById } from '@application/use-cases/article/load-article-by-id';
import { UpdateArticleById } from '@application/use-cases/article/update-article-by-id';
import { Article } from '@application/entities/article';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddArticleBody } from '@presentation/http/dtos/add-article-body';
import { UpdateArticleBody } from '@presentation/http/dtos/update-article-body';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
  let controller: ArticleController;
  let addArticle: jest.Mocked<AddArticle>;
  let loadArticles: jest.Mocked<LoadArticles>;
  let loadArticleById: jest.Mocked<LoadArticleById>;
  let updateArticleById: jest.Mocked<UpdateArticleById>;

  const createMockArticle = (overrides: Partial<{
    id: string;
    title: string;
    content: string;
    author: string;
    url: string;
    tags: string[];
  }> = {}) => {
    return new Article({
      title: overrides.title || 'Test Article',
      content: overrides.content || 'Test content',
      author: overrides.author || 'Test Author',
      url: overrides.url,
      tags: overrides.tags || ['test']
    }, overrides.id);
  };

  const createAddArticleBody = (overrides: Partial<AddArticleBody> = {}): AddArticleBody => ({
    title: 'Test Article',
    content: 'Test content',
    author: 'Test Author',
    url: 'https://example.com/test-article',
    tags: ['test'],
    ...overrides
  });

  const createUpdateArticleBody = (overrides: Partial<UpdateArticleBody> = {}): UpdateArticleBody => ({
    ...overrides
  });

  beforeEach(async () => {
    const mockAddArticle = {
      execute: jest.fn(),
    };

    const mockLoadArticles = {
      execute: jest.fn(),
    };

    const mockLoadArticleById = {
      execute: jest.fn(),
    };

    const mockUpdateArticleById = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: AddArticle,
          useValue: mockAddArticle,
        },
        {
          provide: LoadArticles,
          useValue: mockLoadArticles,
        },
        {
          provide: LoadArticleById,
          useValue: mockLoadArticleById,
        },
        {
          provide: UpdateArticleById,
          useValue: mockUpdateArticleById,
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    addArticle = module.get(AddArticle);
    loadArticles = module.get(LoadArticles);
    loadArticleById = module.get(LoadArticleById);
    updateArticleById = module.get(UpdateArticleById);
  });

  describe('create', () => {
    it('should create an article and return its id', async () => {
      const articleBody = createAddArticleBody({
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: ['test', 'article']
      });
      const expectedResult = { id: 'generated-id-123' };

      addArticle.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(articleBody);

      expect(addArticle.execute).toHaveBeenCalledWith(articleBody);
      expect(result).toEqual(expectedResult);
    });

    it('should create an article without tags', async () => {
      const articleBody = createAddArticleBody({
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: undefined
      });
      const expectedResult = { id: 'generated-id-456' };

      addArticle.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(articleBody);

      expect(addArticle.execute).toHaveBeenCalledWith(articleBody);
      expect(result).toEqual(expectedResult);
    });

    it('should create an article with empty tags array', async () => {
      const articleBody = createAddArticleBody({
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: []
      });
      const expectedResult = { id: 'generated-id-789' };

      addArticle.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(articleBody);

      expect(addArticle.execute).toHaveBeenCalledWith(articleBody);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('loadAll', () => {
    it('should return all articles', async () => {
      const mockArticles = [
        createMockArticle({ title: 'Article 1', content: 'Content 1', author: 'Author 1', tags: ['tag1'] }),
        createMockArticle({ title: 'Article 2', content: 'Content 2', author: 'Author 2', tags: ['tag2'] })
      ];

      loadArticles.execute.mockResolvedValue(mockArticles);

      const result = await controller.loadAll();

      expect(loadArticles.execute).toHaveBeenCalledWith();
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title', 'Article 1');
      expect(result[1]).toHaveProperty('title', 'Article 2');
    });

    it('should return empty array when no articles exist', async () => {
      loadArticles.execute.mockResolvedValue([]);

      const result = await controller.loadAll();

      expect(loadArticles.execute).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('loadById', () => {
    const testId = 'test-id';

    it('should return article when it exists', async () => {
      const mockArticle = createMockArticle({ id: testId });

      loadArticleById.execute.mockResolvedValue(mockArticle);

      const result = await controller.loadById(testId);

      expect(loadArticleById.execute).toHaveBeenCalledWith(testId);
      expect(result).toHaveProperty('id', testId);
      expect(result).toHaveProperty('title', 'Test Article');
      expect(result).toHaveProperty('content', 'Test content');
      expect(result).toHaveProperty('author', 'Test Author');
      expect(result).toHaveProperty('tags', ['test']);
    });

    it('should throw NotFoundException when article does not exist', async () => {
      const nonExistentId = 'non-existent-id';
      loadArticleById.execute.mockResolvedValue(null);

      await expect(controller.loadById(nonExistentId)).rejects.toThrow(NotFoundException);
      expect(loadArticleById.execute).toHaveBeenCalledWith(nonExistentId);
    });

    it('should throw NotFoundException with correct message', async () => {
      loadArticleById.execute.mockResolvedValue(null);

      await expect(controller.loadById(testId)).rejects.toThrow('Article not found');
      expect(loadArticleById.execute).toHaveBeenCalledWith(testId);
    });
  });

  describe('updateById', () => {
    const testId = 'test-id';

    it('should update article and return updated data', async () => {
      const updateBody = createUpdateArticleBody({
        title: 'Updated Title',
        content: 'Updated content',
        author: 'Updated Author',
        tags: ['updated', 'tags']
      });

      const mockUpdatedArticle = createMockArticle({
        id: testId,
        title: 'Updated Title',
        content: 'Updated content',
        author: 'Updated Author',
        tags: ['updated', 'tags']
      });

      updateArticleById.execute.mockResolvedValue(mockUpdatedArticle);

      const result = await controller.updateById(testId, updateBody);

      expect(updateArticleById.execute).toHaveBeenCalledWith({
        id: testId,
        ...updateBody
      });
      expect(result).toHaveProperty('id', testId);
      expect(result).toHaveProperty('title', 'Updated Title');
      expect(result).toHaveProperty('content', 'Updated content');
      expect(result).toHaveProperty('author', 'Updated Author');
      expect(result).toHaveProperty('tags', ['updated', 'tags']);
    });

    it('should update article with partial data', async () => {
      const updateBody = createUpdateArticleBody({ title: 'Updated Title Only' });

      const mockUpdatedArticle = createMockArticle({
        id: testId,
        title: 'Updated Title Only',
        content: 'Original content',
        author: 'Original Author',
        tags: ['original']
      });

      updateArticleById.execute.mockResolvedValue(mockUpdatedArticle);

      const result = await controller.updateById(testId, updateBody);

      expect(updateArticleById.execute).toHaveBeenCalledWith({
        id: testId,
        title: 'Updated Title Only'
      });
      expect(result).toHaveProperty('title', 'Updated Title Only');
    });

    it('should update article with empty body', async () => {
      const updateBody = createUpdateArticleBody();

      const mockUpdatedArticle = createMockArticle({
        id: testId,
        title: 'Original Title',
        content: 'Original content',
        author: 'Original Author',
        tags: ['original']
      });

      updateArticleById.execute.mockResolvedValue(mockUpdatedArticle);

      const result = await controller.updateById(testId, updateBody);

      expect(updateArticleById.execute).toHaveBeenCalledWith({
        id: testId
      });
      expect(result).toHaveProperty('title', 'Original Title');
    });
  });
});