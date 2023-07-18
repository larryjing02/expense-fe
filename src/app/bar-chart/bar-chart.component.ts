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

  selectedTimeRange: string = 'day';

  public barChartOptions: ChartOptions = this.getChartOptions(this.selectedTimeRange);

  // Function to create a new ChartOptions object
  getChartOptions(timeRange: string): ChartOptions {
    return {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            // Update this line to use the variable
            text: this.capitalizeFirstLetter(timeRange),
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
  }

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
    this.selectedTimeRange = this.timeRange.nativeElement.value;
    const startDate = this.startDate.nativeElement.value;
    const endDate = this.endDate.nativeElement.value;
    if (this.selectedTimeRange == null || startDate == null) {
      return;
    }

    this.barChartOptions = this.getChartOptions(this.selectedTimeRange);
    this.expenseService.getExpenseChart(this.selectedTimeRange, startDate, endDate).subscribe((data: Array<{ Key: string, Value: number }>) => {
      this.barChartLabels = data.map(item => item.Key);
      this.barChartData[0].data = data.map(item => item.Value) as any[];
    });
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
