import { Component } from '@angular/core';
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
      link: 'manage'
    }
  ];

  public activeLink: string = this.navLinks[0].link;
}
