import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {CreateUpdateAbstract} from "../../core/abstract/create-update.abstract";
import {ConfiguracoesService} from "./configuracoes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {PatternHelper} from "../../core/services/parrtern.service";
import {AlertService} from "../../core/services/alert.service.com";

@Component({
    selector: 'app-configuracoes',
    templateUrl: './configuracoes.component.html',
    styleUrls: ['./configuracoes.component.css'],
    providers: [
        ConfiguracoesService
    ]
})
export class ConfiguracoesComponent extends CreateUpdateAbstract implements OnInit {

    private configuracoes;

    icon = 'zmdi zmdi-account';

    constructor(private configuracoesService: ConfiguracoesService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, configuracoesService);
    }

    ngOnInit() {
        super.form({
            'titulo': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'url_site': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'telefone': [null, Validators.compose([Validators.required])],
            'horario_atendimento': [null, Validators.compose([Validators.required])],
            'endereco': [null, Validators.compose([Validators.required])],
            'rodape': [null, Validators.compose([Validators.required])],
            'facebook': [null, Validators.compose([Validators.pattern(PatternHelper.facebook())])],
            'twitter': [null, Validators.compose([Validators.pattern(PatternHelper.facebook())])],
            'google_plus': [null, Validators.compose([Validators.pattern(PatternHelper.googleplus())])],
            'youtube': [null, Validators.compose([Validators.pattern(PatternHelper.youtube())])],
            'instagram': [null],
            'palavra_chave': [null],
            'descricao_site': [null],
            'og_tipo_app': [null],
            'og_titulo_site': [null],
            'od_url_site': [null],
            'od_autor_site': [null],
            'facebook_id': [null],
            'token': [null],
            'analytcs_code': [null],
        });
        this.configuracoesService.view().subscribe(configuracoes => {
            this.saveForm.patchValue(configuracoes);
            this.configuracoes = configuracoes;
        });
    }

    update(data, id = null) {
        if (!this.saveForm.invalid) {
            this.configuracoesService.update(data, id).subscribe(res => {
                AlertService.seccessTime(
                    'Registro Salvo!',
                    'You clicked the button!');
            }, erro => {
            });
        }
    }


}
