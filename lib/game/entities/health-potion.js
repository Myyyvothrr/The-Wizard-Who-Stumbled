ig.module
(
	'game.entities.health-potion'
)
.requires
(
	'game.base-entity'
)
.defines(function()
{
	EntityHealthPotion = BaseEntity.extend(
	{
		animSheet: new ig.AnimationSheet('media/items/health-potion.png', 16, 16),
		size: { x: 12, y: 12 },
		offset: { x: 2, y: 2 },
		friction: { x: 100, y: 100 },
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		zIndex: 6,

		_pickup_sound: new ig.Sound('media/sounds/potion_pickup.*'),
		
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