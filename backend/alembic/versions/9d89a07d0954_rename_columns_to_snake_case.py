"""Rename columns to snake_case

Revision ID: 9d89a07d0954
Revises: 
Create Date: 2025-07-17 11:08:23.787971

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9d89a07d0954'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # --- slabs table ---
    op.alter_column("slabs", "Material", new_column_name="material")
    op.alter_column("slabs", "Name", new_column_name="name")
    op.alter_column("slabs", "scColor", new_column_name="sc_color")
    
    # --- slab_details table ---
    op.alter_column("slab_details", "InventoryID", new_column_name="inventory_id")
    op.alter_column("slab_details", "Length_Actual", new_column_name="length_actual")
    op.alter_column("slab_details", "Width_Actual", new_column_name="width_actual")
    op.alter_column("slab_details", "UsableArea", new_column_name="usable_area")
    op.alter_column("slab_details", "Lot", new_column_name="lot")
    op.alter_column("slab_details", "Name", new_column_name="name")
    op.alter_column("slab_details", "Origin", new_column_name="origin")
    op.alter_column("slab_details", "Material", new_column_name="material")
    op.alter_column("slab_details", "Thickness_Nominal", new_column_name="thickness_nominal")
    op.alter_column("slab_details", "Finish", new_column_name="finish")
    op.alter_column("slab_details", "scColor", new_column_name="sc_color")

def downgrade():
    # --- slabs table ---
    op.alter_column("slabs", "material", new_column_name="Material")
    op.alter_column("slabs", "name", new_column_name="Name")
    op.alter_column("slabs", "sc_color", new_column_name="scColor")

    # --- slab_details table ---
    op.alter_column("slab_details", "inventory_id", new_column_name="InventoryID")
    op.alter_column("slab_details", "length_actual", new_column_name="Length_Actual")
    op.alter_column("slab_details", "width_actual", new_column_name="Width_Actual")
    op.alter_column("slab_details", "usable_area", new_column_name="UsableArea")
    op.alter_column("slab_details", "lot", new_column_name="Lot")
    op.alter_column("slab_details", "name", new_column_name="Name")
    op.alter_column("slab_details", "origin", new_column_name="Origin")
    op.alter_column("slab_details", "material", new_column_name="Material")
    op.alter_column("slab_details", "thickness_nominal", new_column_name="Thickness_Nominal")
    op.alter_column("slab_details", "finish", new_column_name="Finish")
    op.alter_column("slab_details", "sc_color", new_column_name="scColor")
