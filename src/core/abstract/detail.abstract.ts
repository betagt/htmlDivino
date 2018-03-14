
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ChangeDetectorRef} from "@angular/core";
import {URLSearchParams} from "@angular/http";

export abstract class DetailAbstract {

    routeParams: any;
    params: URLSearchParams;
    item:any;
    protected buttons = {
        new: true,
        view: true,
        edit: false,
        remove: true,
        restaurar: true,
        save: true,
        back: false,
        custom: true,
    };
    constructor(private ref: ChangeDetectorRef,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                protected router: Router,
                private defaultService: any) {
        this.routeParams = this.activatedRoute.snapshot.params;
        this.params = new URLSearchParams();
    }

    show(id: number) {
        this.defaultService.show(id, this.params).subscribe(usuario => this.item = usuario);
    }

    ngOnChanges(e) {
        this.ref.markForCheck();
    }
}
