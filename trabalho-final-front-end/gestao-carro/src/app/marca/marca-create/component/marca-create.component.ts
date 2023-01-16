import { Marca } from "../../models/marca.model";
import { Component, OnInit } from "@angular/core";
import { MarcaService } from "../../marca.service";
import { FormBuilder, 
         FormControl, 
         FormGroup, 
         Validators 
} from "@angular/forms";

@Component({
    selector: 'gc-marca-create',
    templateUrl: './marca-create.component.html',
})

export class MarcaCreateComponent implements OnInit {
    marcaForm!: FormGroup;
    submitted = false;
    marcas: Marca[] = []

    constructor(
        private marcaService: MarcaService,
        private formBuilder: FormBuilder,
    ) {
        this.marcaService.listarMarcas().subscribe((dados: Marca[]) => {
            this.marcas = dados;
            });
     }

    ngOnInit(): void {
        this.marcaForm = this.formBuilder.group({
            sigla: new FormControl('', [Validators.required, Validators.maxLength(5)]),
            descricao: new FormControl('', [Validators.required, Validators.maxLength(50)])
        });
    }

    save() {
        if (this.marcaForm.valid) {
            const marca = this.marcaForm.getRawValue() as Marca;
            this.marcaService.save(marca).subscribe(
                () => (this.submitted = true),
                (error) => console.log(error)
            );
        }
    }
    addMarcaForm() {
        this.submitted = false;
        this.marcaForm.reset();
    }
}