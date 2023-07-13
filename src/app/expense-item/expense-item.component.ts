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


  showDropdown: boolean = false;

  getIconSource() {
    return `assets/expense-icons/${this.expense.Category.toLowerCase()}.svg`;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onDelete() {
    if (window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
      this.delete.emit(this.expense.Id);
    }
  }

  onEdit() {
    this.edit.emit(this.expense);
  }
}
