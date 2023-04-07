import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-toster-notifier',
  templateUrl: './toster-notifier.component.html',
  styleUrls: ['./toster-notifier.component.css'],
})
export class TosterNotifierComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snakeBarRef: MatSnackBarRef<TosterNotifierComponent>
  ) {}

  ngOnInit(): void {}
}
