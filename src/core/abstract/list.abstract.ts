import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';
import {Observable} from "rxjs";
import {AlertService} from "../services/alert.service.com";

@Injectable()
export abstract class ListAbstract {

    protected arr: any[];
    items?: Observable<any>;
    includes = [];
    protected _page = 1;
    protected _total: number;
    protected countSelect = 0;
    protected itemSelected = 0;
    protected _params: URLSearchParams;
    pesquisaForm: FormGroup;
    lastChecked = null;
    hasExclude = true;
    protected buttons = {
        new: false,
        view: false,
        edit: false,
        remove: false,
        restaurar: true,
        save: true,
        back: true,
    };

    constructor(private formBuilder: FormBuilder,
                private ref: ChangeDetectorRef,
                private defaultService: any) {
        this._params = new URLSearchParams();
    }

    form(form) {
        this.pesquisaForm = this.formBuilder.group(form);
    }

    list(page = null) {
        if (this.hasExclude) {
            this.buttons.restaurar = true;
            this.buttons.remove = false;
        }
        if (this.includes.length > 0) {
            this.addParams('include', this.includes.join(','));
        }

        if (page) {
            this.addParams('page', page);
        }
        this.defaultService.getList(this.params)
            .subscribe(items => {
                this.load(items);
            });
    }

    lixeira() {
        if (this.hasExclude) {
            this.buttons.restaurar = false;
            this.buttons.remove = true;
        }
        this.defaultService.lixeira().subscribe(items => {
            this.load(items);
        });
    }


    restaurar() {
        const itens = [];
        this.checkboxSelecteds().forEach(x => {
            if (x)
                itens.push(x.id);
        });
        this.defaultService.restaurar({ids: itens}, itens).subscribe(res => {
            this.list();
            AlertService.flashMessage('Aquivo restaurado com sucesso!', 'bounceIn');
        });
    }

    excluir() {
        const itens = [];
        this.checkboxSelecteds().forEach(x => {
            if (x)
                itens.push(x.id);
        });
        this.defaultService.excluir({ids: itens}, itens).subscribe(res => {
            this.list();
            AlertService.flashMessage('Aquivo excluído com sucesso!', 'bounceIn');
        });
    }

    load(items) {
        this.items = items;
        this._total = items.meta.pagination.total;
        this._page = items.meta.pagination.current_page;
        this.arr = items.data;
    }

    checkAll(ev) {
        if (!this.arr) return;
        this.arr.forEach(x => x.state = ev.target.checked);
        this.count();
    }

    ngOnChanges(e) {
        this.detectarMudancas();
    }

    protected detectarMudancas() {
        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    isAllChecked() {
        if (!this.arr) {
            return;
        }
        return this.arr.every(_ => _.state);
    }


    count() {
        return this.countSelect = this.checkboxSelecteds().length;
    }

    checkboxSelecteds() {
        return this.arr.filter(opt => {
            if (opt.state == true)
                this.itemSelected = opt.id;
            return (opt.state == true);
        });
    }

    protected addParams(key, val) {
        this._params.set(key, val);
    }

    protected removeParams(key) {
        this._params.delete(key);
    }

    get params(): URLSearchParams {
        return this._params;
    }

    alterarESeleciona(ev, rota) {
        if (!this.lastChecked) {
            this.lastChecked = rota;
            return;
        }

        if (ev.shiftKey) {
            const start: any = this.arr.filter(opt => {
                return (opt.id == this.lastChecked.id);
            });
            const end: any = this.arr.filter(opt => {
                return (opt.id == rota.id);
            });
            this.arr.forEach(x => {
                if (Math.min(start[0].id, end[0].id) < x.id && Math.max(start[0].id, end[0].id) > x.id) {
                    return x.state = !x.state;
                }
            });
        }
        this.lastChecked = rota;
    }

    orderby(field) {
        const form = this.pesquisaForm.value;
        form.field = field;
        if (form.order == 'asc') {
            form.order = 'desc';
        } else {
            form.order = 'asc';
        }
        this.pesquisar(form);
    }

    pesquisar(model) {
        if (!this.pesquisaForm.invalid) {
            const consulta = {
                'filtro': model,
                'order': model.field + ';' + model.order
            }
            this.addParams('consulta', JSON.stringify(consulta));
            this.list();
        }
    }

}
