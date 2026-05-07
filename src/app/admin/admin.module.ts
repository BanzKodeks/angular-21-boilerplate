import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],

    declarations: [
        LayoutComponent,
        DashboardComponent,
        OverviewComponent
    ]
})
export class AdminModule { }