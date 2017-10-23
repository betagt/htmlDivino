"use strict";
var router_1 = require('@angular/router');
var usuario_list_component_1 = require('./usuario-list/usuario-list.component');
var usuario_form_component_1 = require('./usuario-form/usuario-form.component');
var usuario_detail_component_1 = require('./usuario-detail/usuario-detail.component');
var template_component_1 = require('../shared/template/template.component');
var USUARIOS_ROUTES = [
    {
        path: '',
        component: template_component_1.TemplateComponent,
        children: [
            { path: '', component: usuario_list_component_1.UsuarioListComponent },
            { path: 'new', component: usuario_form_component_1.UsuarioFormComponent },
            { path: ':id/edit', component: usuario_form_component_1.UsuarioFormComponent },
            { path: ':id', component: usuario_detail_component_1.UsuarioDetailComponent },
        ]
    },
];
exports.UsuariosRouting = router_1.RouterModule.forChild(USUARIOS_ROUTES);
