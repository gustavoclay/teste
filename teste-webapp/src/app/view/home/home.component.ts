import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { navItems } from 'src/app/model/Nav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'teste-webapp';
  navItems = navItems;

  constructor(private router: Router, private loader: NgxUiLoaderService) { }

  ngOnInit() {
  }

  // logout() {
  //   this.loader.startBackground();
  //   this.authService.deactivate();
  //   this.router.navigate(['login']);
  //   this.loader.stopBackground();
  // }

}
