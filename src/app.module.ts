import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ArticleController } from '@presentation/http/controllers/articles/article.controller';
import { HttpModule } from '@presentation/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
