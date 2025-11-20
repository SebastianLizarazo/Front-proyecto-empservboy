import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './Interfaces/usuario.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {
  private endpoint: string = "https://ehpnv2yej9.execute-api.us-east-2.amazonaws.com/dev";
  private apiUrl: string = `${this.endpoint}/usuarios`;

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, { headers: this.getHeaders() });
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    if (!usuario.id) throw Error('Usuario sin identificar');
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario, { headers: this.getHeaders() });
  }

  deleteUsuarioById(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      );
  }
}
