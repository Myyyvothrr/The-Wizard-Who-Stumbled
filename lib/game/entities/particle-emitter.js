ig.module
(
	'game.entities.particle-emitter'
)
.requires
(
	'impact.entity',
	'game.particle-emitter',
	'game.entities.particle'
)
.defines(function()
{
	EntityParticleEmitter = ig.Entity.extend(
	{
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 255, 255, 0.7)',

		size: { x: 16, y: 16 },

		particles_type: null,

		particles_num: 25,
		particles_max: 100,

		_emitter: null,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this._emitter = new ParticleEmitter(this.particles_type, this.particles_max);
		},

		update: function()
		{
			this.parent();

			this._emitter.emit(this.particles_num, this.pos.x, this.pos.y);
		},
	});
});