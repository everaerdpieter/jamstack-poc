import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { CONTENT_TRANSFER_STATE_KEY_PREFIX } from './home-page/home-resolver.service';
@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID)
    private platformId,
    private transferState: TransferState
  ) {}
  async getContent(contentPath: string): Promise<string> {
    const key = makeStateKey<string>(
      CONTENT_TRANSFER_STATE_KEY_PREFIX + contentPath
    );
    if (isPlatformServer(this.platformId)) {
      // when prerendering:
      // get content from served assets and save it in the transferstate
      // assets should be servered at http://127.0.0.1:8085/ in order for this to work
      const content = await this.httpClient
        .get(`http://127.0.0.1:8085/content/${contentPath}`, {
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
          .get(`./assets/content/${contentPath}`, {
            responseType: 'text',
          })
          .toPromise();
      }
    }
  }
}
