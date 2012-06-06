ig.module
(
	'game.entities.particle-emitter'
)
.requires
(
	'impact.entity',
	'game.global'
)
.defines(function()
{
	var particles_i = 0;
	var particles_max = 100;
	var particles_array = [ ];

	EntityParticleEmitter = ig.Entity.extend(
	{
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 255, 255, 0.7)',

		size: { x: 16, y: 16 },

		direction: DIRECTION.LEFT,
		particles: 25,
		particle_type: null,

		emit: function(particle_type, particles, x, y, settings)
		{
			this.particle_type = particle_type;
			this.particles = particles;
			this.pos.x = x;
			this.pos.y = y;

			for (var i = 0; i < this.particles; i++)
			{
				ig.game.spawnEntity(this.particle_type, this.pos.x, this.pos.y, settings);
			}
		}
	});

	EntityParticle = ig.Entity.extend(
	{
		vel: { x: 0, y: 0 },
		friction: { x: 0, y: 0 },
		zIndex: 11,

		_lifetime: 0,
		_timer: null,

		angle_start: 0,
		angle_range: 360,
		lifetime: 1,
		lifetime_range: 0,
		distance: 1,
		distance_range: 0,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 0,
		accel_range: 0,
		broadness: {x: 0, y: 0 },
		broadness_range: {x: 0, y: 0 },

		destroyed: false,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},

		post_init: function()
		{
			this._lifetime = this.lifetime + this.lifetime_range * Math.random();

			var a = (this.angle_start).toRad() + (this.angle_range).toRad() * Math.random();
			var d = this.distance + this.distance_range * Math.random();
			var s = this.accel_start + this.accel_range * Math.random();
			var cosa = Math.cos(a);
			var sina = Math.sin(a);

			this.vel.x = cosa * d;
			this.vel.y = sina * d;
			this.accel.x = cosa * s;
			this.accel.y = sina * s;

			this.pos.x += this.broadness.x + this.broadness_range.x * Math.random();
			this.pos.y += this.broadness.y + this.broadness_range.y * Math.random();

			this._timer = new ig.Timer(0);
		},

		draw: function()
		{
			if (this.destroyed)
				return;

			this.parent();
		},

		update: function()
		{
			if (this.destroyed)
				return;

			this.currentAnim.alpha = this._timer.delta().map(0, this._lifetime, this.alpha_start, this.alpha_end);

			this.parent();

			if (this._timer.delta() > this._lifetime)
				this.kill();
		},

	/*	kill: function()
		{
			this.destroyed = true;
		},

		reset: function(x, y, settings)
		{
			ig.merge(this, c);
			this.destroyed = false;
			this.init(x, y, settings);
		}*/
	});

	EntityParticleBloodSplash = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/blood-particles.png', 2, 2),
		size: { x: 2, y: 2 },
		maxVel: { x: 200, y: 200 },
		collides: ig.Entity.COLLIDES.NEVER,
		zIndex: 7,
		
		direction: 0,
		angle_start: 0,
		angle_range: 50,
		lifetime: 1,
		lifetime_range: 0.2,
		distance: 20,
		distance_range: 8,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 5,
		accel_range: 2,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.angle_start = 180 - this.angle_range / 2;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.angle_start = 0 - this.angle_range / 2;
					break;
				}
				case DIRECTION.UP:
				{
					this.angle_start = 270 - this.angle_range / 2;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.angle_start = 90 - this.angle_range / 2;
					break;
				}
			}

			this.post_init();

			this.addAnim('idle', 0.2, [ Math.round(Math.random() * 16) ]);
		}
	});

	EntityParticleFireballSmoke = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/blood-particles.png', 2, 2),
		size: { x: 2, y: 2 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0.1,
		collides: ig.Entity.COLLIDES.NEVER,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.2,
		lifetime_range: 0.1,
		distance: 40,
		distance_range: 10,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 2,
		accel_range: 1,
		broadness: { x: 0, y: 0 },
		broadness_range: { x: 0, y: 0 },

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.broadness.y = -4;
					this.broadness_range.y = 8;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.broadness.y = -4;
					this.broadness_range.y = 8;
					break;
				}
				case DIRECTION.UP:
				{
					this.broadness.x = -4;
					this.broadness_range.x = 8;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.broadness.x = -4;
					this.broadness_range.x = 8;
					break;
				}
			}

			this.post_init();

			this.addAnim('idle', 0.2, [ Math.round(Math.random() * 8) + Math.round(Math.random() * 4) ] );
		}
	});

	EntityParticleToxicCloudlSmoke = EntityParticleFireballSmoke.extend(
	{
		animSheet: new ig.AnimationSheet('media/toxic-particles.png', 2, 2),
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.15,
		lifetime_range: 0.1,
		distance: 30,
		distance_range: 5,
		alpha_start: 1.2
	});

	EntityParticleImpSpellSmoke = EntityParticleFireballSmoke.extend(
	{
		animSheet: new ig.AnimationSheet('media/shield-particles.png', 2, 2),
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.1,
		lifetime_range: 0.1,
		distance: 5,
		distance_range: 2,
		alpha_start: 1,
	});

	EntityParticleMageSpellSmoke = EntityParticleFireballSmoke.extend(
	{
		animSheet: new ig.AnimationSheet('media/bomb-particles.png', 2, 2),
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.15,
		lifetime_range: 0.1,
		distance: 30,
		distance_range: 5,
		alpha_start: 1.2
	});

	EntityParticleFireballDestroyed = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/smoke-particles.png', 2, 2),
		size: { x: 2, y: 2 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0.1,
		collides: ig.Entity.COLLIDES.LITE,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.4,
		lifetime_range: 0.2,
		distance: 15,
		distance_range: 5,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 2,
		accel_range: 1,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ Math.round(Math.random() * 16) ]);
		}
	});

	EntityParticleShieldDestroyed = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/shield-particles.png', 2, 2),
		size: { x: 2, y: 2 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0.1,
		collides: ig.Entity.COLLIDES.LITE,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.4,
		lifetime_range: 0.2,
		distance: 15,
		distance_range: 5,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 2,
		accel_range: 1,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ Math.round(Math.random() * 16) ]);
		}
	});

	EntityParticleSkulls = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/skull-particles.png', 8, 8),
		size: { x: 8, y: 8 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0.1,
		zIndex: 50,
		collides: ig.Entity.COLLIDES.NEVER,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.8,
		lifetime_range: 0.2,
		distance: 15,
		distance_range: 5,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 2,
		accel_range: 1,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ 0 ]);
		}
	});

	EntityParticleHealing = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/healing-particles.png', 8, 8),
		size: { x: 8, y: 8 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0.1,
		zIndex: 50,
		collides: ig.Entity.COLLIDES.NEVER,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.8,
		lifetime_range: 0.2,
		distance: 15,
		distance_range: 5,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 2,
		accel_range: 1,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ 0 ]);
		}
	});

	EntityParticleSpeed = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/speed-particles.png', 8, 8),
		size: { x: 8, y: 8 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0.1,		
		zIndex: 3,
		collides: ig.Entity.COLLIDES.NEVER,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.5,
		lifetime_range: 0.2,
		distance: 10,
		distance_range: 5,
		alpha_start: 0.8,
		alpha_end: 0,
		accel_start: 1,
		accel_range: 1,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ 0 ]);
		}
	});

	EntityParticleBombSplitters = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/bomb-particles.png', 2, 2),
		size: { x: 2, y: 2 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.8,
		lifetime_range: 0.2,
		distance: 64,
		distance_range: 16,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 32,
		accel_range: 8,

		owner: null,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ Math.round(Math.random() * 16) ]);
		},

		check: function(other)
		{
			other.receiveDamage(1, this.owner);

			this.kill();
		}
	});

	EntityParticleTeleported = EntityParticle.extend(
	{
		animSheet: new ig.AnimationSheet('media/bomb-particles.png', 2, 2),
		size: { x: 2, y: 2 },
		maxVel: { x: 90, y: 90 },
		friction: { x: 10, y: 10 },
		bounciness: 0,
		collides: ig.Entity.COLLIDES.NEVER,

		direction: 0,
		angle_start: 0,
		angle_range: 360,
		lifetime: 0.9,
		lifetime_range: 0.2,
		distance: 32,
		distance_range: 16,
		alpha_start: 1.2,
		alpha_end: 0,
		accel_start: 16,
		accel_range: 4,

		owner: null,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.post_init();

			this.addAnim('idle', 0.2, [ Math.round(Math.random() * 16) ]);
		}
	});
});