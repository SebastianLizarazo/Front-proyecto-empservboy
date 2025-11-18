import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './Interfaces/cliente.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionClientesServiceService {
  private endpoint: string = "https://ehpnv2yej9.execute-api.us-east-2.amazonaws.com/dev";
  private apiUrl: string = `${this.endpoint}/clientes`;
  private apiGetById: string = `${this.endpoint}/clientes`; // obtener cliente por id
  private api2Url: string = `${this.endpoint}/clientes`; // crear cliente
  private api3Url: string = `${this.endpoint}/clientes`; // actualizar cliente
  private api4Url: string = `${this.endpoint}/clientes`; // eliminar cliente

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }



  getClientes():Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCliente(id: string): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.apiGetById}/${id}`, { headers: this.getHeaders() });
  }

  addCliente( cliente: Cliente ): Observable<Cliente> {
    return this.http.post<Cliente>(`${ this.api2Url }`, cliente );
  }


  updateCliente( cliente: Cliente ): Observable<Cliente> {
    if ( !cliente.id ) throw Error('Cliente sin identificar');

    return this.http.put<Cliente>(`${ this.api3Url }/${ cliente.id }`, cliente );
  }

  deleteClienteById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.api4Url }/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

}
