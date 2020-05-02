import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

const PRERENDER_ASSETS_URL = 'http://127.0.0.1:8085';
const CONTENT_DIRECTORY = './assets/content/';
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
      CONTENT_TRANSFER_STATE_KEY_PREFIX + contentFilePath
    );
    if (isPlatformServer(this.platformId)) {
      // when prerendering:
      // get content from served assets and save it in the transferstate
      // assets should be servered at PRERENDER_ASSETS_HOSTNAME in order for this to work
      const content = await this.httpClient
        .get(`${PRERENDER_ASSETS_URL}/content/${contentFilePath}`, {
          responseType: 'text',
        })
        .toPromise();
      this.transferState.set(key, content);
      return content;
    } else {
      // in browser:
      // try to get content from transferstate, otherwise get it from assets
      if (this.transferState.hasKey(key)) {
        const course = this.transferState.get<string>(key, null);
        return course;
      } else {
        return this.httpClient
          .get(`${CONTENT_DIRECTORY}${contentFilePath}`, {
            responseType: 'text',
          })
          .toPromise();
      }
    }
  }
}
