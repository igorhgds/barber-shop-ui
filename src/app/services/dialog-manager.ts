import { Injectable } from '@angular/core';
import { IDialogManagerService } from './idialog-manager.service';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { YesNoDialog } from '../commons/components/yes-no-dialog/yes-no-dialog';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogManager implements IDialogManagerService{

  constructor(private readonly dialog: MatDialog) { }

  showYesNoDialog(component: ComponentType<YesNoDialog>, data: { title: string; content: string; }): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '400px',
      data: data,
    });
    return dialogRef.afterClosed();
  }
  
}
