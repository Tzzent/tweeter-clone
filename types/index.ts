import {
  Comment,
  Trend,
  Tweet,
  User,
} from "@prisma/client";

export type TweetItemType = Tweet & {
  owner: User,
  _count: {
    comments: number,
  }
};

export type TrendItemType = Trend & {
  _count: {
    tweets: number,
  }
}

export type CommentItemType = Comment & {
  author: User,
}