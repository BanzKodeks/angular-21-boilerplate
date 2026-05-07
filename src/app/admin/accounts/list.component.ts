import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
    templateUrl: 'list.component.html',
    standalone: false
})
export class ListComponent implements OnInit {

    accounts: any[] = [];

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loadAccounts();
    }

    deleteAccount(id: string) {

        const account = this.accounts.find(x => x.id === id);

        if (!account) {
            return;
        }

        account.isDeleting = true;

        this.accountService.delete(id)
            .pipe(first())
            .subscribe({
                next: () => {

                    this.accounts = this.accounts.filter(x => x.id !== id);

                    this.alertService.success(
                        'Account deleted successfully'
                    );
                },

                error: error => {
                    this.alertService.error(error);
                }
            });
    }

    private loadAccounts() {

        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {
                this.accounts = accounts;
            });
    }
}