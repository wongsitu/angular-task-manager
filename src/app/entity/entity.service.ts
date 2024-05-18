import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getEndpoints, patchEndpoints, postEndpoints } from './endpoints';
import { GetArgs, PatchArgs, PostArgs } from './types';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private http: HttpClient) {}

  private _parseEndpoint(endpoint: string, pathParams: any) {
    let endpointValue: string = endpoint;

    if (pathParams) {
      for (const key in pathParams) {
        endpointValue = endpoint.replace(
          `:${key}`,
          `${(pathParams as any)[key]}`
        );
      }
    }

    return endpointValue;
  }

  get<T extends keyof typeof getEndpoints>({
    endpoint,
    ...rest
  }: GetArgs<T, (typeof getEndpoints)[T]>) {
    const { ZodResponseParser, ZodQueryParamsParser } = getEndpoints[endpoint];
    const endpointValue: string =
      'pathParams' in rest && rest.pathParams
        ? this._parseEndpoint(endpoint, rest.pathParams)
        : endpoint;

    return this.http
      .get(endpointValue, {
        params: ZodQueryParamsParser
          ? ZodQueryParamsParser.parse(rest)
          : undefined,
      })
      .pipe(map((response) => ZodResponseParser.parse(response))) as Observable<
      ReturnType<(typeof getEndpoints)[T]['ZodResponseParser']['parse']>
    >;
  }

  post<T extends keyof typeof postEndpoints>({
    endpoint,
    body,
    ...rest
  }: PostArgs<T, (typeof postEndpoints)[T]>) {
    const { ZodResponseParser, ZodPayloadParser } = postEndpoints[endpoint];
    const endpointValue: string =
      'pathParams' in rest && rest.pathParams
        ? this._parseEndpoint(endpoint, rest.pathParams)
        : endpoint;

    return this.http
      .post(
        endpointValue,
        ZodPayloadParser ? ZodPayloadParser.parse(rest) : undefined
      )
      .pipe(map((response) => ZodResponseParser.parse(response))) as Observable<
      ReturnType<(typeof postEndpoints)[T]['ZodResponseParser']['parse']>
    >;
  }

  patch<T extends keyof typeof patchEndpoints>({
    endpoint,
    body,
    ...rest
  }: PatchArgs<T, (typeof patchEndpoints)[T]>) {
    const { ZodResponseParser, ZodPayloadParser } = patchEndpoints[endpoint];
    const endpointValue: string =
      'pathParams' in rest && rest.pathParams
        ? this._parseEndpoint(endpoint, rest.pathParams)
        : endpoint;

    return this.http
      .patch(
        endpointValue,
        ZodPayloadParser ? ZodPayloadParser.parse(rest) : undefined
      )
      .pipe(map((response) => ZodResponseParser.parse(response))) as Observable<
      ReturnType<(typeof patchEndpoints)[T]['ZodResponseParser']['parse']>
    >;
  }
}
