import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) {
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
}
