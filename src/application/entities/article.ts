import { Replace } from "@helpers/replace";
import { randomUUID } from "node:crypto";

export interface ArticleModel {
  title: string;
  content: string;
  author: string;
  tags?: string[];
  createdAt: Date;
}

export class Article {
  private _id: string;
  private props: ArticleModel;

  constructor(
    props: Replace<ArticleModel, { createdAt?: Date; tags?: string[] }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      tags: props.tags ?? [],
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get content(): string {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get author(): string {
    return this.props.author;
  }

  public set author(author: string) {
    this.props.author = author;
  }

  public get tags(): string[] {
    return this.props.tags ?? [];
  }

  public set tags(tags: string[]) {
    this.props.tags = tags;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
