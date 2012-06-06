ig.module
(
	'game.entities.health-potion'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityHealthPotion = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/health-potion.png', 16, 16),
		size: { x: 12, y: 12 },
		offset: { x: 2, y: 2 },
		friction: { x: 100, y: 100 },
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		zIndex: 6,

		_pickup_sound: new ig.Sound('media/potion.*'),
		
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