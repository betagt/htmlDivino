"use strict";
var router_1 = require('@angular/router');
var rota_acesso_list_component_1 = require('./rota-acesso-list/rota-acesso-list.component');
var template_component_1 = require('../shared/template/template.component.ts');
var ROTA_ACESSO_ROUTES = [
    {
        path: '',
        component: template_component_1.TemplateComponent,
        children: [
            { path: '', component: rota_acesso_list_component_1.RotaAcessoListComponent },
        ]
    },
];
exports.RotaAcessoRouting = router_1.RouterModule.forChild(ROTA_ACESSO_ROUTES);
