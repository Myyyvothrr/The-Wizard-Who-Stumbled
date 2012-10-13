ig.module
(
	'game.entities.shield-parchment'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityShieldParchment = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/items/shield-parchment.png', 16, 16),
		size: { x: 12, y: 12 },
		offset: { x: 2, y: 2 },
		friction: { x: 20, y: 20 },
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		zIndex: 2,

		_pickup_sound: new ig.Sound('media/sounds/paper.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		kill: function()
		{
			if (this.is_on_screen(this.pos))
				this._pickup_sound.play();

			this.parent();
		}
	});
});