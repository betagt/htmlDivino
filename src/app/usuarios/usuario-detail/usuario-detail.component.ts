import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UsuariosService} from '../usuarios.service';
import {DetailAbstract} from "../../../core/abstract/detail.abstract";
import {Location} from "@angular/common";

@Component({
    selector: 'app-usuario-detail',
    templateUrl: './usuario-detail.component.html',
    styleUrls: ['./usuario-detail.component.scss']
})
export class UsuarioDetailComponent extends DetailAbstract implements OnInit {


    constructor(private usuarioService: UsuariosService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router
                ) {
        super( ref, location, activatedRoute, router, usuarioService);
    }

    ngOnInit() {
        this.params.set('include', 'roles,endereco,telefones');
        this.show(this.routeParams.id);
    }

    changeListener($event): void {
        this.sendFile($event.target);
    }

    sendFile(inputValue) {
        const id = this.routeParams.id;
        const formData = new FormData();
        const file: File = inputValue.files[0];
        formData.append('imagem', file, file.name);
        this.usuarioService.sendFile(id, formData).subscribe(res => {
            this.item.imagem = res.data.imagem;
        });
    }

}

