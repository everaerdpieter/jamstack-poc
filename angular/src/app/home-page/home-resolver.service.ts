import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<string> {
  constructor(private httpClient: HttpClient) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.httpClient.get('./assets/content/home-page.md', {
      responseType: 'text',
    });
  }
}
