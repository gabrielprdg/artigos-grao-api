import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleBody {
  @ApiProperty({
    description: 'The title of the article',
    example: 'Updated Introduction to TypeScript',
    required: false
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'TypeScript is a powerful programming language...',
    required: false
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'The author of the article',
    example: 'Jane Doe',
    required: false
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({
    description: 'URL link associated with the article',
    example: 'https://example.com/updated-article',
    required: false
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({
    description: 'Tags associated with the article',
    example: ['typescript', 'programming', 'advanced'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}