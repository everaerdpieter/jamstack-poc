import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

const CONTENT_PRERENDER_URL = 'http://127.0.0.1:8085/content/';
const CONTENT_BROWSER_URL = './assets/content/';
const CONTENT_TRANSFER_STATE_KEY_PREFIX = 'content-';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID)
    private platformId,
    private transferState: TransferState
  ) {}
  async getContent(contentFilePath: string): Promise<string> {
    const key = makeStateKey<string>(
      `${CONTENT_TRANSFER_STATE_KEY_PREFIX}${contentFilePath}`
    );
    if (this.transferState.hasKey(key)) {
      return this.transferState.get<string>(key, null);
    } else {
      // when prerendering assets should be servered at CONTENT_PRERENDER_URL in order for this to work
      const contentUrl = isPlatformServer(this.platformId)
        ? CONTENT_PRERENDER_URL
        : CONTENT_BROWSER_URL;
      const content = await this.httpClient
        .get(`${contentUrl}${contentFilePath}`, {
          responseType: 'text',
        })
        .toPromise();
      this.transferState.set(key, content);
      return content;
    }
  }
}
