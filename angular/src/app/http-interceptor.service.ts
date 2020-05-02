import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { isPlatformServer } from '@angular/common';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // when prerendering the assets should be servered at http://127.0.0.1:8080/ in order for this to work
    if (isPlatformServer(this.platformId) && req.url.includes('./assets')) {
      return next.handle(
        req.clone({
          url: `http://127.0.0.1:8080/${req.url.replace('./assets', '')}`,
        })
      );
    }

    return next.handle(req);
  }
}
