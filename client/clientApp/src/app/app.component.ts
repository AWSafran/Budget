import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavLink } from './model/nav-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navLinks: NavLink[] = [
    {
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      label: 'Expenses',
      link: '/expenses'
    },
    {
      label: 'Manage',
      link: '/manage'
    }
  ];

  public windowHeight: number;

  @HostListener('window:resize', ['$event'])
    onResize() {
      this.windowHeight = window.innerHeight;
  }

  constructor(private router: Router) {
    this.windowHeight = window.innerHeight;
  }

  public isCurrentRoute(link: string): boolean {
    return this.router.url === link
  }
}
