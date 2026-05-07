import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
    templateUrl: 'verify-email.component.html',
    standalone: false
})
export class VerifyEmailComponent implements OnInit {

    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {

        const token = this.route.snapshot.queryParams['token'];

        this.accountService.verifyEmail(token)
            .pipe(first())
            .subscribe({
                next: () => {

                    this.alertService.success(
                        'Verification successful, you can now login',
                        { keepAfterRouteChange: true }
                    );

                    this.router.navigate(['/account/login']);
                },

                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}