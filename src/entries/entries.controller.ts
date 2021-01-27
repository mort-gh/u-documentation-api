import { Controller, Param, Get } from '@nestjs/common';

import { EntriesService } from './entries.service';

@Controller('/entries/:owner/:repo/:branch/:path')
export class EntriesController {
  constructor(private readonly entries: EntriesService) {}

  @Get()
  getAll(
    @Param('repo') repo: string,
    @Param('path') path: string,
    @Param('owner') owner: string,
    @Param('branch') branch: string
  ) {
    return this.entries.getEntries(owner, repo, branch, path);
  }

  @Get(':fileName')
  getOne(
    @Param('repo') repo: string,
    @Param('path') path: string,
    @Param('owner') owner: string,
    @Param('branch') branch: string,
    @Param('fileName') fileName: string
  ) {
    return this.entries.getEntry(owner, repo, branch, path, fileName);
  }
}
