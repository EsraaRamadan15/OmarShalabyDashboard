import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogServiceService {
  constructor(private dialog: MatDialog) {}

  openConfirmMessage(msg: any) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      disableClose: false,
      data: {
        message: msg,
      },
    });
  }
}
