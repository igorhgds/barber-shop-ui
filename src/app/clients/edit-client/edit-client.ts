import { Component, Inject } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { Clients } from '../../services/api-client/clients/clients';

@Component({
  selector: 'app-edit-client',
  imports: [],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.scss',
  providers: [
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: Clients }
    ]
})
export class EditClient {

  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService) { }

}
