import {
  deleteEndpoints,
  getEndpoints,
  patchEndpoints,
  postEndpoints,
  putEndpoints,
} from './endpoints';

type ParamTypes<T extends string> =
  T extends `${infer Before}:${infer Param}/${infer After}`
    ? { [Key in Param | keyof ParamTypes<After>]: string | number }
    : T extends `${infer Before}:${infer Param}`
    ? { [Key in Param]: string | number }
    : object;

type RouteParams<T extends string> =
  T extends `${infer Before}:${infer Param}/${infer After}`
    ? ParamTypes<T>
    : T extends `${infer Before}:${infer Param}`
    ? ParamTypes<T>
    : object;

type HasPathParams<T extends string> =
  T extends `${infer Before}:${infer Param}/${infer After}`
    ? true
    : T extends `${infer Before}:${infer Param}`
    ? true
    : false;

type GetParamsType<
  T extends keyof typeof getEndpoints,
  K extends (typeof getEndpoints)[T]
> = {
  endpoint: T;
  pathParams: RouteParams<T>;
  queryParams: ReturnType<K['ZodResponseParser']['parse']>;
};

type PostParamsType<
  T extends keyof typeof postEndpoints,
  K extends (typeof postEndpoints)[T]
> = {
  endpoint: T;
  pathParams: RouteParams<T>;
  body: ReturnType<K['ZodPayloadParser']['parse']>;
};

type PatchParamsType<
  T extends keyof typeof patchEndpoints,
  K extends (typeof patchEndpoints)[T]
> = {
  endpoint: T;
  pathParams: RouteParams<T>;
  body: ReturnType<K['ZodPayloadParser']['parse']>;
};

type PutParamsType<
  T extends keyof typeof putEndpoints,
  K extends (typeof putEndpoints)[T]
> = {
  endpoint: T;
  pathParams: RouteParams<T>;
  body: ReturnType<K['ZodPayloadParser']['parse']>;
};

type DeleteParamsType<T extends keyof typeof deleteEndpoints> = {
  endpoint: T;
  pathParams: RouteParams<T>;
};

export type GetArgs<
  T extends keyof typeof getEndpoints,
  K extends (typeof getEndpoints)[T]
> = HasPathParams<T> extends true
  ? K['ZodQueryParamsParser'] extends undefined
    ? Omit<GetParamsType<T, K>, 'queryParams'>
    : GetParamsType<T, K>
  : K['ZodQueryParamsParser'] extends undefined
  ? Omit<GetParamsType<T, K>, 'queryParams' | 'pathParams'>
  : Omit<GetParamsType<T, K>, 'pathParams'>;

export type PostArgs<
  T extends keyof typeof postEndpoints,
  K extends (typeof postEndpoints)[T]
> = HasPathParams<T> extends true
  ? PostParamsType<T, K>
  : Omit<PostParamsType<T, K>, 'pathParams'>;

export type PatchArgs<
  T extends keyof typeof patchEndpoints,
  K extends (typeof patchEndpoints)[T]
> = PatchParamsType<T, K>;

export type PutArgs<
  T extends keyof typeof putEndpoints,
  K extends (typeof putEndpoints)[T]
> = PutParamsType<T, K>;

export type DeleteArgs<T extends keyof typeof deleteEndpoints> =
  DeleteParamsType<T>;
