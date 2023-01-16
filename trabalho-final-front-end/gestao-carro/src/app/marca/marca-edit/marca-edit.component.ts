import { Component } from '@angular/core';
import { Marca } from '../models/marca.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'gc-marca-edit',
  templateUrl: './marca-edit.component.html',
  styleUrls: ['./marca-edit.component.css']
})
export class MarcaEditComponent {
  public id?: number;
  marca?: Marca;
  marcaForm!: FormGroup;
  updated = false;
  constructor(private route: ActivatedRoute,
    private marcaService: MarcaService,
    private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id']);
    this.marcaService.buscarPorId(this.id!).subscribe(dado => {
      this.marca = dado;
    },
      error => console.log(error)
    );
    this.createForm();
  }
  createForm() {
    this.marcaForm = this.formBuilder.group({
      id: new FormControl(this.id),
      sigla:
        new
          FormControl(this.marca?.sigla,
            [Validators.required,
            Validators.maxLength(5)]),
      descricao:
        new
          FormControl(this.marca?.descricao,
            [Validators.required,
            Validators.maxLength(50)])
    });
  }

  update() {
    if (this.marcaForm.valid) {
      const marca = this.marcaForm.getRawValue() as Marca;
      this.marcaService.update(this.id, this.marca).subscribe(
        () => (this.updated = true),
        (error) => console.log(error)
      );
    }
  }


}

