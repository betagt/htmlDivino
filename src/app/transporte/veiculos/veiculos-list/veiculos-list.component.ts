import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {VeiculoService} from "../service/veiculo.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuariosService} from "../../../usuarios/usuarios.service";

@Component({
    selector: 'app-veiculos-list',
    templateUrl: './veiculos-list.component.html',
    styleUrls: ['./veiculos-list.component.css'],
    providers: [UsuariosService]
})
export class VeiculosListComponent extends ListAbstract implements OnInit {

    usuarios;

    constructor(private veiculoService: VeiculoService,
                formBuilder: FormBuilder,
                private usuarioService: UsuariosService,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, veiculoService);
    }

    ngOnInit(): void {
        super.form({
            //'veiculos.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'transporte_veiculos.user_id': [null],
            'field': ['id'],
            'order': ['dec']
        });
        this.list();
    }

    search(event) {
        this.usuarioService.selectList(event.query).subscribe(usuarios => {
            this.usuarios = usuarios;
        });
    }

    handleDropdown(event) {
        console.log(event);
    }

    selectdItem(selectedItem) {
        this.pesquisaForm.controls['transporte_veiculos.user_id'].setValue(selectedItem.id);
    }

}
