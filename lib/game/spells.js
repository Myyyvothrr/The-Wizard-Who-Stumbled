ig.module
(
	'game.spells'
)
.requires
(
	'impact.entity',
	'game.global',
	'game.particle-emitter',
	'game.entities.particle-emitter'
)
.defines(function()
{	
	EntitySpell_Base = ig.Entity.extend(
	{
		destroyed: false,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
			
			this.vel.x = 0;
			this.vel.y = 0;
			this.accel.x = 0;
			this.accel.y = 0;
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

			this.parent();
		},

		check: function(other)
		{
			if (this.destroyed)
				return;

			this.parent(other);
		},
		
		handleMovementTrace: function(res)
		{
			if (this.destroyed)
				return;

			this.parent(res);
		},

		kill: function()
		{
			this.destroyed = true;
			this.type = ig.Entity.TYPE.NONE;
			this.collides = ig.Entity.COLLIDES.NEVER;
			checkAgainst = ig.Entity.TYPE.NONE;
		},

		reset: function(x, y, settings)
		{
			this.destroyed = false;
			this.init(x, y, settings);
		},
	});
	
	EntitySpell_Fireball = EntitySpell_Base.extend(
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
		_emitter: null,
		_timer: null,
		_lifetime: 4,
		_kill: false,

		_start_sound: new ig.Sound('media/sounds/fireball_start.*'),
//		_flying_sound: new ig.Sound('media/fire_flying.*'),
//		_end_sound: new ig.Sound('media/fire_end.*'),

		x: 0,
		y: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.type = ig.Entity.TYPE.B;
			this.collides = ig.Entity.COLLIDES.ACTIVE;
			this.checkAgainst = ig.Entity.TYPE.B;
			this._lifetime = 4;
			this.health = 1;
			this.x = 0;
			this.y = 0;
			this._kill = false;
			this.owner = null;
			
			this._emitter = ig.game.get_particle_emitter(this.particle_type);

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
			
			if (this.is_on_screen(this.pos))
				this._start_sound.play();
		},

		update: function()
		{
			if (this.destroyed)
				return;

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

			this._emitter.emit((ig.ua.mobile ? 1 : (1 + 2 * Math.random())), this.x, this.y, { direction: this.direction });

			if (this._timer.delta() > this._lifetime)
				this.kill();

			if (this._kill)
				this.kill();

//			this._flying_sound.play();
		},
		
		check: function(other)
		{
			if (this.destroyed)
				return;
			
			if (other instanceof EntityNoAi)
			{
			}
			else
			{
				other.receiveDamage(1, this);

				this._kill = true;
			}
		},
		
		handleMovementTrace: function(res)
		{
			if (this.destroyed)
				return;

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
			if (this.destroyed)
				return;

//			this._end_sound.play();

			this._emitter.emit((ig.ua.mobile ? 1 : (2 + 2 * Math.random())), this.pos.x + 5, this.pos.y + 5);

			this.parent();
		}
	});
	
	EntitySpell_ToxicCloud = EntitySpell_Fireball.extend(
	{
		animSheet: new ig.AnimationSheet('media/toxic-cloud.png', 16, 16),
		checkAgainst: ig.Entity.TYPE.BOTH,
		particle_type: EntityParticleToxicCloudlSmoke,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
			this.checkAgainst = ig.Entity.TYPE.BOTH;
		}
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

	EntitySpell_Shield = EntitySpell_Base.extend(
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
		_emitter: null,
		_timer: null,
		_lifetime: 15,
		_kill: false,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.type = ig.Entity.TYPE.B;
			this.collides = ig.Entity.COLLIDES.FIXED;
			this.checkAgainst = ig.Entity.TYPE.B;
			this._lifetime = 15;
			this.health = 3;
			this.owner = null;
			this._kill = false;

			this._emitter = ig.game.get_particle_emitter(this.particle_type);

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
			if (this.destroyed)
				return;

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
			if (this.destroyed)
				return;

			this._emitter.emit((ig.ua.mobile ? 1 : (2 + 2 * Math.random())), this.pos.x + 5, this.pos.y + 5);

			this.parent();
		}
	});

	EntitySpell_Bomb = EntitySpell_Base.extend(
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

		particle_type: EntityParticleBombSplitters,

		direction: DIRECTION.LEFT,
		_emitter: null,
		_start_speed: 100,
		_accel_add: 0,
		_timer: null,
		_lifetime: 3,
		_kill: false,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.type = ig.Entity.TYPE.B;
			this.collides = ig.Entity.COLLIDES.PASSIVE;
			this.checkAgainst = ig.Entity.TYPE.B;
			this._lifetime = 3;
			this.health = 1;
			this.owner = null;
			this._kill = false;

			this._emitter = ig.game.get_particle_emitter(this.particle_type);

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
			if (this.destroyed)
				return;

			this.parent();

			if (this._timer.delta() < 0.05)
				return;

			if (this._timer.delta() > this._lifetime && !this._kill)
			{
				this._emitter.emit(100 + 20 * Math.random(), this.pos.x + 5, this.pos.y + 5, { owner: this.owner });

				this.currentAnim = this.anims.explode;

				this._kill = true;
			}

			if (this._kill && this._timer.delta() > this._lifetime + 0.4)
				this.kill();
		}
	});

	EntitySwordAttack = EntitySpell_Base.extend(
	{
		animSheet: new ig.AnimationSheet('media/sword_attacks.png', 32, 32),
		size: { x: 32, y: 32 },
		offset: { x: 0, y: 0 },
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NEVER,
		zIndex: 10,

		direction: DIRECTION.LEFT,

		owner: null,

		_timer: null,
		_lifetime: 0.2,
		_hit: false,
		_level: 0,

		i: 0,

		_start_sound: new ig.Sound('media/sounds/sword_attack.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
			
			this.type = ig.Entity.TYPE.B;
			this.collides = ig.Entity.COLLIDES.NEVER;
			this.checkAgainst = ig.Entity.TYPE.B;
			this.health = 1;
			this._hit = false;

			this._level = twws_player_data.sword_level;

			this._timer = new ig.Timer(0);

			this.i = 8 * this._level;
			
			this.addAnim('hit_up', 0.1, [ 0 + this.i, 1 + this.i ], true);
			this.addAnim('hit_right', 0.1, [ 2 + this.i, 3 + this.i ], true);
			this.addAnim('hit_down', 0.1, [ 4 + this.i, 5 + this.i ], true);
			this.addAnim('hit_left', 0.1, [ 6 + this.i, 7 + this.i ], true);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.pos.x -= 16;
					this.pos.y -= 8;

					this.size.x = 20;
					this.size.y = 32;
					this.offset.x = 12;
					this.offset.y = 0;
			
					this.currentAnim = this.anims.hit_left;

					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.pos.x += 16;
					this.pos.y -= 8;

					this.size.x = 20;
					this.size.y = 32;
					this.offset.x = 0;
					this.offset.y = 0;

					this.currentAnim = this.anims.hit_right;

					break;
				}
				case DIRECTION.UP:
				{
					this.pos.x -= 8;
					this.pos.y -= 16;

					this.size.x = 32;
					this.size.y = 20;
					this.offset.x = 0;
					this.offset.y = 12;

					this.currentAnim = this.anims.hit_up;

					break;
				}
				case DIRECTION.DOWN:
				{
					this.pos.x -= 8;
					this.pos.y += 16;

					this.size.x = 32;
					this.size.y = 20;
					this.offset.x = 0;
					this.offset.y = 0;

					this.currentAnim = this.anims.hit_down;

					break;
				}
			}

			this._start_sound.play();
		},

		update: function()
		{
			if (this.destroyed)
				return;

			this.parent();

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.pos.x = this.owner.pos.x - 16;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.pos.x = this.owner.pos.x + 16;
					break;
				}
				case DIRECTION.UP:
				{
					this.pos.x = this.owner.pos.x - 8;
					this.pos.y = this.owner.pos.y - 16;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.pos.y = this.owner.pos.y + 16;
					break;
				}
			}

			if (this._timer.delta() > this._lifetime)
				this.kill();
		},
		
		check: function(other)
		{
			if (this.destroyed || this._hit)
				return;

			if (other instanceof EntityNoAi)
			{
			}
			else
			{
				other.receiveDamage(1 + this._level, this);

				this._hit = true;
			}
		},
	});

	Spell_Running = EntitySpell_Base.extend(
	{
		init: function(x, y, settings)
		{
			twws_player_data.running_remaining += 10;
		}
	});

	SPELLS =
	[
		{
			name: 'Fireball',
			type: EntitySpell_Fireball,
			delay: 0.6,
			RANDOM_QUOTES:
			[
				{
					text: "BURN!",
				},
				{
					text: "Fireball, wizard's best friend.",
				},
				{
					text: "It's getting hot.",
				},
			],
		},
		{
			name: 'Magic Bomb',
			type: EntitySpell_Bomb,
			delay: 1.0,
			RANDOM_QUOTES:
			[
				{
					text: "Heavy, but effective.",
				},
				{
					text: "Fire in the hole!",
				},
				{
					text: "When magic is not enough...",
				},
			],
		},
		{
			name: 'Magic Shield',
			type: EntitySpell_Shield,
			delay: 1.6,
			RANDOM_QUOTES:
			[
				{
					text: "Shields up!",
				},
				{
					text: "Better prepare...",
				},
				{
					text: "They keep coming, I keep living.",
				},
			],
		},
		{
			name: 'Sword',
			type: EntitySwordAttack,
			delay: 0.6,
			RANDOM_QUOTES:
			[
				{
					text: "I'm old, but you are dead.",
				},
				{
					text: "Where's your shield?",
				},
				{
					text: "DIE ZOMBIE!",
				},
			],
		},
		{
			name: 'Lightning',
			type: EntitySpell_Fireball,
		},
		{
			name: 'Ice Splitters',
			type: EntitySpell_Fireball,
		},
		{
			name: 'Beam of Sun',
			type: EntitySpell_Fireball,
		},
		{
			name: 'Water Floating',
			type: EntitySpell_Fireball,
		},
		{
			name: 'Running',
			type: Spell_Running,
			delay: 1,
			RANDOM_QUOTES:
			[
				{
					text: "Time to speed up.",
				},
				{
					text: "Why are you so slow?",
				},
				{
					text: "Run zombie, run!",
				},
			],
		},
	];
});