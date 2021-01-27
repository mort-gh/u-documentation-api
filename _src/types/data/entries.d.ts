export interface Entries {
  repository: {
    object?: {
      entries: {
        name: string;
        type: string;
      }[];
    };
  };
}
