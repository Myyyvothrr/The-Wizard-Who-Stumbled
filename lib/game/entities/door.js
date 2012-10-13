ig.module
(
	'game.entities.door'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityDoor = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/door1.png', 16, 16),
		size: { x: 32, y: 32 },
		offset: { x: -8, y: -8 },
		checkAgainst: ig.Entity.TYPE.A,
		zIndex: 0,

		_gui_font: new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),
		_gui_img_bg: new ig.Image('media/gui/gui-bg.png'),

		_locked_sound: new ig.Sound('media/sounds/door_locked.*'),
		_open_sound: new ig.Sound('media/sounds/door_unlocked.*'),
		_enter_sound: new ig.Sound('media/sounds/door_enter.*'),

		_open: false,

		name: 'Dungeon',
		level: null,
		level_x: null,
		level_y: null,

		needs_key: null,

		_timer: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 1, [1]);

			if (this.needs_key)
				this.needs_key = { id: this.needs_key, name: 'unknown key' };

			this._timer = new ig.Timer(-5);
		},

		update: function()
		{
			this.parent();

			if (!this.needs_key)
			{
				if (this._open)
				{
					twws_player.near_door = true;

					ig.game.messages.show_status((this.leave ? "Leave " : "Enter ") + this.name);
			
					this.currentAnim = this.anims.open;

					if (ig.input.pressed('fire'))
					{
						this._enter_sound.play();
						ig.game.teleport_to_map(this.level_x, this.level_y, this.level);
					}
				}
				else
					this.currentAnim = this.anims.idle;
				
				this._open = false;
			}
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				if (this.needs_key && this._timer.delta() > 5)
				{
					if (twws_player.has_key(this.needs_key))
					{
						this._open_sound.play();
						ig.game.messages.scrolling_msg(RANDOM_QUOTES_OPENED.random().text + this.needs_key.name, MESSAGE_TYPE.NORMAL);
						this.needs_key = null;
					}
					else
					{						
						this._locked_sound.play();
						ig.game.messages.scrolling_msg(RANDOM_QUOTES_LOCKED.random().text, MESSAGE_TYPE.BAD);
					}

					this._timer.set(0);
				}
				
				if (!this.needs_key)
				{
					this._open = true;
				}
			}
		},
	});
});