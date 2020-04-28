import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/cliente/models/cliente';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { DocumentReference } from '@angular/fire/firestore';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clientForm: FormGroup;
  modoInsercao: boolean = true;
  cliente: ClienteViewModel;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private service: ClienteService
    ) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      casado: false
    });
    if (!this.modoInsercao) {
      this.carregarTudo(this.cliente);
    }
  }

  carregarTudo(cliente) {
    this.clientForm.patchValue(cliente);
  }

  saveCliente() {
    if(this.clientForm.invalid) {
      return;
    }

    if (this.modoInsercao) {
      let cliente: Cliente = this.clientForm.value;
      cliente.modificacao = new Date();
      cliente.cadastro = new Date();
      this.service.salvarClientes(cliente)
      .then(response => this.handleSuccessSave(response, cliente))
      .catch(err => console.error(err));      
    } else {
      let cliente: ClienteViewModel = this.clientForm.value;
      cliente.id = this.cliente.id;
      cliente.modificacao = new Date();
      this.service.editarClientes(cliente)
      .then(() => this.handleSuccessEdit(cliente))
      .catch(err => console.error(err));;
    }    
  }

  handleSuccessSave(response: DocumentReference, cliente: Cliente) {
    this.activeModal.dismiss({cliente: cliente, id: response.id, modoInsercao: true})
    ;
  }

  handleSuccessEdit (cliente: ClienteViewModel) {
    this.activeModal.dismiss({cliente: cliente, id: cliente.id, modoInsercao: false})
    ;
  }

  }
