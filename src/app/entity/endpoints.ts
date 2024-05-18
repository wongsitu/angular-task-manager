import {
  PostSchema,
  PostsSchema,
  QueryParamsSchema,
  UserSchema,
  UsersSchema,
} from './schemas';

export const getEndpoints = {
  '/users': {
    ZodQueryParamsParser: QueryParamsSchema,
    ZodResponseParser: UsersSchema,
  },
  '/posts': {
    ZodQueryParamsParser: QueryParamsSchema,
    ZodResponseParser: PostsSchema,
  },
  '/users/:id': {
    ZodQueryParamsParser: undefined,
    ZodResponseParser: UserSchema,
  },
  '/posts/:postId': {
    ZodQueryParamsParser: undefined,
    ZodResponseParser: PostSchema,
  },
} as const;

export const postEndpoints = {
  '/user': {
    ZodPayloadParser: UserSchema,
    ZodResponseParser: UserSchema,
  },
  '/posts': {
    ZodPayloadParser: QueryParamsSchema,
    ZodResponseParser: PostsSchema,
  },
} as const;

export const patchEndpoints = {
  '/user/:id': {
    ZodPayloadParser: UserSchema,
    ZodResponseParser: UserSchema,
  },
  '/posts/:id': {
    ZodPayloadParser: PostsSchema,
    ZodResponseParser: PostsSchema,
  },
} as const;

export const putEndpoints = {
  '/user/:id': {
    ZodPayloadParser: UserSchema,
    ZodResponseParser: UserSchema,
  },
  '/posts/:id': {
    ZodPayloadParser: PostsSchema,
    ZodResponseParser: PostsSchema,
  },
} as const;
