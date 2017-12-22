import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UsuariosService} from "../../../usuarios/usuarios.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {Location} from "@angular/common";

@Component({
    selector: 'app-controle-fornecedores-detail',
    templateUrl: './controle-fornecedores-detail.component.html',
    styleUrls: ['./controle-fornecedores-detail.component.css'],
    encapsulation: ViewEncapsulation.None
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

        this.item = {nota_fornecedor:0};
    }

    ngOnInit() {

        this.buttons.edit = true;
        this.params.set('include', 'roles,endereco,telefones,documentos,documentos.arquivos,veiculo_ativo.documentos');
        this.show(this.routeParams.id);
    }

    loadArquivos(arquivos) {
        window.open(arquivos.data[0].img);

        //this.display = true;
        //this.arquivos = arquivos;
    }

    show(id: number) {
        this.usuarioService.showFornecedor(id, this.params).subscribe(usuario => {
            this.item = usuario;
        });
    }

}
