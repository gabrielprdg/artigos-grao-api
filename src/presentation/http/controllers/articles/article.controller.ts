import { AddArticle } from "@application/use-cases/article/add-article";
import { LoadArticles } from "@application/use-cases/article/load-articles";
import { AddArticleBody } from "@presentation/http/dtos/add-article-body";
import { ArticleViewModel } from "@presentation/http/view-model/article-view-model";
import { Body, Controller, Get, HttpCode, Logger, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('articles')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name);

  constructor(
    private readonly addArticle: AddArticle,
    private readonly loadArticles: LoadArticles
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 201, description: 'Article created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid article data' })
  async create(@Body() body: AddArticleBody) {
    this.logger.log('[POST] /article');
    const { title, content, author, tags } = body;

    const { id } = await this.addArticle.execute({
      title,
      content,
      author,
      tags
    });

    return { id };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Articles retrieved successfully' })
  async loadAll() {
    this.logger.log('[GET] /articles');

    const articles = await this.loadArticles.execute();

    return articles.map(ArticleViewModel.toHTTP);
  }
}