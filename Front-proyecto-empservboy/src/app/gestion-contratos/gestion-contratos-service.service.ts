import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrato } from './Interfaces/contrato.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionContratosService {
  private endpoint: string = "https://ehpnv2yej9.execute-api.us-east-2.amazonaws.com/dev";
  private apiUrl: string = `${this.endpoint}/contratos`;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getContrato(id: string): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(this.apiUrl, contrato, { headers: this.getHeaders() });
  }

  updateContrato(contrato: Contrato): Observable<Contrato> {
    if (!contrato.id) throw Error('Contrato sin identificar');
    return this.http.put<Contrato>(`${this.apiUrl}/${contrato.id}`, contrato, { headers: this.getHeaders() });
  }

  deleteContratoById(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      );
  }
}
