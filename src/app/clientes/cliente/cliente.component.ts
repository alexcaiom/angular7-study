import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private service: ClienteService
    ) { }


  clientes: ClienteViewModel[] = [];
  isModoInsercao: boolean = true;
  cliente: ClienteViewModel;

  ngOnInit(): void {
    this.mostrarClientes();
  }

  addCliente() {
    const modal = this.modalService.open(ClienteFormComponent);
    modal.result.then(
      this.handleModalClientForm.bind(this),
      this.handleModalClientForm.bind(this)
    );

  }

  handleModalClientForm(response){
    alert("Janela fechada");
  }


  mostrarClientes() {
    this.service.getClientes().subscribe(response => {
      this.clientes = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const cliente: ClienteViewModel = {
          id: id,
          nome: data.nome,
          endereco: data.endereco,
          casado: data.casado,
          modificacao: data.modificacao.toDate()
        };
        this.clientes.push(cliente);
      });
    });
  }

  deletarClick(id: string, index: string) {

  }

  editarClick(cliente: ClienteViewModel) {
    const modal = this.modalService.open(ClienteFormComponent);
    modal.result.then(
      this.handleModalClientForm.bind(this),
      this.handleModalClientForm.bind(this)
    );
    modal.componentInstance.isModoInsercao = false;
    modal.componentInstance.cliente = cliente;
  }

  checkedCasado(index: string) {
    const novoValor = !this.clientes[index].casado;
    this.clientes[index].casado = novoValor;

    const obj = {casado : novoValor};
    const id = this.clientes[index].id;
    this.service.editarClientesParcial(id, obj);
  }

}
