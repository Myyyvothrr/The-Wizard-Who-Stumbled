ig.module
(
	'game.entities.speed-parchment'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySpeedParchment = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/speed-parchment.png', 16, 16),
		size: { x: 12, y: 12 },
		offset: { x: 2, y: 2 },
		friction: { x: 20, y: 20 },
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		zIndex: 3,

		_pickup_sound: new ig.Sound('media/paper.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		kill: function()
		{
			if (is_on_screen(this.pos))
				this._pickup_sound.play();

			this.parent();
		}
	});
});