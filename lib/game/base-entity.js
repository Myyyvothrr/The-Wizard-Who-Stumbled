ig.module
(
	'game.base-entity'
)
.requires
(
	'impact.entity',
	'impact.game',
	'game.global'
)
.defines(function()
{
	ig.Entity.inject(
	{
		opposite_direction: function(direction)
		{
			switch(direction)
			{
				case DIRECTION.LEFT: return DIRECTION.RIGHT;
				case DIRECTION.RIGHT: return DIRECTION.LEFT;
				case DIRECTION.UP: return DIRECTION.DOWN;
				case DIRECTION.DOWN: return DIRECTION.UP;
			}
		},

		is_on_screen: function(pos)
		{
			return (pos.x > ig.game.screen.x) && (pos.x < ig.game.screen.x + ig.system.width) &&  (pos.y > ig.game.screen.y) && (pos.y < ig.game.screen.y + ig.system.height);
		},

		is_near: function(x1, y1, x2, y2, dx, dy)
		{
			return ((x1 <= x2+dx && x1 >= x2-dx) && (y1 <= y2+dy && y1 >= y2-dy));
		},
	});

	BaseEntity = ig.Entity.extend(
	{
		_ID: null,

		direction: DIRECTION.RIGHT,

		is_on_street: false,
		is_on_ice: false,
		is_in_water: false,

		can_attack: true,

		t1: 0,
		t2: 0,
		t: 0,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (!settings.dont_register)
			{
				this._ID = this.pos.x.toString() + this.pos.y.toString();

				ig.log("id: " + this._ID);

				if (ig.game.register_entity && ig.game.register_entity(this._ID, settings.recreate, settings.data))
				{
					ig.game.removeEntity(this);
					return;
				}
			}
		},

		kill: function()
		{
			this.parent();
			
			if (this._ID && ig.game.remove_entity)
			{
				ig.game.remove_entity(this._ID);
			}
		},

		update: function()
		{
			this.parent();

			this.t1 = ig.game.backgroundMaps[0].getTile(this.pos.x+4, this.pos.y+4);
			this.t2 = ig.game.backgroundMaps[0].getTile(this.pos.x+12, this.pos.y+12);
			if (this.t1 != this.t2)
				this.t = ig.game.backgroundMaps[0].getTile(this.pos.x+8, this.pos.y+8);
			else
				this.t = this.t1;

			this.is_on_street = false;
			this.is_on_ice = false;
			this.is_in_water = false;

			if (this.t == 50)
			{
				this.is_on_ice = true;
			}
			else if (this.t == 97)
			{
				this.is_in_water = true;
			}
			else if (this.t == 6 || this.t == 7 || this.t == 8 || this.t == 9 || this.t == 10 || this.t == 11 || this.t == 12 || this.t == 13 || this.t == 14 || this.t == 15)
			{
				this.is_on_street = true;
			}
		},
	});
});