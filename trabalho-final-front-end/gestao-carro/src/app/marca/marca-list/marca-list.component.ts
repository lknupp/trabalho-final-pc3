import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../marca.service';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'gc-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit{
  constructor(private marcaService: MarcaService, private router: Router) { }
  marcas: Marca[] = [];
  deleteMessage = false;

  ngOnInit() {
    this.marcaService.listarMarcas().subscribe(dados => {
      this.marcas = dados;
    });
  }

  delete(id?: number) {
    this.marcaService.delete(id!).subscribe(dado => {
      console.log(dado);
      this.deleteMessage = true;
      this.marcaService.listarMarcas().subscribe(dados => {
        this.marcas = dados;
      });
    },
      error => console.log(error)
    );
  }

  updateMarca(id?: number) {
    this.router.navigate(['edit-marca', id]);
  }

  detalheMarca(id?: number) {
    this.router.navigate(['detail-marca', id]);
  }

}
