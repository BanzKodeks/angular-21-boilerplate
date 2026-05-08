import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Role } from './_models';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: false
})
export class AppComponent {

    Role = Role;
    account: any;

    constructor(private accountService: AccountService) {
        this.account = this.accountService.accountValue;
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }
}