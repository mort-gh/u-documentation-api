export interface GraphqlResponse<T> {
  repository: {
    object?: T;
  };
}
