import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ContentService } from '../content.service';

export const CONTENT_TRANSFER_STATE_KEY_PREFIX = 'content-';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<string> {
  constructor(private contentService: ContentService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.contentService.getContent('home-page.md');
  }
}
