"use strict";
var router_1 = require('@angular/router');
var static_component_1 = require('./static.component');
var home_component_1 = require('./home/home.component');
var STAIC_ROUTES = [
    {
        path: 'dashboard', component: static_component_1.StaticComponent, children: [
            { path: 'home', component: home_component_1.HomeComponent },
        ]
    },
];
exports.StaticRouting = router_1.RouterModule.forChild(STAIC_ROUTES);
