import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dialog, Page } from '../../models/site.model';

@Component({ selector: 'app-site-header', standalone: true, imports: [FormsModule], templateUrl: './site-header.component.html' })
export class SiteHeaderComponent {
  @Input({ required: true }) page!: Page;
  @Output() navigate = new EventEmitter<Page>();
  @Output() openDialog = new EventEmitter<Exclude<Dialog, null>>();
}
