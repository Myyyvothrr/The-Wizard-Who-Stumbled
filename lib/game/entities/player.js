ig.module
(
	'game.entities.player'
)
.requires
(
	'impact.entity',
	'game.spells',
	'game.spells-manager',
	'game.entities.health-potion',
	'game.entities.speed-parchment',
	'game.entities.shield-parchment',
	'game.entities.coins',
	'game.gamestates.results'
)
.defines(function()
{
	EntityPlayer = BaseEntity.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/wizard.png', 16, 16),
		size: { x: 14, y: 14 },
		offset: { x: 1, y: 1 },
		maxVel: { x: 180, y: 180 },
		friction: { x: 0, y: 0 },
		vel: { x: 0, y: 0},
		accel: { x: 0, y: 0 },
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		zIndex: 9,

		_speed: 0,
		_swim_speed: 1,
		_street_speed: 120,
		_walk_speed: 80,
		_run_speed: 180,

		_anim_speed: 0.4,

		_key_left_pressed: Number.MAX_VALUE,
		_key_right_pressed: Number.MAX_VALUE,
		_key_up_pressed: Number.MAX_VALUE,
		_key_down_pressed: Number.MAX_VALUE,

		_time: 0.0,
		
		_spell_timer: null,
		_spells_managers: [ ],

		_invincible_delay: 0,

		_damage_sound: new ig.Sound('media/sounds/punch.*'),

		_potion_sound: new ig.Sound('media/sounds/potion_drink.*'),

		_emitter_skull: null,
		_emitter_healing: null,
		_emitter_speed: null,

		near_door: false,

		n: 0,
		
		init: function(x, y, settings)
		{
			settings.dont_register = true;

			this.parent(x, y, settings);

			if (twws_player_data)
			{
				if (twws_player_data.teleport_pos)
				{
					this.pos = twws_player_data.teleport_pos;
					twws_player_data.teleport_pos = null;
				}

				if (twws_player_data.teleport_direction != null)
				{
					this.direction = twws_player_data.teleport_direction;
					twws_player_data.teleport_direction = null;
				}
			}

			if (ig.game.get_particle_emitter)
			{
				this._emitter_skull = ig.game.get_particle_emitter(EntityParticleSkulls);
				this._emitter_healing = ig.game.get_particle_emitter(EntityParticleHealing);
				this._emitter_speed = ig.game.get_particle_emitter(EntityParticleSpeed);

				for (var i = 0, l = SPELLS.length; i < l; ++i)
					this._spells_managers[i] = ig.game.get_spells_manager(SPELLS[i].type);
			}

			this.addAnim('right_idle', 1, [0]);
			this.addAnim('right_walk', 0.4, [0, 1]);
			this.addAnim('left_idle', 1, [4]);
			this.addAnim('left_walk', 0.4, [4, 5]);			
			this.addAnim('up_idle', 1, [6]);
			this.addAnim('up_walk', 0.4, [6, 7]);
			this.addAnim('down_idle', 1, [2]);
			this.addAnim('down_walk', 0.4, [2, 3]);

			this._spell_timer = new ig.Timer(0);
			this._invincible_timer = new ig.Timer(0);

			twws_player = this;

			twws_piwik_track('Player/Init');
		},

		is_oldest: function(v, v1, v2, v3)
		{
			return (v < v1) && (v < v2) && (v < v3);			
		},
		
		update: function()
		{			
			this.parent();

			this._time += ig.system.tick;

			if (this._invincible_delay > 0)
				this._invincible_delay -= ig.system.tick;

			if (ig.input.pressed('left'))
				this._key_left_pressed = this._time;
			else if (ig.input.released('left'))
				this._key_left_pressed = Number.MAX_VALUE;

			if (ig.input.pressed('right'))
				this._key_right_pressed = this._time;
			else if (ig.input.released('right'))
				this._key_right_pressed = Number.MAX_VALUE;

			if (ig.input.pressed('up'))
				this._key_up_pressed = this._time;
			else if (ig.input.released('up'))
				this._key_up_pressed = Number.MAX_VALUE;

			if (ig.input.pressed('down'))
				this._key_down_pressed = this._time;
			else if (ig.input.released('down'))
				this._key_down_pressed = Number.MAX_VALUE;

			this._anim_speed = 0.4;	
			this.speed = this._walk_speed;		

			if (this.is_on_ice)
			{
				this.vel.x *= 1.7;
				this.vel.y *= 1.7;
			}
			else
			{				
				this.vel.x = 0;
				this.vel.y = 0;
			}

			if (this.is_on_street)
			{
				this.speed = this._street_speed;
			}

			if (twws_player_data.running_remaining > 0)
			{
				twws_player_data.running_remaining -= ig.system.tick;
				twws_player_data.running_remaining = Math.max(twws_player_data.running_remaining, 0);
				this.speed = this._run_speed;
				this._anim_speed = 0.2;
				this._emitter_speed.emit(1, this.pos.x+2, this.pos.y+2, { direction: this.direction });
			}

			if (this.is_in_water)
			{
				this.speed = this._swim_speed;
			}

			this.vel.x = ((ig.input.state('right') ? 1 : 0) - (ig.input.state('left') ? 1 : 0));
			this.vel.y = ((ig.input.state('down') ? 1 : 0) - (ig.input.state('up') ? 1 : 0));
	
			if (this.vel.x != 0 || this.vel.y != 0)
			{
				this.n = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
				this.vel.x = (this.vel.x / this.n) * this.speed;
				this.vel.y = (this.vel.y / this.n) * this.speed;

				if (ig.input.state('left') && this.is_oldest(this._key_left_pressed, this._key_right_pressed, this._key_up_pressed, this._key_down_pressed))
				{
					this.direction = DIRECTION.LEFT;
				}

				if (ig.input.state('right') && this.is_oldest(this._key_right_pressed, this._key_left_pressed, this._key_up_pressed, this._key_down_pressed))
				{
					this.direction = DIRECTION.RIGHT;
				}
			
				if (ig.input.state('up') && this.is_oldest(this._key_up_pressed, this._key_right_pressed, this._key_left_pressed, this._key_down_pressed))
				{
					this.direction = DIRECTION.UP;
				}
				
				if (ig.input.state('down') && this.is_oldest(this._key_down_pressed, this._key_right_pressed, this._key_up_pressed, this._key_left_pressed))
				{
					this.direction = DIRECTION.DOWN;
				}
			}

			if (ig.input.pressed('spell1'))
			{
				this.use_spell(SPELL_ID.FIREBALL);
			}
			if (ig.input.pressed('spell2'))
			{
				this.use_spell(SPELL_ID.BOMB);
			}
			if (ig.input.pressed('spell3'))
			{
				this.use_spell(SPELL_ID.RUNNING);
			}
			if (ig.input.pressed('spell4'))
			{
				this.use_spell(SPELL_ID.SHIELD);
			}
			if (ig.input.pressed('spell5'))
			{
				this.use_spell(SPELL_ID.SWORD);
			}
			if (ig.input.pressed('spell6'))
			{
				this.use_spell(SPELL_ID.LIGHTNING);
			}
			if (ig.input.pressed('spell7'))
			{
				this.use_spell(SPELL_ID.SUNBEAM);
			}
			if (ig.input.pressed('spell8'))
			{
				this.use_spell(SPELL_ID.ICESPLITTERS);
			}
			if (ig.input.pressed('spell9'))
			{
				this.use_spell(SPELL_ID.WATERFLOATING);
			}
			if (ig.input.pressed('potion'))
			{
				this.use_health_potion();
			}
			
			if (!this.near_door && this.can_attack && ig.input.pressed('fire') && this._spell_timer.delta() > SPELLS[twws_player_data.current_spell_nr].delay)
			{
				if (twws_player_data.spell_scrolls[twws_player_data.current_spell_nr] == -1 || twws_player_data.spell_scrolls[twws_player_data.current_spell_nr] > 0) 
				{
					this._spells_managers[twws_player_data.current_spell_nr].spawn(this.pos.x, this.pos.y, { direction: this.direction, owner: this });
					this._spell_timer.set(0);

					if (twws_player_data.spell_scrolls[twws_player_data.current_spell_nr] > 0)
						twws_player_data.spell_scrolls[twws_player_data.current_spell_nr]--;
				}
			}

			this.near_door = false;

			if (this.vel.x != 0 || this.vel.y != 0)
			{
				switch(this.direction)
				{
					case DIRECTION.LEFT: this.currentAnim = this.anims.left_walk; break;
					case DIRECTION.RIGHT: this.currentAnim = this.anims.right_walk; break;
					case DIRECTION.UP: this.currentAnim = this.anims.up_walk; break;
					case DIRECTION.DOWN: this.currentAnim = this.anims.down_walk; break;
				}

				this.currentAnim.frameTime = this._anim_speed;
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
		},

		use_spell: function(nr)
		{
			if (nr == SPELL_ID.SWORD && twws_player_data.sword_level < 0)
			{
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_SWORD_MISSING.random().text, MESSAGE_TYPE.BAD);
				return;
			}

			if (twws_player_data.spell_scrolls[nr] == 0)
			{
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_NO_SCROLLS.random().text, MESSAGE_TYPE.BAD);
				return;
			}

			twws_player_data.current_spell_nr = nr;
			this._spell_timer.set(0);
			ig.game.messages.scrolling_msg(SPELLS[twws_player_data.current_spell_nr].RANDOM_QUOTES.random().text, MESSAGE_TYPE.NORMAL);
		},

		use_health_potion: function()
		{	
			if (twws_player_data.health < twws_player_data.max_health)
			{
				if (twws_player_data.health_potions > 0)
				{
					this._potion_sound.play();
					ig.game.messages.scrolling_msg(RANDOM_QUOTES_HEALTH_POTION_USED.random().text, MESSAGE_TYPE.GOOD);
					twws_player_data.health_potions--;
					twws_player_data.health++;
					this._emitter_healing.emit((ig.ua.mobile ? 1 : (1 + 2 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });
					twws_piwik_track('Player/Used/HealthPotion');
				}
				else
				{
					ig.game.messages.scrolling_msg(RANDOM_QUOTES_HEALTH_POTION_NOT_ENOUGH.random().text, MESSAGE_TYPE.BAD);
				}
			}
			else
			{
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_HEALTH_POTION_NO_NEED.random().text, MESSAGE_TYPE.NORMAL);
			}
		},

		receiveDamage: function(amount, from)
		{
			if (this._invincible_delay > 0)
				return;

			this._damage_sound.play();

			this._emitter_skull.emit((ig.ua.mobile ? 1 : (1 + 2 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });
			this._invincible_delay = 1;
			
			twws_player_data.health -= amount;
			if (twws_player_data.health <= 0)
				this.kill();

			if (twws_player_data.health <= 1)
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_LOW_LP.random().text, MESSAGE_TYPE.BAD);

			twws_player_data.score -= 10;
		},

		check: function(other)
		{
			if (other instanceof EntityHealthPotion)
			{
				twws_player_data.health_potions++;
				other.kill();		
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_HEALTH_POTION.random().text, MESSAGE_TYPE.GOOD);
				twws_piwik_track('Player/Pickedup/HealthPotion');
			}
			else if (other instanceof EntityArmor)
			{
				twws_player_data.max_health++;
				other.kill();
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_ARMOR.random().text, MESSAGE_TYPE.GOOD);
				twws_piwik_track('Player/Pickedup/Armor');

			}
			else if (other instanceof EntitySpeedParchment)
			{
				twws_player_data.spell_scrolls[SPELL_ID.RUNNING]++;
				other.kill();
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_SPEED.random().text, MESSAGE_TYPE.GOOD);
				twws_piwik_track('Player/Pickedup/SpeedParchment');
			}
			else if (other instanceof EntityFireballParchment)
			{
				twws_player_data.spell_scrolls[SPELL_ID.FIREBALL]++;
				other.kill();
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_FIREBALL.random().text, MESSAGE_TYPE.GOOD);
				twws_piwik_track('Player/Pickedup/FireballParchment');
			}
			else if (other instanceof EntityCoins)
			{
				twws_player_data.coins += other.coins;
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_COINS.random().text, MESSAGE_TYPE.GOOD);
				other.kill();
				twws_piwik_track('Player/Pickedup/Coins');
			}
			else if (other instanceof EntityShieldParchment)
			{
				twws_player_data.spell_scrolls[SPELL_ID.SHIELD]++;
				other.kill();
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_SHIELD.random().text, MESSAGE_TYPE.GOOD);
				twws_piwik_track('Player/Pickedup/ShieldParchment');
			}
			else if (other instanceof EntityBombs)
			{
				twws_player_data.spell_scrolls[SPELL_ID.BOMB]++;
				other.kill();
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_BOMBS.random().text, MESSAGE_TYPE.GOOD);
				twws_piwik_track('Player/Pickedup/Bombs');
			}
			else if (other instanceof EntityKey)
			{
				twws_player_data.keys.push({ id: other.id, name: other.name });
				ig.game.messages.scrolling_msg(RANDOM_QUOTES_KEYS.random().text + other.name, MESSAGE_TYPE.NORMAL);
				other.kill();
				twws_piwik_track('Player/Pickedup/Key');
			}
			else if (other instanceof EntitySword)
			{
				twws_piwik_track('Player/Pickedup/Sword');
				if (twws_player_data.sword_level < other.level)
				{
					twws_player_data.sword_level = other.level;
					ig.game.messages.scrolling_msg(RANDOM_QUOTES_SWORD.random().text, MESSAGE_TYPE.GOOD);
				}
				else
				{
					ig.game.messages.scrolling_msg(RANDOM_QUOTES_SWORD_NO.random().text);
				}		
				
				other.kill();
			}
		},

		kill: function()
		{			
			this.parent();

			twws_player = null;

			twws_piwik_track('Player/Killed');

			ig.system.setGame(Results);
		},

		has_key: function(key)
		{
			for (var i = 0, l = twws_player_data.keys.length; i < l; ++i)
			{
				if (twws_player_data.keys[i].id == key.id)
				{
					key.name = twws_player_data.keys[i].name;
					twws_piwik_track('Player/Used/Key');
					return true;
				}
			}

			return false;
		},
	});
});