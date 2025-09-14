import { AddArticle } from "@application/use-cases/article/add-article";
import { AddArticleBody } from "@presentation/http/dtos/add-article-body";
import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('articles')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name);

  constructor(
    private readonly addArticle: AddArticle
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
}