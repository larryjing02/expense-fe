import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from '../models/expense-item.model';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: ExpenseItem[] = [];

  constructor(private expenseService: ExpenseService, private router: Router) {}

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
    this.expenseService.editExpense(editedExpense).subscribe(() => {
      this.refreshExpenses();
    });
  }

  handleAdd() {
    // TODO: Open a form for adding a new expense
  }
}
