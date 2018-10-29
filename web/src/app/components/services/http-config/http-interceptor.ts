import { Injectable, HostListener } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { httpResponseCodes } from '../../common/user-attributes';

@Injectable({
    providedIn: 'root',
})

export class RequestInterceptor implements HttpInterceptor {

    constructor() {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token = this.authService.getAccessToken();
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
            },
            url: `http://172.16.16.124${request.url}`
        });

        return next.handle(request).pipe(map(res => res),
            catchError((error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case httpResponseCodes.unAuthorized:
                            {
                                // TODO: this case will not be happen after implimentation of refrsh token,
                                // // so will remove it after proper verification
                                // this.toaster.toastrConfig.preventDuplicates = true;
                                // this.sharedService.logout();
                                // this.toaster.error(tokenExpiredError);
                            }
                            break;
                        case httpResponseCodes.notFound:
                            // this.toaster.error(notFoundError);
                            break;
                        case httpResponseCodes.badRequest:
                        case httpResponseCodes.methodNotAllowed:
                        case httpResponseCodes.internalServerError:
                            return throwError(error);
                        default: return throwError(error);
                    }
                } else {
                    return throwError(error);
                }
            })));
    }

}
