import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  public constructor(private readonly snackBar: MatSnackBar) {
  }

  public showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 1000 });
  }

}
