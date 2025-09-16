import { AddArticle } from "@application/use-cases/article/add-article";
import { LoadArticles } from "@application/use-cases/article/load-articles";
import { LoadArticleById } from "@application/use-cases/article/load-article-by-id";
import { UpdateArticleById } from "@application/use-cases/article/update-article-by-id";
import { AddArticleBody } from "@presentation/http/dtos/add-article-body";
import { UpdateArticleBody } from "@presentation/http/dtos/update-article-body";
import { ArticleViewModel } from "@presentation/http/view-model/article-view-model";
import { Body, Controller, Get, HttpCode, Logger, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('articles')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name);

  constructor(
    private readonly addArticle: AddArticle,
    private readonly loadArticles: LoadArticles,
    private readonly loadArticleById: LoadArticleById,
    private readonly updateArticleById: UpdateArticleById
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 201, description: 'Article created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid article data' })
  async create(@Body() body: AddArticleBody) {
    this.logger.log('[POST] /article');
    const { title, content, author, url, tags } = body;

    const { id } = await this.addArticle.execute({
      title,
      content,
      author,
      url,
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

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get article by id' })
  @ApiResponse({ status: 200, description: 'Article retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async loadById(@Param('id') id: string) {
    this.logger.log(`[GET] /article/${id}`);

    const article = await this.loadArticleById.execute(id);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return ArticleViewModel.toHTTP(article);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update article by id' })
  @ApiResponse({ status: 200, description: 'Article updated successfully' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 400, description: 'Invalid article data' })
  async updateById(@Param('id') id: string, @Body() body: UpdateArticleBody) {
    this.logger.log(`[PUT] /article/${id}`);

    const updatedArticle = await this.updateArticleById.execute({
      id,
      ...body
    });

    if (!updatedArticle) {
      throw new NotFoundException('Article not found');
    }

    return ArticleViewModel.toHTTP(updatedArticle);
  }
}