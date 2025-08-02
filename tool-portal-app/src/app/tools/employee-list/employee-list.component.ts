import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import  {HttpClient} from "@angular/common/http";

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

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }


  deleteEmployee(id: string) {
  this.employeeService.deleteEmployee(id).subscribe({
    next: () => {
      // Update local array
      this.employees = this.employees.filter(emp => emp.id !== id);
      // Refresh the list
    },
    error: (err) => {
      console.error('Failed to delete employee', err);
       this.getEmployees();
      //alert('Failed to delete employee');
    }
  });
}
showAddUserModal = false;

newUser: any = {
  firstName: '',
  lastName: '',
  city: '',
  state: '',
  country: '',
  type: '', // ADD THIS
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
  createdBy: 'System', // ADD THIS
  createdDate: new Date().toISOString(), // ADD THIS
  updatedBy: null,
  updatedDate: null
};

showeEditUserModal:boolean=false;
selectedUser:any={}

//Open Modal & populate fields
updateEmployee( emp:any) {
    this.selectedUser = {...emp};
    this.showeEditUserModal=true;
}
submiteEditUser(){
  this.employeeService.updateEmployee(this.selectedUser.id,this.selectedUser).subscribe({

    next: () => {

      this.getEmployees();
      this.closeEditUserModal();
    }
  })
}
closeAddUserModal(){
  this.showAddUserModal=false;
  this.selectedUser={}
}


openAddUserModal() {
  this.showAddUserModal = true;
}

closeEditUserModal() {
  this.showeEditUserModal = false;
  this.getEmployees();
}

submitAddUser() {
  this.employeeService.addEmployee(this.newUser).subscribe(() => {
    // Refresh table
    this.closeEditUserModal();
  }, (err) => {
    this.getEmployees(); 
  });
}


  getEmployees() {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
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


  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      (`${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
        emp.workEmail?.toLowerCase().includes(term) ||
        emp.role?.toLowerCase().includes(term))
    );
  }
}
