export interface Entry {
  text: string;
  commitResourcePath?: string;
  abbreviatedOid?: string;
  isTruncated?: boolean;
  commitUrl?: string;
  isBinary?: boolean;
  byteSize?: number;
  oid?: string;
  id?: string;
}
