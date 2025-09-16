import { AddArticle } from '@application/use-cases/article/add-article';
import { LoadArticles } from '@application/use-cases/article/load-articles';
import { LoadArticleById } from '@application/use-cases/article/load-article-by-id';
import { UpdateArticleById } from '@application/use-cases/article/update-article-by-id';
import { Test, TestingModule } from '@nestjs/testing';
import { AddArticleBody } from '@presentation/http/dtos/add-article-body';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
  let controller: ArticleController;
  let addArticle: jest.Mocked<AddArticle>;
  let loadArticles: jest.Mocked<LoadArticles>;
  let loadArticleById: jest.Mocked<LoadArticleById>;
  let updateArticleById: jest.Mocked<UpdateArticleById>;

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
      const articleBody: AddArticleBody = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: ['test', 'article'],
      };

      const expectedResult = { id: 'generated-id-123' };
      addArticle.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(articleBody);

      expect(addArticle.execute).toHaveBeenCalledWith({
        title: articleBody.title,
        content: articleBody.content,
        author: articleBody.author,
        tags: articleBody.tags,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should create an article without tags', async () => {
      const articleBody: AddArticleBody = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
      };

      const expectedResult = { id: 'generated-id-456' };
      addArticle.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(articleBody);

      expect(addArticle.execute).toHaveBeenCalledWith({
        title: articleBody.title,
        content: articleBody.content,
        author: articleBody.author,
        tags: undefined,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should create an article with empty tags array', async () => {
      const articleBody: AddArticleBody = {
        title: 'Test Article',
        content: 'This is test content',
        author: 'John Doe',
        tags: [],
      };

      const expectedResult = { id: 'generated-id-789' };
      addArticle.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(articleBody);

      expect(addArticle.execute).toHaveBeenCalledWith({
        title: articleBody.title,
        content: articleBody.content,
        author: articleBody.author,
        tags: [],
      });
      expect(result).toEqual(expectedResult);
    });
  });

  
});