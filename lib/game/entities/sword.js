ig.module
(
	'game.entities.sword'
)
.requires
(
	'game.base-entity'
)
.defines(function()
{
	EntitySword = BaseEntity.extend(
	{
		animSheet: new ig.AnimationSheet('media/items/swords.png', 16, 16),
		size: { x: 16, y: 16 },
		offset: { x: 0, y: 0 },
		friction: { x: 20, y: 20 },
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		zIndex: 4,

		level: 0,

		_pickup_sound: new ig.Sound('media/sounds/sword1.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [ this.level ]);
		},

		kill: function()
		{
			if (this.is_on_screen(this.pos))
				this._pickup_sound.play();
			
			this.parent();
		}
	});
});