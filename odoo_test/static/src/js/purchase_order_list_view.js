/** @odoo-module */

import { ListController } from '@web/views/list/list_controller';
import { useService } from '@web/core/utils/hooks';
import { registry } from '@web/core/registry';
import { ActionManager } from 'web.ActionManager';

const PurchaseOrderListController = ListController.extend({
    events: {
        'click .oe_button_all_approve': '_onClickApproveAll',
    },

    _onClickApproveAll: function () {
        var self = this;
        var ids = this.$el.find('input[name="id"]:checked').map(function () {
            return $(this).val();
        }).get();

        if (ids.length > 0) {
            self._rpc({
                model: 'purchase.order',
                method: 'action_approve_all',
                args: [ids],
            }).then(function () {
                self.reload();
            });
        } else {
            alert("Please select at least one order to approve.");
        }
    },
});

registry.category('views').add('purchase_order_list', PurchaseOrderListController);

ActionManager.include({
    _executeAction: function (action) {
        if (action.type === 'ir.actions.act_window' && action.res_model === 'purchase.order') {
            return new PurchaseOrderListController(action);
        }
        return this._super(action);
    }
});
