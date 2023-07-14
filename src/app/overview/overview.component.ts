import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  topCategories: any;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.fetchTopCategories();
    this.expenseService.topCategoriesUpdated.subscribe(() => {
      this.fetchTopCategories();
    });
  }

  fetchTopCategories() {
    this.expenseService.getExpenseCategories().subscribe(categories => {
      this.topCategories = categories.slice(0, 3);
    });    
  }
}
