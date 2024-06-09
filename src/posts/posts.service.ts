import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  create(createPostInput: CreatePostInput): Post {
    const newPost = { id: this.idCounter++, ...createPostInput };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    return this.posts.find((post) => post.id === id);
  }

  update(id: number, updatePostInput: UpdatePostInput): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostInput };
    return this.posts[postIndex];
  }

  remove(id: number): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;
    const removedPost = this.posts.splice(postIndex, 1);
    return removedPost[0];
  }
}
