import { Component, EventEmitter, Output } from '@angular/core';
import { Page } from '../../models/site.model';

@Component({ selector: 'app-site-footer', standalone: true, templateUrl: './site-footer.component.html' })
export class SiteFooterComponent {
  @Output() navigate = new EventEmitter<Page>();
}
