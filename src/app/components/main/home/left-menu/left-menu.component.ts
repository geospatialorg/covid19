import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy, Input} from '@angular/core';
import {DashboardService} from 'src/app/services';
import {environment as appConfig} from '../../../../../environments/environment';
import {Dialog} from 'primeng/dialog';
import {BehaviorSubject} from 'rxjs';
import {AllCasesByCountyResponse} from '../../../../interfaces/all-cases-by-county-response';

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeftMenuComponent implements OnInit, OnDestroy {
    @ViewChild(Dialog, {static: true}) dialog;

    tableData: any[] = [];
    totalCases = 0;
    displayDisclaimer = false;

    dataReady = false;

    constructor(
        private dashboardService: DashboardService
    ) {
    }

    ngOnInit() {
        this.dashboardService.currentCases.subscribe((response: AllCasesByCountyResponse) => {
            this.tableData = response.confirmed.data;
            this.totalCases = response.confirmed.total;
            this.dataReady = true;
        });
    }


    ngOnDestroy(): void { }

    showDisclaimer(val) {
        this.displayDisclaimer = val;
        if (val) {
            this.centerModal();
        }
    }

    centerModal() {
        const modal = this.dialog;
        setTimeout(() => {
            modal.center();
        });
    }

}
