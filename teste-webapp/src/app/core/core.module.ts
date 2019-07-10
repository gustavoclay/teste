import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { AcessoNegadoComponent } from './views/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './views/pagina-nao-encontrada.component';

// export function tokenGetter() {
//   return localStorage.getItem('token');
// }
@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
    AcessoNegadoComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    //   JwtModule.forRoot({
    //     config: {
    //       tokenGetter: tokenGetter,
    //       whitelistedDomains: environment.tokenWhitelistedDomains,
    //       blacklistedRoutes: environment.tokenBlacklistedRoutes,
    //       skipWhenExpired: false
    //     }
    //   })
  ],
  exports: [ErrorMsgComponent],
  providers: [
    //   AuthService,
    //   AuthInterceptService,
    //   AuthGuard,
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptService,
    //     multi: true
    //   }
  ]
})
export class CoreModule { }
