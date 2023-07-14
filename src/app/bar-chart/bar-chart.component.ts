import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ExpenseService } from '../services/expense.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('timeRange') timeRange!: ElementRef;
  @ViewChild('startDate') startDate!: ElementRef;
  @ViewChild('endDate') endDate!: ElementRef;

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

  // The labels for the x-axis
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [
    { data: [] as (number | null)[], backgroundColor: 'rgba(0,48,188,.4)' }
  ];

  constructor(private expenseService: ExpenseService) {}

  ngAfterViewInit() {
    // Set default values
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 10);

    this.timeRange.nativeElement.value = 'day';
    this.startDate.nativeElement.value = startDate.toISOString().slice(0, 10);
    this.endDate.nativeElement.value = endDate.toISOString().slice(0, 10);

    this.fetchChartData();
    this.expenseService.expensesUpdated.subscribe(() => {
      this.fetchChartData();
    });
  }

  fetchChartData() {
    const timeRange = this.timeRange.nativeElement.value;
    const startDate = this.startDate.nativeElement.value;
    const endDate = this.endDate.nativeElement.value;
    if (timeRange == null || startDate == null) {
      return;
    }
    console.log("fetching chart data")
    this.expenseService.getExpenseChart(timeRange, startDate, endDate).subscribe((data: Array<{ Key: string, Value: number }>) => {
      console.log("Chart data fetched!!!!");
      this.barChartLabels = data.map(item => item.Key);
      this.barChartData[0].data = data.map(item => item.Value) as any[];
    });
  }
}
