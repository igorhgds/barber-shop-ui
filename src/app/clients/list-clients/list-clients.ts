import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { Clients } from '../../services/api-client/clients/clients';
import { ClientTable } from '../components/client-table/client-table';
import { SnackbarManager } from '../../services/snackbar-manager';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientModelTable } from '../client.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clients',
  imports: [ClientTable],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.scss',
  providers: [
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: Clients },
      { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManager }
    ]
})
export class ListClients implements OnInit, OnDestroy{

  private httpSubscriptions: Subscription[] = [];

  clients: ClientModelTable [] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManager: ISnackbarManagerService,
    private readonly router: Router
) { }

  ngOnInit(): void {
    this.httpSubscriptions.push(this.httpService.list().subscribe(data => this.clients = data));
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe());
  }

  updateClient(client: ClientModelTable){
    this.router.navigate(['clients/edit-client', client.id]);
  }

  deleteClient(client: ClientModelTable){
    this.httpSubscriptions.push(
      this.httpService.delete(Number(client.id)).subscribe(_ => this.snackbarManager.show(`O cliente ${client.name} foi excluído com sucesso.`)));
  }
}
