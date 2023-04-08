import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-surah-view',
  templateUrl: './surah-view.component.html',
  styleUrls: ['./surah-view.component.css']
})
export class SurahViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToAddForm() {
    this.router.navigate(['/add-surah']);
  }

}
