import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VeiculoService } from '../veiculo.service';
import { Marca } from 'src/app/marca/models/marca.model';
import { MarcaService } from 'src/app/marca/marca.service';
import { Veiculo } from '../veiculo.model';

@Component({
  selector: 'gc-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {
  veiculoForm!: FormGroup;
  submitted = false;
  marcas: Marca[] = [];
  constructor(
    private veiculoService: VeiculoService,
    private formBuilder: FormBuilder,
    private marcaService: MarcaService
  ) {
    this.marcaService.listarMarcas().subscribe((dados: Marca[]) => {
      this.marcas = dados;
    });
  }
  ngOnInit(): void {
    this.veiculoForm = this.formBuilder.group({
      placa: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
      cor: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)]),
      anoModelo: new FormControl('', 
      [Validators.required]),
      marca: new FormControl('', [Validators.required])
    });
  }
  save() {
    if (this.veiculoForm.valid) {
      const veiculo = this.veiculoForm.getRawValue() as Veiculo;
      this.veiculoService.save(veiculo).subscribe(
        () => (this.submitted = true),
        (error) => console.log(error)
      );
    }
  }
  addVeiculoForm() {
    this.submitted = false;
    this.veiculoForm.reset();
  }
}
