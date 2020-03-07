import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private synToken = 'eyJhbGciOiJIUzUxMiIsImtpZCI6ImJhY2sifQ.eyJ1dWlkIjoiODZhM2YxN2EtMWE3NC00MTAxLWFlZmItYjZkYWZkNmY5M2Q0Iiwic' +
    '3ViIjoicmlja3libGFja3dhbGxAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiZXhwIjoxNTg0NDUyMjMxLjg0MjIwOTZ9.-UiQRVfqQJhOkQNM8ueYgtGqSU' +
    'dN9YzsYWNo6uIbszsI2OoYXfIYeRKQ3ev9LUGx_JnSB572c4KOZbFngKqu1w';
  private userToken = 'eyJraWQiOiJhY2NvdW50IiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiJyaWNreWJsYWNrd2FsbEBnbWFpbC5jb20iLCJraWQiOiJhY2Nvd' +
    'W50IiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NTYzNjEzNSwidXVpZCI6Ijg2YTNmMTdhLTFhNzQtNDEwMS1hZWZiLWI2ZGFmZDZmOTNkNCIsImVtaXR0ZXIiOi' +
    'JhY2NvdW50IiwianRpIjoiNzQ2OTViNzgtMTRhMC00NmJlLWJiY2MtMTMzYjczNTUzODM3In0.WOWVfy6oKx6ncyGeOEoo9cjY30XlSQs_rlSUmGM3ZlnxRGaj9ek' +
    'vzob69L1I5SPzeA-sagA4ut3IxsZlPqjFXA';
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
        headers: new HttpHeaders({Authorization: `${this.userToken}`, 'Access-Control-Allow-Origin': '*'}),
      });
    }
    return next.handle(this.modifiedReq);
  }
}
