import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private synToken = 'eyJhbGciOiJIUzUxMiIsImtpZCI6ImJhY2sifQ.eyJ1dWlkIjoiOTBhNWZjY2MtNWRlOS00ZDJlLWIyNjAtM2NiOTBjYjgzYTlhIiwic3Vi' +
    'Ijoicmlja3libGFja3dhbGxAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiZXhwIjoxNTgzMzQzMjM2LjkxOTUyMzd9.RQmXucKmzCtxt8wTITSzg8K4kG_zuyi' +
    'VOgzrcEKdJMiQ9HmqaTpD70MoyN-dZYJmunieMFNyzvRcgR-1YzT7iA';
  private accessToken = 'eyJraWQiOiJhY2NvdW50IiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiJyaWNreWJsYWNrd2' +
    'FsbEBnbWFpbC5jb20iLCJraWQiOiJhY2NvdW50IiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NTEyMzI2MiwidXVpZCI6IjkwYTVmY2NjLTVkZTktNGQyZS' +
    '1iMjYwLTNjYjkwY2I4M2E5YSIsImVtaXR0ZXIiOiJhY2NvdW50IiwianRpIjoiZmNmMDBjOTktOTMyOC00MmU3LTg4NWUtODQ4NjRhZGUwN2Q4In0.UegapPz' +
    '_NQyWl0cvwITXCMB5tAbavm2Dxu-_6zS07VcybDPuy36aJDDhJ-4vNMKHwgYhFf7vwYf_4zO5h29Vwg';
  private modifiedReq: HttpRequest<any>;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // NOTE: Replace the previous constant with your bearer for now.
    // TODO: get session token from api/syn
    if (req.url.includes('backend')) {
      this.modifiedReq = req.clone({
        headers: new HttpHeaders({Authorization: `${this.synToken}`, 'Access-Control-Allow-Origin': '*'}),
      });
    } else {
      this.modifiedReq = req.clone({
        headers: new HttpHeaders({Authorization: `${this.accessToken}`, 'Access-Control-Allow-Origin': '*'}),
      });
    }
    return next.handle(this.modifiedReq);
  }
}
