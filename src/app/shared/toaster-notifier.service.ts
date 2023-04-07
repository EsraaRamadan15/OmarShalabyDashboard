import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TosterNotifierComponent } from './toster-notifier/toster-notifier.component';

@Injectable({
  providedIn: 'root',
})
export class ToasterNotifierService {
  constructor(private Snakebar: MatSnackBar) {}
  showNotification(
    displayMessage: string,
    buttonText: string,
    messageType: 'error' | 'success'
  ) {
    this.Snakebar.openFromComponent(TosterNotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType,
      },
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: messageType,
    });
  }
}
