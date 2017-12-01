import { Component } from '@angular/core';
var SELECTOR = 'card';
var CardComponent = (function () {
    function CardComponent() {
    }
    CardComponent.decorators = [
        { type: Component, args: [{
                    selector: SELECTOR,
                    template: "\n    <header><ng-content select=\"[header]\"></ng-content></header>\n    <section><ng-content select=\"[body]\"></ng-content></section>\n    <footer><ng-content select=\"[footer]\"></ng-content></footer>\n  ",
                    styles: ["\n    :host{display:block;width:100%}:host:not(.borderless){border:1px solid silver}:host:not(.header)>header,:host:not(.footer)>footer{display:none}:host.header.footer>/deep/ section{min-height:140px}:host.header:not(.footer)>/deep/ section,:host:not(.header).footer>section{min-height:205px}:host:not(.header):not(.footer)>section{min-height:270px}:host.action{margin-top:.5848rem;margin-bottom:.5848rem}:host.action /deep/ [body]{min-height:270px !important;max-height:280px;overflow-y:auto}:host.action /deep/ [header]>:first-child.repeater,:host.action /deep/ [body]>:first-child.repeater,:host.action /deep/ [footer]>:first-child.repeater{margin-top:.5848rem !important}:host.action /deep/ [header]>:not(:last-child).repeater,:host.action /deep/ [body]>:not(:last-child).repeater,:host.action /deep/ [footer]>:not(:last-child).repeater{border-bottom:1px solid silver;margin-bottom:.5848rem !important}/deep/ .card_section_padding{padding:5px 30px}:host /deep/ [header],:host /deep/ [body],:host /deep/ [footer]{min-width:100%;max-height:inherit}header,section,footer{display:flex;align-items:center;justify-content:center;padding:5px 30px}header>/deep/ [nested],section>/deep/ [nested],footer>/deep/ [nested]{margin-top:-5px;margin-bottom:-5px;min-width:calc(100% + 60px)}header>/deep/ [overlaid],section>/deep/ [overlaid],footer>/deep/ [overlaid]{margin-top:-6px;margin-bottom:-6px;min-width:calc(100% + 62px)}header{border-bottom:1px solid silver}header,footer{min-height:65px;background-color:#e0e0e0}footer{border-top:1px solid silver}section{background-color:#ffffff}\n  "]
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return []; };
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=card.component.js.map