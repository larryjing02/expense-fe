import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from '../models/expense-item.model';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: ExpenseItem[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.refreshExpenses();
  }

  refreshExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      for (var expense of expenses) {
        console.log(expense)
      }
    });
  }

  handleDelete(expenseId: string) {
    this.expenseService.deleteExpense(expenseId).subscribe(() => {
      this.refreshExpenses();
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
