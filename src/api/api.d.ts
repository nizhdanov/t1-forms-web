type RequestOptions = import('ofetch').FetchOptions<'json', any>;

type RequestParams<Params = undefined> = Params extends undefined
  ? { options?: RequestOptions }
  : { options?: RequestOptions } & Params;

type ResponseError = import('ofetch').FetchError<{
  error: string;
  message: string | string[];
  statusCode: number;
}>;
