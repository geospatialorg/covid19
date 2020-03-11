import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private http: HttpClient
    ) {}

    getCaseRelations( params?: any){
        return this.http.get<any>( `${environment.apiUrl}/statstics/getCaseRelations`, { params });
    }
}