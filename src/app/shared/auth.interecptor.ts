import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // you can only edit the request properties while cloning it. They r immutable
    const clonedReq = req.clone({ headers: req.headers, params: req.params });
    console.log('req intercepted and cloned!');
    return next.handle(clonedReq);
  }
}
