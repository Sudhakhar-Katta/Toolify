import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any[]> {
  return this.http.get<any[]>('https://localhost:7280/api/Employee/all-employees');
}

  getEmployeeDetails() {
    return this.http.get('https://localhost:7280/api/Employee/employee-details');
  }

  addEmployee(data: any) {
    return this.http.post('https://localhost:7280/api/Employee/add-employee', data);
  }

  updateEmployee(id: string, data: any) {
    return this.http.put(`https://localhost:7280/api/Employee/update-employee/${id}`, data);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`https://localhost:7280/api/Employee/delete-employee/${id}`, {
    });
  }
}
