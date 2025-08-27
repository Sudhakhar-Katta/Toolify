  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  getReportsDetails() {
    return this.http.get('https://localhost:7280/api/PowerBI/get-all-reports');
  }

  addReports(data: any) {
    return this.http.post('https://localhost:7280/api/PowerBI/add-report', data);
  }

  updateReport(id: string, data: any) {
    return this.http.put(`https://localhost:7280/api/PowerBI/update-reports/${id}`, data);
  }

  deleteReport(id: string) {
    return this.http.delete(`https://localhost:7280/api/PowerBI/delete-report/${id}`); // <-- fixed
  }
}
