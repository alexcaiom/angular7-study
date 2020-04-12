import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

}
