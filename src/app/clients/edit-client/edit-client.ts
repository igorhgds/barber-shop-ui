import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { Clients } from '../../services/api-client/clients/clients';
import { ClientForm } from "../components/client-form/client-form";
import { SnackbarManager } from '../../services/snackbar-manager';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-edit-client',
  imports: [ClientForm],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.scss',
  providers: [
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: Clients },
      { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManager }
    ]
})
export class EditClient implements OnInit, OnDestroy{

  private httpSubscriptions: Subscription[] = [];

  client: ClientModelForm = { id: 0, name: '', email: '', phone: '' };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id){
      this.snackbarManager.show('Erro ao recuperar informações do clinte.');
      this.router.navigate(['clients/list']);
      return;
    }
    this.httpSubscriptions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data));
  }

  ngOnDestroy(): void {
      this.httpSubscriptions.forEach(s => s.unsubscribe());
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ... request } = value
    if (id){
      this.httpSubscriptions?.push(this.httpService.update(id, request).subscribe(_ => {
        this.snackbarManager.show('Usuário atualizado com sucesso!')
        this.router.navigate(['clients/list'])
      }));
      return;
    }
    this.snackbarManager.show('Um erro inesperado ocorreu ao atualizar o usuário.');
    this.router.navigate(['clients/list'])
  }
}

