import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {DocumentoService} from "../service/documento.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertService} from "../../../../core/services/alert.service.com";

@Component({
    selector: 'app-documento-list',
    templateUrl: './documento-list.component.html',
    styleUrls: ['./documento-list.component.css']
})
export class DocumentoListComponent extends ListAbstract implements OnInit {
    imgTemp;
    display = false;

    constructor(private documentoService: DocumentoService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, documentoService);
    }

    ngOnInit(): void {
        super.form({
            'habilidades.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['dec']
        });
        this.list();
    }

    imgView() {
        this.imgTemp = this.lastChecked.arquivo;
        this.display = true;
    }

    aceitar() {
        this.documentoService.aceitar(this.lastChecked.id).subscribe(res=>{
            AlertService.sucess('sucesso!', 'documento aceito!');
            this.list(this._page);
        });
    }

    recusar() {
        this.documentoService.recusar(this.lastChecked.id).subscribe(res=>{
            AlertService.sucess('sucesso!', 'documento recusado!');
           this.list(this._page);
        });
    }
}
