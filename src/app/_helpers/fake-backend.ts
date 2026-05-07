import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { AlertService } from '@app/_services';
import { Role } from '@app/_models';
import { error } from 'console';

const accountsKey = 'angular-21-signup-verfication-boilerplate-accounts';
let accounts: any[] = JSON.parse(localStorage.getItem(accountsKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const alertService = this.alertService;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/accounts/authenticate') && method == 'POST':
                    return authenticate();
                case url.endsWith('/accounts/refresh-token') && method == 'POST':    
                    return refreshToken();
                case url.endsWith('/accounts/revoke-token') && method == 'POST':    
                    return revokeToken();    
                case url.endsWith('/accounts/register') && method == 'POST':    
                    return register();  
                case url.endsWith('/accounts/verify-email') && method == 'POST':    
                    return verifyEmail();
                case url.endsWith('/accounts/forgot-password') && method == 'POST':    
                    return forgotPassword();    
                case url.endsWith('/accounts/validate-reset-token') && method == 'POST':    
                    return validateResetToken();   
                case url.endsWith('/accounts/reset-password') && method == 'POST':    
                    return resetPassword();     
                case url.endsWith('/accounts') && method == 'GET':    
                    return getAccounts();    
                case url.endsWith(/\/accounts\/\d+$/) && method == 'GET':    
                    return getAccountById();
                case url.endsWith('/accounts') && method == 'POST':    
                    return createAccount();        
                case url.endsWith(/\/accounts\/\d+$/) && method == 'PUT':    
                    return updateAccount();    
                case url.endsWith(/\/accounts\/\d+$/) && method == 'DELETE':    
                    return deleteAccount();     
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { email, password } = body;
            const account = accounts.find(x => x.email === email && x.password === password && x.isVerified);

            if (!account) return error('Email or password is incorrect');

            account.refreshTokens.push(generateRefreshToken());
            localStorage.setItem(accountsKey, JSON.stringify(accounts));

            return ok({
                ...basicDetails(account),
                jwtToken: generateJwtToken(account)
            });
        }

        function refreshToken() {
            const refreshToken = getRefreshToken();

            if (!refreshToken) return unauthorized();

            const account = accounts.find(x => x.refreshTokens.includes(refreshToken));

            account.refreshTokens = account.refreshTokens.filter((x: any) => x !== refreshToken);
        }
    }
}



