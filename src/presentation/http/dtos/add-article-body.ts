import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class AddArticleBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}