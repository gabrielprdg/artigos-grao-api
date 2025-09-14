import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { AddArticle } from '@application/use-cases/article/add-article';
import { AddArticleBody } from '@presentation/http/dtos/add-article-body';

describe('ArticleController', () => {
  let controller: ArticleController;
  let addArticle: jest.Mocked<AddArticle>;

  beforeEach(async () => {
    const mockAddArticle = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: AddArticle,
          useValue: mockAddArticle,
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    addArticle = module.get(AddArticle);
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