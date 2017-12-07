import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {UsuariosService} from "../../../usuarios/usuarios.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ChamadasService} from "../../chamadas/services/chamadas.service";

declare var $: any;

@Component({
    selector: 'app-frag-list',
    templateUrl: './frag-list.component.html',
    styleUrls: ['./frag-list.component.css'],
    providers: [
        ChamadasService
    ]
})
export class FragListComponent extends ListAbstract implements OnInit {

    @Input('idMotorista') idMotorista: any;

    constructor(private chamadasService: ChamadasService,
                formBuilder: FormBuilder,
                private ngZone: NgZone,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, chamadasService);
    }

    ngOnInit(): void {
        super.form({
            'habilidades.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['dec']
        });
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            this.sparklineLine("stats-line", [9, 4, 6, 5, 6, 4, 5, 7, 9, 3, 6, 5], 68, 35, "#fff", "rgba(0,0,0,0)", 1.25, "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", 3, "#fff", "rgba(255,255,255,0.4)");
        });
        this.list();
    }

    sparklineLine(id, values, width, height, lineColor, fillColor, lineWidth, maxSpotColor, minSpotColor, spotColor, spotRadius, hSpotColor, hLineColor) {
        $("." + id).sparkline(values, {
            type: "line",
            width: width,
            height: height,
            lineColor: lineColor,
            fillColor: fillColor,
            lineWidth: lineWidth,
            maxSpotColor: maxSpotColor,
            minSpotColor: minSpotColor,
            spotColor: spotColor,
            spotRadius: spotRadius,
            highlightSpotColor: hSpotColor,
            highlightLineColor: hLineColor
        })
    }

    list(page = null) {
        this.buttons.restaurar = true;
        this.buttons.remove = false;
        if (this.includes.length > 0) {
            this.addParams('include', this.includes.join(','));
        }

        if (page) {
            this.addParams('page', page);
        }
        this.chamadasService.listarByUserAgencia(this.idMotorista, this.params)
            .subscribe(items => {
                this.load(items);
            });
    }

}