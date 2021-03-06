import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { FlightsComponet } from './components/flights/flights.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminModule } from './components/admin/admin.module';
import { UserComponent } from './components/user/user.component';
import { UserModule } from './components/user/user.module';
import { LocalStorage } from './shared/injection-tokens';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AuthService } from './shared/auth/auth.service';
import { UserService } from './shared/user-service/user.service';
import { ConfirmDialogComponent } from './components/dialog/confirm/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialog/alert/alert-dialog.component';
import { CoreModule } from './shared/core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FlightsComponet,
    AdminComponent,
    UserComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
  ],
  providers: [
    {
      provide: LocalStorage,
      useFactory: (platformId: Object) => {

        if (isPlatformBrowser(platformId)) {
          return window.localStorage;
        }
        if (isPlatformServer(platformId)) {
          return class implements Storage {
            length = 0;
            private data: Record<string, string> = {};

            clear(): void {
              this.data = {};
            }

            getItem(key: string): string | null {
              return this.data[key];
            }

            key(index: number): string | null {
              throw new Error('Method not implemented.');
            }

            removeItem(key: string): void {
              const { [key]: removedItem, ...others } = this.data;
              this.data = others;
            }

            setItem(key: string, value: string): void {
              this.data[key] = value;
            }
          }
        }
        throw Error('NOT IMPLEMENTED');
      },
      deps: [PLATFORM_ID]
    },
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
