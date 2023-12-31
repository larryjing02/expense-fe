import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExpenseItem } from '../models/expense-item.model';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expensesUpdated = new Subject<void>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getExpenses(): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(API_ENDPOINTS.EXPENSE, { headers: this.headers });
  }

  getExpenseCategories(): Observable<any> {
    return this.http.get(API_ENDPOINTS.CATEGORIES, { headers: this.headers });
  }

  getExpenseChart(timeRange: string, startDate: string, endDate: string): Observable<any> {
    const utcStartDate = new Date(startDate);
    utcStartDate.setHours(0, 0, 0);
  
    const utcEndDate = new Date(endDate);
    utcEndDate.setHours(23, 59, 59);
    console.log(utcStartDate.toISOString());
    console.log(utcEndDate.toISOString());
  
    return this.http.get(API_ENDPOINTS.CHART, {
      params: {
        timeRange,
        startDate: utcStartDate.toISOString(),
        endDate: utcEndDate.toISOString()
      },
      headers: this.headers
    });
  }

  addExpense(expense: ExpenseItem): Observable<ExpenseItem> {
    expense.UserId = this.userId;
    return this.http.post<ExpenseItem>(API_ENDPOINTS.EXPENSE, expense, { headers: this.headers });
  }

  editExpense(expense: ExpenseItem): Observable<ExpenseItem> {
    expense.UserId = this.userId;
    return this.http.put<ExpenseItem>(`${API_ENDPOINTS.EXPENSE}/${expense.Id}`, expense, { headers: this.headers });
  }

  deleteExpense(id: string): Observable<{}> {
    return this.http.delete(`${API_ENDPOINTS.EXPENSE}/${id}`, { headers: this.headers });
  }

  // Used to update categories across components when necessary
  refreshExpenseCategories() {
    this.getExpenseCategories().subscribe(() => {
      this.expensesUpdated.next();
    });
  }

  private get headers() {
    const user = this.authService.currentUserValue;
    if (user) {
      return new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
    } else {
      return new HttpHeaders();
    }
  }

  private get userId() {
    const user = this.authService.currentUserValue;
    return user ? user.userId : "";
  }
}
