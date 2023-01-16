import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../veiculo.service';
import { Veiculo } from '../veiculo.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'gc-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  constructor(private veiculoService: VeiculoService, private router: Router) { }
  deleteMessage = false;
  veiculos: Veiculo[] = [];

  ngOnInit() {
    this.veiculoService.listarVeiculos().subscribe(dados => {
      this.veiculos = dados;
    });
  }

  delete(id?: number) {
    this.veiculoService.delete(id!).subscribe(dado => {
      console.log(dado);
      this.deleteMessage = true;
      this.veiculoService.listarVeiculos().subscribe(dados => {
        this.veiculos = dados;
      });
    },
      error => console.log(error)
    );
  }

  updateVeiculo(id?: number) {
    this.router.navigate(['edit-veiculo', id]);
  }

  detalheMarca(id?: number) {
    this.router.navigate(['detail-veiculo', id]);
  }

  
}
