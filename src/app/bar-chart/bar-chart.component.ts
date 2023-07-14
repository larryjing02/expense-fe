import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ExpenseService } from '../services/expense.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Expense Amount ($)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  barChartLabels: string[] = []; // The labels for the x-axis
  barChartData: ChartDataset[] = [
    { data: [] as (number | null)[], backgroundColor: 'rgba(0,48,188,.4)' }
  ];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpenseChart('week', '2023-06-10', '2023-7-31').subscribe((data: Array<{ Key: string, Value: number }>) => {
      this.barChartLabels = data.map(item => item.Key);
      this.barChartData[0].data = data.map(item => item.Value) as any[];
    });
    
  }
}
