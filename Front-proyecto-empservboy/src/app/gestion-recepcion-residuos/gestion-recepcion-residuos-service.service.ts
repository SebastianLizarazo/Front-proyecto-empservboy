import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Residuo } from './Interfaces/residuo.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionRecepcionResiduosService {
  private endpoint: string = "https://ehpnv2yej9.execute-api.us-east-2.amazonaws.com/dev";
  private apiUrl: string = `${this.endpoint}/residuos`;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getResiduos(): Observable<Residuo[]> {
    return this.http.get<Residuo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getResiduo(id: string): Observable<Residuo> {
    return this.http.get<Residuo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addResiduo(residuo: Residuo): Observable<Residuo> {
    return this.http.post<Residuo>(this.apiUrl, residuo, { headers: this.getHeaders() });
  }

  updateResiduo(residuo: Residuo): Observable<Residuo> {
    if (!residuo.id) throw Error('Residuo sin identificar');
    return this.http.put<Residuo>(`${this.apiUrl}/${residuo.id}`, residuo, { headers: this.getHeaders() });
  }

  deleteResiduoById(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      );
  }
}
