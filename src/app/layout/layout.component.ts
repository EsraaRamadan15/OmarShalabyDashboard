import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,

  ) { }
  ngOnInit(): void {}

  logout()
  {
    localStorage.clear();
    this.router.navigate([`login`]);
  }
}
