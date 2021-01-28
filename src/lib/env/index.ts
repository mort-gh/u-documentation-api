// eslint-disable-next-line unicorn/import-style
import { resolve } from 'path';

import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../../.env') });
