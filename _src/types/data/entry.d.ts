export interface Entry {
  repository: {
    object?: {
      text: string;
      abbreviatedOid?: string;
      byteSize?: number;
      commitResourcePath?: string;
      commitUrl?: string;
      id?: string;
      isBinary?: boolean;
      isTruncated?: boolean;
      oid?: string;
    };
  };
}
