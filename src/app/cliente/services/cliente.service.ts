import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteViewModel } from '../models/cliente-view-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFirestore) { }

  private clienteCollection = 'clientes';

  getClientes(): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Cliente>(this.clienteCollection, ref => ref.orderBy('nome', 'asc')).get();
  }

  salvarClientes(cliente: Cliente): Promise<DocumentReference> {
    return this.db.collection(this.clienteCollection).add(cliente);
  }


  editarClientes(cliente: ClienteViewModel): Promise<DocumentReference> {
    return this.db.collection(this.clienteCollection).add(cliente);
  }
}
