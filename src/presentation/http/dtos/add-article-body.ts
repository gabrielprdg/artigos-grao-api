import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddArticleBody {
  @ApiProperty({
    description: 'The title of the article',
    example: 'Introduction to TypeScript',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'TypeScript is a programming language developed by Microsoft...',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The author of the article',
    example: 'John Doe',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    description: 'URL link associated with the article',
    example: 'https://example.com/article',
    required: false
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({
    description: 'Tags associated with the article',
    example: ['typescript', 'programming', 'tutorial'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}