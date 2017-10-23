import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {AnunciosService} from "../../service/anuncios.service";
import {AlertService} from "../../../../core/services/alert.service.com";
import {UsuariosService} from "../../../usuarios/usuarios.service";

@Component({
    selector: 'app-anuncio-list',
    templateUrl: './anuncio-list.component.html',
    styleUrls: ['./anuncio-list.component.css'],
    styles: [
            `
            .zmdi {
                line-height: 100%;
                vertical-align: top;
                font-size: 18px;
                width: 28px;
            }
        `
    ]
})
export class AnuncioListComponent extends ListAbstract implements OnInit {

    usuarios;

    constructor(formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                private anuncioService: AnunciosService,
                private usuarioService: UsuariosService,
                private alertService: AlertService) {
        super(formBuilder, ref, anuncioService);
    }

    ngOnInit(): void {
        super.form({
            'anuncios.id': [null],
            'anuncios.user_id': [null],
            'field': ['id'],
            'order': ['dec']
        });
        this.list();
    }

    suspender(item) {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja realmente ativar/suspender este anuncio? <br> Obs. o anuncio será ativo/suspenso em alguns instantes.',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim',
        }).then(sucess => {
            this.anuncioService.suspender(item.id).subscribe(response => {
                AlertService.flashMessage(item.status ? 'Anuncio Inativo!' : 'Anuncio Ativo!');
                this.list();
            }, erro => {
                AlertService.error('Ops!', 'Erro ao suspender tente novamente mais tarde.');
            });
        }, error => {

        });
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
        this.pesquisaForm.controls['anuncios.user_id'].setValue(selectedItem.id);
    }

}
