import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = 'eyJhbGciOiJIUzUxMiIsImtpZCI6ImJhY2sifQ.eyJ1dWlkIjoiOTBhNWZjY2MtNWRlOS00ZDJlLWIyNjAtM2NiOTBjYjgzYTlhIiwic3Vi' +
      'Ijoicmlja3libGFja3dhbGxAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiZXhwIjoxNTgzMzQzMjM2LjkxOTUyMzd9.RQmXucKmzCtxt8wTITSzg8K4kG_zuyi' +
      'VOgzrcEKdJMiQ9HmqaTpD70MoyN-dZYJmunieMFNyzvRcgR-1YzT7iA';
    // NOTE: Replace the previous constant with your bearer for now.
    // TODO: get session token from api/syn
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq);
  }
}
