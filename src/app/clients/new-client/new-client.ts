import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { Clients } from '../../services/api-client/clients/clients';
import { ClientForm } from "../components/client-form/client-form";
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManager } from '../../services/snackbar-manager';

@Component({
  selector: 'app-new-client',
  imports: [ClientForm],
  templateUrl: './new-client.html',
  styleUrl: './new-client.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: Clients },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManager }
  ]
})
export class NewClient implements OnDestroy{

  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
) { }

  ngOnDestroy(): void {
    if (this.httpSubscription){
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitClient(value: ClientModelForm){
    const {id, ...request } = value;
    this.httpSubscription = this.httpService.save(request).subscribe(_ => {
      this.snackBarManager.show('Usuário criado com sucesso!');
      this.router.navigate(['/clients/list']);
    })
  }
}

