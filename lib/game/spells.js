ig.module
(
	'game.spells'
)
.requires
(
	'impact.entity',
	'game.global',
	'game.entities.particle-emitter'
)
.defines(function()
{	
	EntitySpell_Fireball = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/fireball.png', 16, 16),
		size: { x: 10, y: 10 },
		offset: { x: 3, y: 3 },
		maxVel: { x: 700, y: 700 },
		vel: { x: 0, y: 0 },
		accel: { x: 0, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.ACTIVE,
		zIndex: 10,
		health: 1,

		owner: null,

		particle_type: EntityParticleFireballSmoke,

		direction: DIRECTION.LEFT,
		_start_speed: 200,
		_accel_add: 85,
		_emitter: new EntityParticleEmitter(),
		_timer: null,
		_lifetime: 4,
		_kill: false,

		_start_sound: new ig.Sound('media/fire_start.*'),
		_flying_sound: new ig.Sound('media/fire_flying.*'),
		_end_sound: new ig.Sound('media/fire_end.*'),

		x: 0,
		y: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('fly', 0.2, [ 0, 1, 2, 3, 4, 5 ]);

			this._timer = new ig.Timer(0);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.vel.x = -this._start_speed;
					this.accel.x = -this._accel_add;
					this.pos.x -= 16;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.vel.x = this._start_speed;
					this.accel.x = this._accel_add;
					this.pos.x += 16;
					break;
				}
				case DIRECTION.UP:
				{
					this.vel.y = -this._start_speed;
					this.accel.y = -this._accel_add;
					this.pos.y -= 16;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.vel.y = this._start_speed;
					this.accel.y = this._accel_add;
					this.pos.y += 16;
					break;
				}
			}
			
			this.currentAnim = this.anims.fly;

//			this._start_sound.play();
		},

		update: function()
		{
			this.parent();

			if (this._timer.delta() < 0.05)
				return;

			this.x = this.pos.x;
			this.y = this.pos.y;

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.x += 12;
					this.y += 4;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.x -= 4;
					this.y += 4;
					break;
				}
				case DIRECTION.UP:
				{
					this.x += 4;
					this.y += 12;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.x += 4;
					this.y -= 4;
					break;
				}
			}

			this._emitter.emit(this.particle_type, (ig.ua.mobile ? 1 : (5 + 5 * Math.random())), this.x, this.y, { direction: this.direction });

			if (this._timer.delta() > this._lifetime)
				this.kill();

			if (this._kill)
				this.kill();

			this._flying_sound.play();
		},
		
		check: function(other)
		{
			other.receiveDamage(1, this);

			this._kill = true;
		},
		
		handleMovementTrace: function(res)
		{
			this.parent(res);

			if (res.collision.x || res.collision.y)
			{
				this.kill();

			/*	if (this.owner instanceof EntityPlayer)
					twws_stats.score -= 1;*/
			}
		},

		kill: function()
		{
			this._end_sound.play();

			this._emitter.emit(EntityParticleFireballDestroyed, (ig.ua.mobile ? 1 : (10 + 5 * Math.random())), this.pos.x + 5, this.pos.y + 5);

			this.parent();
		}
	});
	
	EntitySpell_ToxicCloud = EntitySpell_Fireball.extend(
	{
		animSheet: new ig.AnimationSheet('media/toxic-cloud.png', 16, 16),
		checkAgainst: ig.Entity.TYPE.BOTH,
		particle_type: EntityParticleToxicCloudlSmoke
	});

	EntitySpell_ImpSpell = EntitySpell_ToxicCloud.extend(
	{
		animSheet: new ig.AnimationSheet('media/impspell.png', 16, 16),
		particle_type: EntityParticleImpSpellSmoke,
	});

	EntitySpell_MageSpell = EntitySpell_ToxicCloud.extend(
	{
		animSheet: new ig.AnimationSheet('media/mage-spell.png', 16, 16),
		particle_type: EntityParticleMageSpellSmoke,
	});

	EntitySpell_Shield = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/shield.png', 16, 16),
		size: { x: 16, y: 16 },
		offset: { x: 0, y: 0 },
		maxVel: { x: 0, y: 0 },
		vel: { x: 0, y: 0 },
		accel: { x: 0, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,
		zIndex: 10,

		health: 3,

		owner: null,

		particle_type: EntityParticleFireballSmoke,

		direction: DIRECTION.LEFT,
		_emitter: new EntityParticleEmitter(),
		_timer: null,
		_lifetime: 15,
		_kill: false,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle_right', 0.2, [ 0, 1 ]);
			this.addAnim('idle_up', 0.2, [ 2, 3 ]);
			this.addAnim('idle_left', 0.2, [ 4, 5 ]);
			this.addAnim('idle_down', 0.2, [ 6, 7 ]);

			this._timer = new ig.Timer(0);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.currentAnim = this.anims.idle_left;
					this.pos.x -= 16;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.currentAnim = this.anims.idle_right;
					this.pos.x += 16;
					break;
				}
				case DIRECTION.UP:
				{
					this.currentAnim = this.anims.idle_up;
					this.pos.y -= 16;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.currentAnim = this.anims.idle_down;
					this.pos.y += 16;
					break;
				}
			}
		},

		update: function()
		{
			this.parent();

			if (this._timer.delta() < 0.05)
				return;

			if (this._timer.delta() > this._lifetime)
				this.kill();

			if (this._kill)
				this.kill();
		},

		kill: function()
		{
			this._emitter.emit(EntityParticleShieldDestroyed, (ig.ua.mobile ? 1 : (10 + 5 * Math.random())), this.pos.x + 5, this.pos.y + 5);

			this.parent();
		}
	});

	EntitySpell_Bomb = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/bomb.png', 16, 16),
		size: { x: 10, y: 10 },
		offset: { x: 3, y: 3 },
		maxVel: { x: 100, y: 100 },
		vel: { x: 0, y: 0 },
		accel: { x: 0, y: 0},
		friction: { x: 60, y: 60 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		zIndex: 10,
		health: 1,
		bounciness: 0.25,

		owner: null,

		direction: DIRECTION.LEFT,
		_emitter: new EntityParticleEmitter(),
		_start_speed: 100,
		_accel_add: 0,
		_timer: null,
		_lifetime: 3,
		_kill: false,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('fly', 0.2, [ 0, 1 ]);
			this.addAnim('explode', 0.4, [ 2 ]);

			this._timer = new ig.Timer(0);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.vel.x = -this._start_speed;
					this.accel.x = -this._accel_add;
					this.pos.x -= 16;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.vel.x = this._start_speed;
					this.accel.x = this._accel_add;
					this.pos.x += 16;
					break;
				}
				case DIRECTION.UP:
				{
					this.vel.y = -this._start_speed;
					this.accel.y = -this._accel_add;
					this.pos.y -= 16;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.vel.y = this._start_speed;
					this.accel.y = this._accel_add;
					this.pos.y += 16;
					break;
				}
			}
			
			this.currentAnim = this.anims.fly;
		},

		update: function()
		{
			this.parent();

			if (this._timer.delta() < 0.05)
				return;

			if (this._timer.delta() > this._lifetime && !this._kill)
			{
				this._emitter.emit(EntityParticleBombSplitters, 100 + 20 * Math.random(), this.pos.x + 5, this.pos.y + 5, { owner: this.owner });

				this.currentAnim = this.anims.explode;

				this._kill = true;
			}

			if (this._kill && this._timer.delta() > this._lifetime + 0.4)
				this.kill();
		}
	});
});