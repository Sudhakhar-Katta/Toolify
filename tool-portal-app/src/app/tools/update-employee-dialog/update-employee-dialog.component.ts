import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../employee-list/employee.service';

@Component({
  selector: 'app-update-employee-dialog',
  standalone: true,
  templateUrl: './update-employee-dialog.component.html',
  styleUrls: ['./update-employee-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class UpdateEmployeeDialogComponent {
  employee: any;

  constructor(
    private dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService
  ) {
    // Clone the employee object so changes don't instantly reflect in parent
    this.employee = { ...data.employee };
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe({
      next: () => {
        this.dialogRef.close(true); // Close modal and notify success
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Update failed. Please try again.');
      }
    });
  }
}
