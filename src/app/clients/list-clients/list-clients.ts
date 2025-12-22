import { Component, Inject } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { Clients } from '../../services/api-client/clients/clients';

@Component({
  selector: 'app-list-clients',
  imports: [],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.scss',
  providers: [
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: Clients }
    ]
})
export class ListClients {

  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService) { }

}
