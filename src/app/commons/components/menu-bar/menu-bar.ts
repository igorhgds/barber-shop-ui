import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.scss',
})
export class MenuBar {

  constructor(private readonly router: Router){}

  navigateTo(path: string){
    this.router.navigate([path]);
  }
}
