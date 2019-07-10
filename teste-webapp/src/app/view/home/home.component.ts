import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from 'src/app/model/Nav';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'geduca-webapp';
  navItems = navItems;

  constructor(private router: Router, private authService: AuthService, private loader: NgxUiLoaderService) { }

  ngOnInit() {
  }

  logout() {
    this.loader.startBackground();
    this.authService.deactivate();
    this.router.navigate(['login']);
    this.loader.stopBackground();
  }

}
