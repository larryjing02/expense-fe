import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseItem } from '../models/expense-item.model';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent {
  @Input() expense!: ExpenseItem;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<ExpenseItem>();

  onDelete() {
    // TODO: Add an "Are you sure?" popup
    this.delete.emit(this.expense.Id);
  }

  onEdit() {
    // TODO: create a form that allows the user to edit the expense.
    this.edit.emit(this.expense);
  }
}
