ig.module
(
	'game.entities.trap-wall-arrows'
)
.requires
(
	'game.global',
	'game.base-entity',
	'game.arrow'
)
.defines(function()
{
	EntityTrapWallArrows = BaseEntity.extend(
	{
		animSheet: new ig.AnimationSheet('media/trap-arrows-wall.png', 16, 16),
		size: { x: 16, y: 16 },
		offset: { x: 0, y: 0 },
		zIndex: 8,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.NONE,
		direction: DIRECTION.RIGHT,

		start: 0,
		delay: 2,
		_timer: null,

		_arrow_manager: null,

		_sound: new ig.Sound('media/sounds/arrow.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle_right', 1, [0]);
			this.addAnim('idle_down', 1, [1]);
			this.addAnim('idle_left', 1, [2]);
			this.addAnim('idle_up', 1, [3]);

			switch(this.direction)
			{
				case DIRECTION.LEFT: this.currentAnim = this.anims.idle_left; break;
				case DIRECTION.RIGHT: this.currentAnim = this.anims.idle_right; break;
				case DIRECTION.UP: this.currentAnim = this.anims.idle_up; break;
				case DIRECTION.DOWN: this.currentAnim = this.anims.idle_down; break;
			}
			
			if (ig.game.get_spells_manager)
				this._arrow_manager = ig.game.get_spells_manager(EntityArrow);

			this._timer = new ig.Timer(-this.start);
		},

		update: function()
		{
			if (this._timer.delta() > this.delay)
			{
				if (this.is_near(twws_player.pos.x, twws_player.pos.y, this.pos.x, this.pos.y, 160, 48))
					this._sound.play();

				this._arrow_manager.spawn(this.pos.x, this.pos.y, { direction: this.direction, owner: this });
				this._timer.set(0);
			}
		}
	});
});