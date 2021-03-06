type Format =
  | 'date-time'
  | 'time'
  | 'date'
  | 'email'
  | 'idn-email'
  | 'hostname'
  | 'idn-hostname'
  | 'ipv4'
  | 'uri'
  | 'uri-reference'
  | 'iri'
  | 'iri-reference'
  | 'uri-template'
  | 'json-pointer'
  | 'relative-json-pointer'
  | 'regex';

interface StringProps {
  title?: string;
  description?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: Format;
  enum?: string[];
  example?: string;
  default?: string;
}

export const string = (args?: StringProps) => {
  return {
    type: 'string',
    ...args,
  };
};
