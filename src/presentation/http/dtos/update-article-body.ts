import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateArticleBody {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}