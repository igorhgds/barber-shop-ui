import { Component, Input, ViewChild, Output, EventEmitter, Inject, AfterViewInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { ClientModelTable } from '../../client.models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManager } from '../../../services/dialog-manager';
import { MatIconModule } from '@angular/material/icon';
import { YesNoDialog } from '../../../commons/components/yes-no-dialog/yes-no-dialog';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [MatButtonModule, MatTableModule, MatIconModule, MatPaginator],
  templateUrl: './client-table.html',
  styleUrl: './client-table.scss',
  providers: [
    { provide: SERVICES_TOKEN.YES_NO_DIALOG, useClass: DialogManager},
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class ClientTable implements AfterViewInit, OnChanges, OnDestroy{

  @Input() clients: ClientModelTable[] = [];

  dataSource!: MatTableDataSource<ClientModelTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  
  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() OnConfirmDelete = new EventEmitter<ClientModelTable>();

  @Output() OnRequestUpdate = new EventEmitter<ClientModelTable>();

  constructor(
    @Inject(SERVICES_TOKEN.YES_NO_DIALOG) private readonly dialogManagerService: IDialogManagerService) {}
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe();
    }
  }

  formatPhone(phone: string){
    return `(${phone.substring(0,2)}) ${phone.substring(2,7)} - ${phone.substring(7)}`;
  }

  updateClient(client: ClientModelTable){
    this.OnRequestUpdate.emit(client);
  }


  deleteClient(client: ClientModelTable){
    this.dialogManagerService.showYesNoDialog(
      YesNoDialog,
      { title: 'Exclusão de Cliente', content: `Confirma a exclusão do cliente ${client.name}?` }
    )
    .subscribe(result => {
      if (result){
        this.OnConfirmDelete.emit(client);
        const updatedList = this.dataSource.data.filter (c => c.id !== client.id);
        this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList);
      }
    })
  }
}
