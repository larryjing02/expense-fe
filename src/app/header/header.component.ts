import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  currentUserFirstName: string;

  constructor(private authService: AuthService, private router: Router) {
    const currentUser = this.authService.currentUserValue as { firstName: string };
    this.currentUserFirstName = this.normalizeFirstName(currentUser.firstName);
  }

  private normalizeFirstName(firstName: string): string {
    if (firstName) {
      const lowercased = firstName.toLowerCase();
      return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
    }
    return '';
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.logout-button')) {
      return;
    } else if (!target.closest('.dropdown-menu')) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
