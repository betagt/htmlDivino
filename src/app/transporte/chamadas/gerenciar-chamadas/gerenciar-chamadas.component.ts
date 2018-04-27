import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ChamadasService} from "../services/chamadas.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

declare var $: any;

@Component({
    selector: 'app-gerenciar-chamadas',
    templateUrl: './gerenciar-chamadas.component.html',
    styleUrls: ['./gerenciar-chamadas.component.css']
})
export class GerenciarChamadasComponent extends ListAbstract implements OnInit, OnDestroy {

    display = false;
    chamadaItem;
    vida = true;

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
            'order': ['desc']
        });
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            this.sparklineLine("stats-line", [9, 4, 6, 5, 6, 4, 5, 7, 9, 3, 6, 5], 68, 35, "#fff", "rgba(0,0,0,0)", 1.25, "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.4)", 3, "#fff", "rgba(255,255,255,0.4)");
        });
        this.list();
        IntervalObservable.create(3000)
            .takeWhile(() => this.vida) // only fires when component is alive
            .subscribe(() => {
                this.list();
            });
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
        });
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
        this.chamadasService.monitor(this.params)
            .subscribe(items => {
                this.load(items);
            });
    }

    detalheChamada() {
        this.display = true;
    }

    ngOnDestroy(){
        this.vida = false; // switches your IntervalObservable off
    }
}
