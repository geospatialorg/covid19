import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, combineLatest, interval} from 'rxjs';
import {delay, map, startWith, switchMap, tap} from 'rxjs/operators';
import {AllCasesByCountyResponse} from '../interfaces/all-cases-by-county-response';
import {StorageService} from './storage.service';
import {NotificationsService} from './notifications.service';

const KEY_PREFIX = 'COVID_';
const TOTAL_CASES_KEY = KEY_PREFIX + 'TOTALS';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  /* set to true to see random totals and notification */
  private testNotificationEnableRandomTotals = false;

  public cases: AllCasesByCountyResponse = {
    confirmed: {total: 0, data: []},
    deaths: {total: 0, data: []},
    healed: {total: 0, data: []},
  };

  private casesSourceSubject = new BehaviorSubject<AllCasesByCountyResponse>({
    confirmed: {total: 0, data: []},
    deaths: {total: 0, data: []},
    healed: {total: 0, data: []},
  });
  currentCases = this.casesSourceSubject.asObservable();


  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private notificationsService: NotificationsService
  ) {
    this.getAllCases();
  }

  getCasesByCounty(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/v2/getCasesByCounty`, {params});
  }

  getHealthCasesByCounty(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/v2/getHealthCasesByCounty`, {params});
  }

  getDeadCasesByCounty(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/v2/getDeadCasesByCounty`, {params});
  }

  getDailyCaseReport(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/getDailyCaseReport`, {params});
  }

  getGlobalStat(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/getGlobalStat`, {params});
  }

  getPercentageByGender(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/getPercentageByGender`, {params});
  }

  getCasesByAgeGroup(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/getCasesByAgeGroup`, {params});
  }

  getGeojsonData(params?: any) {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/getGeojsonData`, {params});
  }

  getAllCases() {
    return interval(environment.data_refresh).pipe(
      startWith(0),
      switchMap(() => combineLatest([
          this.getCasesByCounty(),
          this.getDeadCasesByCounty(),
          this.getHealthCasesByCounty()
        ]).pipe(
        map((response): AllCasesByCountyResponse => this.mapResponse(response))
        )
      )
    ).subscribe((response: AllCasesByCountyResponse) => {
      this.changeCases(response);
      this.computeTotals(response);
    });
  }

  private computeTotals(response: AllCasesByCountyResponse) {
    const newCases = {
      confirmed: response.confirmed.total,
      deaths: response.deaths.total,
      healed: response.healed.total,
    };


    const storedCases = this.storageService.get(TOTAL_CASES_KEY);
    if (storedCases) {
      const newTotals = newCases.confirmed + newCases.deaths + newCases.healed;
      const oldTotals = storedCases.confirmed + storedCases.deaths + storedCases.healed;
      if (newTotals !== oldTotals) {
        let message = '';
        message += 'Cazuri confirmate: ' + newCases.confirmed + '. ';
        message += 'Cazuri vindecate: ' + newCases.healed + '. ';
        message += 'Decese: ' + newCases.deaths + '. ';

        this.notificationsService.showNotification(message);
      }
    }
    this.storageService.set(TOTAL_CASES_KEY, newCases);
  }

  private mapResponse([casesByCounty, deadCasesByCounty, healthCasesByCounty]): AllCasesByCountyResponse {
    // force data changes to test notifications
    if (this.testNotificationEnableRandomTotals) {
      const min = 10;
      const max = 10000;

      casesByCounty.data.total = casesByCounty.data.total + Math.floor(Math.random() * (max - min + 1)) + min;
      deadCasesByCounty.data.total = deadCasesByCounty.data.total + Math.floor(Math.random() * (max - min + 1)) + min;
      healthCasesByCounty.data.total = healthCasesByCounty.data.total + Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
      confirmed: casesByCounty.data ? casesByCounty.data : null,
      deaths: deadCasesByCounty.data ? deadCasesByCounty.data : null,
      healed: healthCasesByCounty.data ? healthCasesByCounty.data : null
    };
  }

  private changeCases(currentCases: AllCasesByCountyResponse) {
    this.casesSourceSubject.next(currentCases);
  }
}
