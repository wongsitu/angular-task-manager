import z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export const PostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  body: z.string(),
});

export const PostsSchema = z.array(PostSchema);

export const QueryParamsSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
