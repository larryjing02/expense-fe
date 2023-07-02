import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseItem } from '../models/expense-item.model';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getExpenses(): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(API_ENDPOINTS.EXPENSE, { headers: this.headers });
  }

  addExpense(expense: ExpenseItem): Observable<ExpenseItem> {
    return this.http.post<ExpenseItem>(API_ENDPOINTS.EXPENSE, expense);
  }

  editExpense(expense: ExpenseItem): Observable<ExpenseItem> {
    return this.http.put<ExpenseItem>(`${API_ENDPOINTS.EXPENSE}/${expense.Id}`, expense);
  }

  deleteExpense(id: string): Observable<{}> {
    return this.http.delete(`${API_ENDPOINTS.EXPENSE}/${id}`);
  }

  private get headers() {
    const user = this.authService.currentUserValue;
    if (user) {
      return new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
    } else {
      return new HttpHeaders();
    }
  }
  
}
