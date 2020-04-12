import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      casado: false
    });
  }

  salvarCliente() {
    if(this.clienteForm.invalid) {
      return;
    }
    
  }

  }
