import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-doaa-view',
  templateUrl: './doaa-view.component.html',
  styleUrls: ['./doaa-view.component.css']
})
export class DoaaViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToAddForm() {
    this.router.navigate(['/add-doaa']);
  }


}
