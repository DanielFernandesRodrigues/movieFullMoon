import { Component, OnInit } from '@angular/core';
import * as JWT from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public displayname: string;
  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };

  isAdmin: boolean = false;
  isManager: boolean = false;
  isUser: boolean = false;

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      var user = JSON.parse(localStorage.getItem('currentUser'));
      this.displayname = user.displayName;
      var decoded = JWT(user.token);
    }
  }
}
