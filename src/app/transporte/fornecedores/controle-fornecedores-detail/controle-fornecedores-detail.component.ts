import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../usuarios/usuarios.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {Location} from "@angular/common";

@Component({
  selector: 'app-controle-fornecedores-detail',
  templateUrl: './controle-fornecedores-detail.component.html',
  styleUrls: ['./controle-fornecedores-detail.component.css']
})
export class ControleFornecedoresDetailComponent extends DetailAbstract implements OnInit {

    display;

    arquivos;

    constructor(private usuarioService: UsuariosService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(ref, location, activatedRoute, router, usuarioService);
    }

    ngOnInit() {
        this.buttons.edit = true;
        this.params.set('include', 'roles,endereco,telefones,documentos,documentos.arquivos');
        this.show(this.routeParams.id);
    }

    loadArquivos(arquivos) {
        this.display = true;
        this.arquivos = arquivos;
    }

    show(id: number) {
        this.usuarioService.showFornecedor(id, this.params).subscribe(usuario => this.item = usuario);
    }

}
