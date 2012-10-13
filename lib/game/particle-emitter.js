ig.module
(
	'game.particle-emitter'
)
.requires
(
	'impact.entity',
	'game.entities.particle'
)
.defines(function()
{
	ParticleEmitter = ig.Class.extend(
	{
		_type: null,
		_max: 100,
		_particles: [ ],

		init: function(type, max)
		{
			this._type = type;
			this._max = max;
			this._particles.length = this._max;
		},

		emit: function(num, x, y, settings)
		{
			for (var i = 0; i < num; ++i)
			{
				for (var p = 0; p < this._max; ++p)
				{
					if (!this._particles[p])
					{
						this._particles[p] = ig.game.spawnEntity(this._type, x, y, settings);
						break;
					}
					else if (this._particles[p].destroyed)
					{
						this._particles[p].reset(x, y, settings);
						break;
					}
				}
				//TODO: kein Platz mehr...
				//ig.game.spawnEntity(this.particle_type, x, y, settings);
			}
		}
	});
});