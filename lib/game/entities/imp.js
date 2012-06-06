ig.module
(
	'game.entities.imp'
)
.requires
(
	'impact.entity',
	'game.entities.zombie',
	'game.spells'
)
.defines(function()
{
	EntityImp = EntityZombie.extend(
	{
		animSheet: new ig.AnimationSheet('media/imp.png', 8, 8),
		health: 1,
		_max_health: 1,
		size: { x: 8, y: 8 },
		offset: { x: 0, y: 0 },
		maxVel: { x: 200, y: 200 },
		_walk_speed: 30,
		_run_speed: 60,
		_killed_score: 5,

		_spell_type: EntitySpell_ImpSpell,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('right_idle', 1, [0]);
			this.addAnim('right_walk', 0.3, [0, 1]);
			this.addAnim('left_idle', 1, [4]);
			this.addAnim('left_walk', 0.3, [4, 5]);			
			this.addAnim('up_idle', 1, [6]);
			this.addAnim('up_walk', 0.3, [6, 7]);
			this.addAnim('down_idle', 1, [2]);
			this.addAnim('down_walk', 0.3, [2, 3]);
		},

		update_anims: function()
		{
			// only one state
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				this.receiveDamage(10, other);
			}
			else
			{
				this.parent(other);
			}
		},			
	});
});