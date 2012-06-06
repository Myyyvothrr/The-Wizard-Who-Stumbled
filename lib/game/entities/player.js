ig.module
(
	'game.entities.player'
)
.requires
(
	'impact.entity',
	'game.global',
	'game.spells',
	'game.entities.health-potion',
	'game.entities.speed-parchment',
	'game.entities.coins',
	'game.gamestates.results'
)
.defines(function()
{
	EntityPlayer = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/wizard.png', 16, 16),
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

		health: 6,
		_max_health: 6,

		direction: DIRECTION.RIGHT,
		_walk_speed: 90,
		_run_speed: 160,
		_key_left_pressed: 0.0,
		_key_right_pressed: 0.0,
		_key_up_pressed: 0.0,
		_key_down_pressed: 0.0,
		_time: 0.0,
		_anim_speed: 0.4,
		_spells: [ EntitySpell_Fireball, EntitySpell_Bomb, EntitySpell_Shield ],
		_spells_delay: [ 0.6, 2.0, 1.5 ],
		_spells_mana: [ -1, 2, 1 ],
		_current_spell_id: 0,
		_spell_timer: null,
		_emitter: new EntityParticleEmitter(0, 0),
		_invincible_timer: null,
		_invincible_delay: 0.5,
		_running_timer: null,
		_running_remaining: 0,

		_gui_img_bg: new ig.Image('media/gui-bg.png'),
		_gui_img_hearts: new ig.Image('media/hearts.png'),
		_gui_font: new ig.Font('media/della_respira-16.font.png'),

		_damage_sound: new ig.Sound('media/punch.*'),

		speed: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

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
			this._running_timer = new ig.Timer(0);
		},
		
		update: function()
		{
			twws_player = this;

			this._time += ig.system.tick;

			if (ig.input.pressed('left'))
				this._key_left_pressed = this._time;
			else if (ig.input.released('left'))
				this._key_left_pressed = 0.0;

			if (ig.input.pressed('right'))
				this._key_right_pressed = this._time;
			else if (ig.input.released('right'))
				this._key_right_pressed = 0.0;

			if (ig.input.pressed('up'))
				this._key_up_pressed = this._time;
			else if (ig.input.released('up'))
				this._key_up_pressed = 0.0;

			if (ig.input.pressed('down'))
				this._key_down_pressed = this._time;
			else if (ig.input.released('down'))
				this._key_down_pressed = 0.0;

			this.speed = this._walk_speed;
			this._anim_speed = 0.4;
			if (this._running_timer.delta() < this._running_remaining)
			{
				this.speed = this._run_speed;
				this._anim_speed = 0.2;
				this._emitter.emit(EntityParticleSpeed, 1, this.pos.x + 4, this.pos.y + 4, { direction: this.direction });
			}
			else
			{
				this._running_timer.set(0);
				this._running_remaining = 0;
			}

			if (ig.game.backgroundMaps[0].getTile(this.pos.x+8, this.pos.y+8) != 50)
			{
				this.vel.x = 0;
				this.vel.y = 0;
			}
			else
			{
				this.vel.x *= 1.7;
				this.vel.y *= 1.7;
			}

			if (ig.input.state('left') && is_max(this._key_left_pressed, this._key_right_pressed, this._key_up_pressed, this._key_down_pressed))
			{
				this.vel.x = -this.speed;
				this.direction = DIRECTION.LEFT;
			}

			if (ig.input.state('right') && is_max(this._key_right_pressed, this._key_left_pressed, this._key_up_pressed, this._key_down_pressed))
			{
				this.vel.x = this.speed;
				this.direction = DIRECTION.RIGHT;
			}
			
			if (ig.input.state('up') && is_max(this._key_up_pressed, this._key_right_pressed, this._key_left_pressed, this._key_down_pressed))
			{
				this.vel.y = -this.speed;
				this.direction = DIRECTION.UP;
			}
			
			if (ig.input.state('down') && is_max(this._key_down_pressed, this._key_right_pressed, this._key_up_pressed, this._key_left_pressed))
			{
				this.vel.y = this.speed;
				this.direction = DIRECTION.DOWN;
			}

			if (ig.input.pressed('spell1'))
			{
				this._current_spell_id = 0;
				this._spell_timer.set(0);
			}
			if (ig.input.pressed('spell2'))
			{
				this._current_spell_id = 1;
				this._spell_timer.set(0);
			}
			if (ig.input.pressed('spell3'))
			{
				this._current_spell_id = 2;
				this._spell_timer.set(0);
			}
			
			if (ig.input.state('fire') && this._spell_timer.delta() > this._spells_delay[this._current_spell_id])
			{
				if (this._spells_mana[this._current_spell_id] == -1 || this._spells_mana[this._current_spell_id] > 0) 
				{
					ig.game.spawnEntity(this._spells[this._current_spell_id], this.pos.x, this.pos.y, { direction: this.direction, owner: this });
					this._spell_timer.set(0);

					if (this._spells_mana[this._current_spell_id] > 0)
						this._spells_mana[this._current_spell_id]--;
				}
			}

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
			
			this.parent();
		},

		draw: function()
		{
			this.parent();

			this.gui();
		},

		gui: function()
		{
			this._gui_img_bg.draw(0, 0);

			for (var i = 0; i < this.health; i++)
				this._gui_img_hearts.drawTile(4 + i*18, 4, 0, 16);

			for (var i = this.health; i < this._max_health; i++)
				this._gui_img_hearts.drawTile(4 + i*18, 4, 2, 16);

			this._gui_font.draw("Score: " + twws_stats.score, 200, 6, ig.Font.ALIGN.CENTER);

			switch (this._current_spell_id)
			{
				case 0: this._gui_font.draw("Fireball", 396, 6, ig.Font.ALIGN.RIGHT); break;
				case 1: this._gui_font.draw("Bomb (x " + this._spells_mana[this._current_spell_id] + ")", 396, 6, ig.Font.ALIGN.RIGHT); break;
				case 2: this._gui_font.draw("Shield (x " + this._spells_mana[this._current_spell_id] + ")", 396, 6, ig.Font.ALIGN.RIGHT); break;
				default: this._gui_font.draw("No Spell", 396, 6, ig.Font.ALIGN.RIGHT); break;
			}
		},

		receiveDamage: function(amount, from)
		{
			if (this._invincible_timer.delta() < this._invincible_delay)
				return;

			this._damage_sound.play();

			this._emitter.emit(EntityParticleSkulls, (ig.ua.mobile ? 1 : (2 + 2 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });
			this._invincible_timer.set(0);
			this.parent(amount, from);

			twws_stats.score -= 10;
		},

		check: function(other)
		{
			if (other instanceof EntityHealthPotion)
			{
				if (this.health < this._max_health)
				{
					this.health += 1;
					this._emitter.emit(EntityParticleHealing, (ig.ua.mobile ? 1 : (2 + 2 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });
					other.kill();
				}
			}
			else if (other instanceof EntitySpeedParchment)
			{
				this._running_remaining += 10;
				other.kill();
			}
			else if (other instanceof EntityCoins)
			{
				twws_stats.coins += 1;
				other.kill();
			}
			else if (other instanceof EntityShieldParchment)
			{
				this._spells_mana[2]++;
				other.kill();
			}
			else if (other instanceof EntityBombs)
			{
				this._spells_mana[1]++;
				other.kill();
			}
		},

		kill: function()
		{
			this.exit_level(true);
			
			this.parent();

			ig.system.setGame(Results);
		},

		exit_level: function(killed)
		{
			twws_stats._wizard_killed = killed;
		}
	});
});