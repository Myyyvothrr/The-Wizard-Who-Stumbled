ig.module
(
	'game.entities.no-ai'
)
.requires
(
	'impact.entity',
	'game.global'
)
.defines(function()
{
	EntityNoAi = ig.Entity.extend(
	{
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(125, 10, 10, 0.7)',
		_wmScalable: true,
		size: { x: 16, y: 16 },
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.NONE,

		receiveDamage: function(amount, from)
		{
		},
	});
});