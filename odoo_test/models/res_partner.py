# Copyright 2023 Etech
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import models, fields


class ResPartner(models.Model):

    _inherit = "res.partner"

    no_need_approval = fields.Boolean()
