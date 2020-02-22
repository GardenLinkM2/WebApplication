import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = 'eyJraWQiOiJnYXJkZW5saW5rIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiJyaWNreWJsYWNrd2FsbEBnbWFpbC5jb20iL' +
      'CJraWQiOiJnYXJkZW5saW5rIiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NDQzOTYyNywidXVpZCI6IjkwYTVmY2NjLTVkZTktNGQyZS1iMjYwLTNjYjkwY2I' +
      '4M2E5YSIsImVtaXR0ZXIiOiJnYXJkZW5saW5rIiwianRpIjoiN2ZiNzc2MTAtOTg3OS00NDNkLTk1MWYtNTkxYjFiNjM4MTBjIn0._D-CS0Bi4ZTSn3K56ogZy' +
      'EIS4wdf4xH1usI27BhnPDpGUkc_5vs_FDndk_h2mlbJ4594hkISpmbc1PEZnoYcbQ';
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    }).clone({headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200/')});
    return next.handle(modifiedReq);
  }
}
