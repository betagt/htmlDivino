import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AnunciosService} from "../../service/anuncios.service";
import {MenuItem} from "primeng/primeng";
import {GeoService} from "../../../localidades/service/geo.service";
import {AlertService} from "../../../../core/services/alert.service.com";
import {AuthService} from "../../../../core/services/auth.service";

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

@Component({
    selector: 'app-anuncio-form',
    templateUrl: './anuncio-form.component.html',
    styleUrls: ['./anuncio-form.component.css'],
    providers: [
        AlertService,
        AuthService
    ],
    styles: [`
        .ui-widget-header .ui-state-default, .ui-widget-content .ui-state-default, .ui-state-default {
            border: 1px solid #d6d6d6;
            background: #ffffff;
            color: #555555;
        }

        .tipo-height {
            height: 271px;
        }

        .bg_empreendimento {
            background: url(../../../../assets/img/empreendimento_bg.jpg);
        }

        .bg_imovel {
            background: url(../../../../assets/img/imovel_bg.jpg);
        }

        .pt-inner .pti-header .ptih-title {
            background-color: rgba(0, 0, 0, .6);
        }

        .ui-chkbox .ui-chkbox-box {
            width: 20px;
            height: 20px;
            line-height: 17px;
            border-radius: 2px;
            text-align: center;
        }

        .ui-chkbox .ui-chkbox-box .ui-chkbox-icon {
            font-size: 18px;
        }

        div.ui-dropdown, div.ui-dropdown-trigger {
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .ui-selectbutton {
            display: flex;
            width: 100%;
        }

        .ui-buttonset .ui-button {
            width: 100%;
        }

        .ui-dropdown-panel .ui-dropdown-filter-container {
            width: 100%;
        }

        .sebm-google-map-container {
            width: 100%;
            height: 300px;
        }

        .search-form {
            display: flex;
            justify-content: center;
        }

        .search-form .input-search {
            width: 79%;
            float: left;
            margin-right: 5px;
        }

        .search-form button {
            width: 20%;
        }
    `]
})
export class AnuncioFormComponent extends CreateUpdateAbstract implements OnInit {

    anuncio;

    private steps: MenuItem[];

    activeIndex = 0;

    imovel = true;

    empreendimento = false;

    lat: number = 0;

    lng: number = 7.809007;

    searchlocation = {
        endereco: null
    };

    local;

    markers: Marker[] = [];
    imgs = [];

    listRecycled: any[] = [];

    tempId;

    anuncioForm;

    numberMask;

    constructor(formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router,
                private authService: AuthService,
                private anuncioService: AnunciosService,
                private alertService: AlertService,
                private geoService: GeoService) {
        super(formBuilder, ref, location, activatedRoute, router, anuncioService, ['/anuncios']);
    }

    ngOnInit() {
        this.buttons.save = true;
        super.form({
            'plano_id': [null, Validators.compose([Validators.required])],
            'anuncio_id': [null, Validators.compose([Validators.required])],
            'user_id': [null, Validators.compose([Validators.required])],
            'total': [null, Validators.compose([Validators.required])],
            'desconto': [null, Validators.compose([Validators.required])],
            'numero_fatura': [null],
            'pagina_user': [null],
        });
        this.steps = [
            {label: 'Selecione o tipo do imovel'},
            {label: 'Dados do anúncio'},
            {label: 'Selecione no Mapa'},
            {label: 'Cadastrar imagens'}
        ];
        if (this.routeParams.id) {
            this.anuncioService.show(this.routeParams.id).subscribe(res => {
                this.anuncio = res;
                this.lat = Number(this.anuncio.latitude);
                this.lng = Number(this.anuncio.longitude);
                this.tempId = res.id;
                this.imgs = this.anuncio.imagens.data;
                this.addMarker(this.lat, this.lng, this.searchlocation.endereco);
                if (res.tipo == 'imovel') {
                    this.imovel = true;
                    this.empreendimento = false;
                } else {
                    this.imovel = false;
                    this.empreendimento = true;
                }
            });
        }

    }

