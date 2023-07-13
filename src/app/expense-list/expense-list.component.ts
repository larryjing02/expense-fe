import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseItem } from '../models/expense-item.model';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: ExpenseItem[] = [];
  isFormVisible: boolean = false;
  isLoading: boolean = false;
  editedExpense: ExpenseItem | null = null;
  @ViewChild('expenseForm') expenseForm!: NgForm;

  constructor(private expenseService: ExpenseService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {
    this.refreshExpenses();
  }

  refreshExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: expenses => {
        this.expenses = expenses;
      },
      error: error => {
        // Unsuccessful request - either unauthorized or server/API error
        console.log('Error when refreshing expense list: ', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  handleDelete(expenseId: string) {
    this.expenseService.deleteExpense(expenseId).subscribe({
      next: expenses => {
        this.refreshExpenses();
      },
      error: error => {
        console.log('Error when deleting from expense list: ', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  handleEdit(editedExpense: ExpenseItem) {
    this.editedExpense = editedExpense;
    this.isFormVisible = true;
    setTimeout(() => {
      this.expenseForm.setValue({
          description: editedExpense.Description,
          category: editedExpense.Category,
          amount: editedExpense.Amount,
          date: this.datePipe.transform(editedExpense.Timestamp, 'yyyy-MM-dd'),
          time: this.datePipe.transform(editedExpense.Timestamp, 'HH:mm')
      });
  });
  }

  onSubmit(expenseForm: NgForm) {
    if (!expenseForm.valid) {
      return;
    }
    this.isLoading = true;
    const date = new Date(expenseForm.value.date);
    if (expenseForm.value.time) {
      const time = expenseForm.value.time.split(':');
      date.setHours(Number(time[0]) + 24, Number(time[1]));
    } else {
      const offset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() + offset);
    }
    
    
    const expense: ExpenseItem = {
      Id: this.editedExpense ? this.editedExpense.Id : '',
      UserId: '',
      Amount: Number(parseFloat(expenseForm.value.amount).toFixed(2)),
      Timestamp: date,
      Category: expenseForm.value.category,
      Description: expenseForm.value.description
    };

    if (this.editedExpense) {
      this.expenseService.editExpense(expense).subscribe(() => {
        this.refreshExpenses();
        expenseForm.reset();
        this.isLoading = false;
        this.isFormVisible = false;
        this.editedExpense = null;
      });
    } else {
      this.expenseService.addExpense(expense).subscribe(() => {
        this.refreshExpenses();
        expenseForm.reset();
        this.isLoading = false;
        this.isFormVisible = false;
      });
    }
  }
}
