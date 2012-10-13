ig.module
(
	'game.entities.teleporter'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityTeleporter = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/teleporter.png', 16, 16),
		size: { x: 40, y: 40 },
		offset: { x: -12, y: -12 },
		checkAgainst: ig.Entity.TYPE.A,
		zIndex: 0,

		_gui_font: new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),
		_gui_img_bg: new ig.Image('media/gui/gui-bg.png'),

		_open: false,
		name: 'Teleporter',
		level: null,
		level_x: null,
		level_y: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.3, [0, 1]);
		},

		update: function()
		{
			this.parent();
			
            if (this._open)
			{
				twws_player.near_door = true;

				ig.game.messages.show_status("Teleporter " + this.name);			

				if (ig.input.pressed('fire'))
				{
					if (this.target)
					{
						for(var t in this.target)
						{
							var e = ig.game.getEntityByName(this.target[t]);
			            	ig.game.teleport_in_map(e.pos.x, e.pos.y);
			            	break;
			            }
					}
					else
						ig.game.teleport_to_map(this.level_x, this.level_y, this.level);
				}
			}

			this._open = false;
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
				this._open = true;
		},
	});
});