    imovelAtivar() {
        this.imovel = true;
        this.empreendimento = false;
    }

    empreendimentoAtivar() {
        this.imovel = false;

        this.empreendimento = true;
    }

    localizacao(ev) {
        this.local = ev;
    }

    searchLocation() {
        this.geoService.geo(
            this.local.cidade.label,
            this.searchlocation.endereco,
            this.local.estado.label).subscribe(res => {
            this.lat = res.lat;
            this.lng = res.long;
            this.setLatLng(this.lat, this.lng);
            this.addMarker(this.lat, this.lng, this.searchlocation.endereco);
            AlertService.infomessage(
                'Observação!',
                `para selecionar o ponto mais precisamente 
                    click duas vezes no mapa no ponto onde está o imóvel`);
        });
    }

    actionImovelSave(ev) {
        this.anuncioForm = ev;
        this.activeIndex = 2;
        this.searchlocation.endereco = this.anuncioForm.endereco.endereco;
    }

    clickedMarker(label: string, index: number) {
        //console.log(`clicked the marker: ${label || index}`)
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        //console.log('dragEnd', m, $event);
        this.setLatLng(m.lat, m.lng);
    }

    mapClicked(ev) {
        this.setLatLng(ev.coords.lat, ev.coords.lng);
        this.addMarker(ev.coords.lat, ev.coords.lng, this.searchlocation.endereco);
    }

    addMarker(lat: number, lng: number, label, draggable = true) {
        this.markers = [
            {
                lat: lat,
                lng: lng,
                label: label,
                draggable: draggable
            }
        ];
    }

    salvarImovel() {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Todos os dados foram cadastrados corretamente?',
            confirmButtonText: (this.routeParams.id) ? 'Sim, atualizar' : 'Sim, salvar',
            cancelButtonText: 'Não, Voltar e revisar',
        }).then(sucess => {
            this.anuncioService
                .updateOrCreate(this.anuncioForm, this.routeParams.id)
                .subscribe(res => {
                    this.alertService.confirm({
                        title: 'Confirmação!',
                        text: 'Deseja inserir imagens?',
                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Não, Voltar a listagem',
                    }).then(sucess => {
                        this.activeIndex = 3;
                        this.tempId = res.id;
                    }, error => {
                        this.router.navigate(['/anuncios']);
                    });
                });
        }, error => {
            this.activeIndex = 1;
        });
    }

    private setLatLng(lat, lng) {
        this.anuncioForm.latitude = lat;
        this.anuncioForm.longitude = lng;
    }

    loadImage(ev) {
        console.log(ev);
    }

    onBeforeSend(ev) {
        ev.xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        ev.xhr.setRequestHeader('Authorization', 'Bearer ' + this.authService.getToken());
        return ev;
    }

    onUpload(ev) {
        const imagens = JSON.parse(ev.xhr.response);
        imagens.data.forEach(x => {
            this.imgs.push(x);
        });
        if (this.principalSelecionada()) {
            this.imgs[0].principal = true;
        }
    }

    principal(item) {
        this.imgs.forEach(x => {
            x.principal = false;
            if (item.img == x.img) {
                item.principal = true;
            }
        });
    }

    onError(ev) {
        let text = '';
        const errors = JSON.parse(ev.xhr.response);
        for (const i in errors) {
            text += `<b>${i}:</b> ${errors[i]}<br>`;
        }
        AlertService.flashMessage(text);
    }

    excluirImagem(item) {
        this.anuncioService.deleteImage(item.id).subscribe(x => {
            AlertService.flashMessage('Imagem excluida!', 'fadeInUp');
            const index = this.imgs.indexOf(item);
            if (index > -1) {
                this.imgs.splice(index, 1);
            }
        });
    }

    principalSelecionada() {
        return !this.imgs.some(_ => _.state == true);
    }


    finalizar() {
        this.anuncioService.reOrdenar({'imagem': this.imgs}).subscribe(res => {
            AlertService.flashMessage('Anuncio finalizado com sucesso', 'fadeInUp');
            this.router.navigate(['/anuncios']);
        }, error => {

        });
    }

}
