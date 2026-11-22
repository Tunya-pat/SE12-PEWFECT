import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from './shared/site-header/site-header.component';
import { SiteFooterComponent } from './shared/site-footer/site-footer.component';
import { AuthDialogComponent } from './shared/auth-dialog/auth-dialog.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/services/services.component';
import { HelpComponent } from './features/help/help.component';
import { Dialog, Page, Service, SERVICES } from './models/site.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, ServicesComponent, HelpComponent, SiteHeaderComponent, SiteFooterComponent, AuthDialogComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  page: Page = 'home';
  dialog: Dialog = null;
  selectedService: Service | null = null;
  toast = '';

  readonly services = SERVICES;

  navigate(page: Page): void {
    this.page = page;
    this.selectedService = null;
    this.toast = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showService(service: Service): void {
    this.selectedService = service;
    this.page = 'services';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  open(dialog: Exclude<Dialog, null>): void {
    this.dialog = dialog;
    this.toast = '';
  }
}
