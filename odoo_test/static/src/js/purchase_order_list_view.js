/** @odoo-module */

import { ListController } from "@web/views/list/list_controller";
import { useService } from '@web/core/utils/hooks';
import { listView } from "@web/views/list/list_view";
import { registry } from "@web/core/registry";

odoo.define('purchase_approval', function (require) {
    "use strict";

    var ListView = require('web.ListView');
    var ActionManager = require('web.ActionManager');

    var PurchaseOrderListView = ListView.extend({
        events: {
            'click .oe_button_all_approve': '_onClickApproveAll',
        },
        
        _onClickApproveAll: function () {
            var self = this;
            var ids = this.$el.find('input[name="id"]:checked').map(function () {
                return $(this).val();
            }).get();
            self._rpc({
                model: 'purchase.order',
                method: 'action_approve_all',
                args: [ids],
            }).then(function () {
                self.reload();
            });
        },
    });

    ActionManager.include({
        _executeAction: function (action) {
            if (action.type === 'ir.actions.act_window') {
                if (action.res_model === 'purchase.order') {
                    return new PurchaseOrderListView(action);
                }
            }
            return this._super(action);
        }
    });
});
