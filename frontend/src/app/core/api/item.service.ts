import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: string;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly api = '/api/items';

  list(): Observable<Item[]> { return this.http.get<Item[]>(this.api); }
  create(input: Pick<Item, 'name' | 'description'>): Observable<Item> {
    return this.http.post<Item>(this.api, input);
  }
}
