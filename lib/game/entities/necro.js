ig.module
(
	'game.entities.necro'
)
.requires
(
	'impact.entity',
	'game.entities.zombie',
	'game.spells'
)
.defines(function()
{
	EntityNecro = EntityZombie.extend(
	{
		animSheet: new ig.AnimationSheet('media/necro.png', 16, 16),

		_ai_update_speed: 3,
		_attack_delay: 7,
		_killed_score: 100,

		_walk_speed: 7,
		_run_speed: 20,

		maxVel: { x: 110, y: 110 },
		_walk_speed: 15,
		_run_speed: 35,
		health: 10,
		_max_health: 10,

		_spawned: null,

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

		attack: function()
		{
			this._spawned = ig.game.spawnEntity(EntityZombie, (this.pos.x + this.size.x * 0.5) + (-32 + 32 * Math.random()), (this.pos.y + this.size.x * 0.5) + (-24 + 24 * Math.random()), { });
			this._emitter.emit(EntityParticleTeleported, (ig.ua.mobile ? 2 : (4 + 4 * Math.random())), this._spawned.pos.x + this._spawned.size.x * 0.5, this._spawned.pos.y + this._spawned.size.y * 0.5, { direction: this.direction });		
		},
	});
});