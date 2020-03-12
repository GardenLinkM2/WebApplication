import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private synToken = localStorage.getItem('synToken');
  private userToken = localStorage.getItem('userToken');
  private modifiedReq: HttpRequest<any>;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.modifiedReq = req.clone();
    if (req.url.includes('backend') && this.synToken) {
      this.modifiedReq = req.clone({
        headers: new HttpHeaders({Authorization: `${this.synToken}`, 'Access-Control-Allow-Origin': '*'}),
      });
    } else {
      if (this.userToken) {
        this.modifiedReq = req.clone({
          headers: new HttpHeaders({Authorization: `${this.userToken}`, 'Access-Control-Allow-Origin': '*'}),
        });
      }
    }
    return next.handle(this.modifiedReq);
  }
}
