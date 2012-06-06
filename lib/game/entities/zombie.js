ig.module
(
	'game.entities.zombie'
)
.requires
(
	'impact.entity',
	'game.entities.particle-emitter',
	'game.global',
	'game.entities.health-potion',
	'game.entities.speed-parchment',
	'game.entities.coins',
	'game.entities.bombs',
	'game.spells'
)
.defines(function()
{
	EntityZombie = ig.Entity.extend(
	{
		anim_sheets:
		{
			normal: new ig.AnimationSheet('media/zombie.png', 16, 16),
			wounded: new ig.AnimationSheet('media/zombie-wounded1.png', 16, 16),
			severe: new ig.AnimationSheet('media/zombie-wounded2.png', 16, 16)
		},

		animSheet: null,

		size: { x: 14, y: 14 },
		offset: { x: 1, y: 1 },
		maxVel: { x: 100, y: 100 },
		friction: { x: 0, y: 0 },
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		zIndex: 8,
		bounciness: 0.25,

		health: 3,
		_max_health: 3,

		direction: 0,
		_walk_speed: 10,
		_run_speed: 30,
		_ai_update_timer: null,
		_ai_update_tries: 0,
		_ai_do: false,
		_ai_following: false,
		_running_timer: null,
		_running_remaining: 0,
		_emitter: new EntityParticleEmitter(0, 0),
		_attack_timer: null,
		_attack_delay: 1,
		
		_last_damager: null,

		_player: null,

		speed: 0,
		move: { x: 0, y: 0 },

		r: 0,
		trace: null,

		_killed_score: 10,

		_ai_update_speed: 5,

		_spell_type: EntitySpell_ToxicCloud,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.update_anims();

			this._ai_update_timer = new ig.Timer(0);
			this._running_timer = new ig.Timer(0);
			this._attack_timer = new ig.Timer(2+Math.random()*5);

			this.random_walking();
		},

		update_anims: function()
		{
			switch (this.health)
			{
				case 3: this.animSheet = this.anim_sheets.normal; break;
				case 2: this.animSheet = this.anim_sheets.wounded; break;
				case 1: this.animSheet = this.anim_sheets.severe; break;
				default: this.animSheet = this.anim_sheets.normal; break;
			}

			this.addAnim('right_idle', 1, [0]);
			this.addAnim('right_walk', 0.3, [0, 1]);
			this.addAnim('left_idle', 1, [4]);
			this.addAnim('left_walk', 0.3, [4, 5]);			
			this.addAnim('up_idle', 1, [6]);
			this.addAnim('up_walk', 0.3, [6, 7]);
			this.addAnim('down_idle', 1, [2]);
			this.addAnim('down_walk', 0.3, [2, 3]);
		},
		
		update: function()
		{	
			this._player = twws_player;

			this.accel.x = 0;
			this.accel.y = 0;

			if (this._player && this.distanceTo(this._player) <= 64 && Math.random() > 0.2)
			{
				this._ai_do = true;
			}

			if (this._ai_update_timer.delta() > 0 || this._ai_do || !this._ai_following)
			{
				this.ai();
				this._ai_do = false;
				this._ai_update_tries = 0;
				this._ai_update_timer.set(this._ai_update_speed);
			}

			this.parent();

			this.update_direction();

			if (this.vel.x != 0 || this.vel.y != 0)
			{
				switch(this.direction)
				{
					case DIRECTION.LEFT: this.currentAnim = this.anims.left_walk; break;
					case DIRECTION.RIGHT: this.currentAnim = this.anims.right_walk; break;
					case DIRECTION.UP: this.currentAnim = this.anims.up_walk; break;
					case DIRECTION.DOWN: this.currentAnim = this.anims.down_walk; break;
				}
			}
			else
			{
				switch(this.direction)
				{
					case DIRECTION.LEFT: this.currentAnim = this.anims.left_idle; break;
					case DIRECTION.RIGHT: this.currentAnim = this.anims.right_idle; break;
					case DIRECTION.UP: this.currentAnim = this.anims.up_idle; break;
					case DIRECTION.DOWN: this.currentAnim = this.anims.down_idle; break;
				}
			}

			if (this.pos.x < 0)
			{
				this.pos.x = 0;
				this.random_walking();
				this._ai_update_tries += 1;
				this._ai_update_timer.set(this._ai_update_tries + Math.random() * 2);
			}
			else if (this.pos.x + this.size.x > ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize)
			{
				this.pos.x = ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - this.size.x;
				this.random_walking();
				this._ai_update_tries += 1;
				this._ai_update_timer.set(this._ai_update_tries + Math.random() * 2);
			}
			
			if (this.pos.y < 0)
			{
				this.pos.y = 0;
				this.random_walking();
				this._ai_update_tries += 1;
				this._ai_update_timer.set(this._ai_update_tries + Math.random() * 2);
			}
			else if (this.pos.y + this.size.y > ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize)
			{
				this.pos.y = ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize - this.size.y;
				this.random_walking();
				this._ai_update_tries += 1;
				this._ai_update_timer.set(this._ai_update_tries + Math.random() * 2);
			}

			if (!this._player)
				return;

			if (this._attack_delay >= 0 && this._attack_timer.delta() > this._attack_delay)
			{
				if (this.distanceTo(this._player) <= 300)
				{
					this.attack();
					this._attack_timer.set(1+Math.random()*2);					
				}
			}
		},

		attack: function()
		{
			ig.game.spawnEntity(this._spell_type, this.pos.x, this.pos.y, { direction: this.direction, owner: this });
		},

		random_walking: function()
		{
			this.speed = this._walk_speed;
			this._anim_speed = 0.4;
			if (this._running_timer.delta() < this._running_remaining)
			{
				this.speed = this._run_speed;
				this._anim_speed = 0.2;
			}
			else
			{
				this._running_timer.set(0);
				this._running_remaining = 0;
			}

			this.r = Math.random();
			if (this.r < 0.25)
			{
				this.direction = DIRECTION.RIGHT;
				this.vel.x = this.speed;
			}
			else if (this.r < 0.5)
			{
				this.direction = DIRECTION.LEFT;
				this.vel.x = -this.speed;
			}
			else if (this.r < 0.75)
			{
				this.direction = DIRECTION.UP;
				this.vel.y = -this.speed;
			}
			else
			{
				this.direction = DIRECTION.DOWN;
				this.vel.y = this.speed;
			}
		},

		handleMovementTrace: function(res)
		{
			this.parent(res);

			if (res.collision.x || res.collision.y)
			{
				this.random_walking();
				this._ai_update_tries += 1;
				this._ai_update_timer.set(this._ai_update_tries + Math.random() * 2);
			}
		},

		check: function(other)
		{
			if (other instanceof EntityHealthPotion)
			{
				if (this.health < this._max_health)
				{
					this.health += 1;
					this.update_anims();
					this._emitter.emit(EntityParticleHealing, (ig.ua.mobile ? 1 : (2 + 2 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });
					other.kill();
				}
			}
			else if (other instanceof EntitySpeedParchment)
			{
				this._ai_do = true;
				this._running_remaining += 10;
				other.kill();
			}
			else if (other instanceof EntityCoins)
			{
				other.kill();
			}
			else if (other instanceof EntityShieldParchment)
			{
				// ...
			}
			else if (other instanceof EntityBombs)
			{
				// ...
			}
			else
			{
				other.receiveDamage(1, this);
			}
		},

		receiveDamage: function(amount, from)
		{
			if (from instanceof EntitySpell_ToxicCloud)
			{
				this._emitter.emit(EntityParticleSkulls, (ig.ua.mobile ? 1 : (1 + 2 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });
				return;
			}

			this._emitter.emit(EntityParticleBloodSplash, (ig.ua.mobile ? 1 : (10 + 10 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: from.direction });

			if (!ig.ua.mobile)
				this._emitter.emit(EntityParticleBloodSplash, 3 + 2 * Math.random(), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: opposite_direction(from.direction) });
			
			this._ai_do = true;
		
			if (from.owner)
				this._last_damager = from.owner;
			else
				this._last_damager = from;

			this.parent(amount, from);

			this.update_anims();
		},

		kill: function()
		{
			ig.game.spawnEntity(EntityBloodPatch, this.pos.x, this.pos.y, { });

			this.r = Math.random();
			if (this.r < 0.25)
				ig.game.spawnEntity(EntityHealthPotion, this.pos.x, this.pos.y, { });
			else if (this.r < 0.5)
				ig.game.spawnEntity(EntitySpeedParchment, this.pos.x, this.pos.y, { });
			else if (this.r < 0.75)
				ig.game.spawnEntity(EntityCoins, this.pos.x, this.pos.y, { });
			else if (this.r > 0.9)
				ig.game.spawnEntity(EntityBombs, this.pos.x, this.pos.y, { });

			if (this._last_damager && this._last_damager instanceof EntityPlayer)
			{
				twws_stats.score += this._killed_score;
				twws_stats.kills += 1;
			}

			this.parent();
		},

		ai: function()
		{
			if (!this._player)
				return;

			this._ai_following = false;			

			if (this.distanceTo(this._player) > 150)
				return;

			this.move = { x: 0, y: 0 };
			this.move.x = this._player.pos.x - this.pos.x;
			this.move.y = this._player.pos.y - this.pos.y;

			this.trace = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.move.x, this.move.y, this.size.x, this.size.y);
			if (this.trace.collision.x || this.trace.collision.y)
				return;

			this.vel.x = this.move.x * 0.1;
			this.vel.y = this.move.y * 0.1;

			this._ai_following = true;
		},

		update_direction: function()
		{
			if (Math.abs(this.vel.x) > Math.abs(this.vel.y))
			{
				if (this.vel.x > 0)
					this.direction = DIRECTION.RIGHT;
				else
					this.direction = DIRECTION.LEFT;
			}
			else
			{
				if (this.vel.y > 0)
					this.direction = DIRECTION.DOWN;
				else
					this.direction = DIRECTION.UP;
			}
		}
	});

	EntityBloodPatch = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/blood-patch.png', 16, 16),
		size: { x: 16, y: 16 },
		offset: { x: 0, y: 0 },
		collides: ig.Entity.COLLIDES.NEVER,
		zIndex: 1,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [ 0, 1, 2 ], true);
		}
	});
});