import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm: string = '';

  showAddUserModal = false;
  showEditUserModal = false;

  newUser: any = this.getEmptyUser();
  selectedUser: any = {};

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }
  getSoftwareList(emp: any): string {
  return [
    emp.software1, emp.software2, emp.software3, emp.software4, emp.software5,
    emp.software6, emp.software7, emp.software8, emp.software9, emp.software10
  ].filter((s: string) => s && s.trim())  // keep only non-empty values
   .join(', ');
}


  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      (`${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
        emp.workEmail?.toLowerCase().includes(term) ||
        emp.role?.toLowerCase().includes(term))
    );
  }

  openAddUserModal() {
    
    this.showAddUserModal = true;
    this.showEditUserModal = false;
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
    this.newUser = this.getEmptyUser();
  }

  closeEditUserModal() {
    this.showEditUserModal = false;
    this.getEmployees();
  }

  updateEmployee(emp: any) {
    this.selectedUser = { ...emp };
    this.showAddUserModal = false;
    this.showEditUserModal = true;
  }

  submitAddUser() {
    this.employeeService.addEmployee(this.newUser).subscribe(() => {
      this.closeAddUserModal();
      this.getEmployees();
    }, (err) => {
      console.error('Failed to add employee:', err);
    });
  }

  submiteEditUser() {
    this.employeeService.updateEmployee(this.selectedUser.id, this.selectedUser).subscribe({
      next: () => {
        this.getEmployees();
        this.closeEditUserModal();
      },
      error: (err) => {
        console.error('Failed to update employee:', err);
      }
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete employee', err);
        this.getEmployees();
      }
    });
  }

  downloadCSV() {
    this.employeeService.getAllEmployees()
      .subscribe(data => {
        const header = [
          'First Name', 'Last Name', 'City', 'State', 'Country',
          'Work Email', 'Personal Email', 'Phone', 'Role', 'Vendor', 'Type',
          'Software 1', 'Software 2', 'Software 3', 'Software 4', 'Software 5',
          'Software 6', 'Software 7', 'Software 8', 'Software 9', 'Software 10'
        ];

        const rows = data.map(emp => [
          emp.firstName, emp.lastName, emp.city, emp.state, emp.country,
          emp.workEmail, emp.personalEmail, emp.phone, emp.role, emp.vendor, emp.type,
          emp.software1, emp.software2, emp.software3, emp.software4, emp.software5,
          emp.software6, emp.software7, emp.software8, emp.software9, emp.software10
        ]);

        const csvContent = [header, ...rows]
          .map(e => e.map(x => `"${(x ?? '').toString().replace(/"/g, '""')}"`).join(','))
          .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees.csv';
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  private getEmptyUser() {
    return {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      country: '',
      type: '',
      vendor: '',
      role: '',
      software1: '',
      software2: '',
      software3: '',
      software4: '',
      software5: '',
      software6: '',
      software7: '',
      software8: '',
      software9: '',
      software10: '',
      workEmail: '',
      personalEmail: '',
      phone: '',
      createdBy: 'System',
      createdDate: new Date().toISOString(),
      updatedBy: null,
      updatedDate: null
    };
  }
}
