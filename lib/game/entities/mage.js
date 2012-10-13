ig.module
(
	'game.entities.mage'
)
.requires
(
	'impact.entity',
	'game.entities.zombie',
	'game.spells'
)
.defines(function()
{
	EntityMage = EntityZombie.extend(
	{
		animSheet: new ig.AnimationSheet('media/entities/mage.png', 16, 16),

		_teleport_to: { x: 0, y: 0 },
		_ai_update_speed: 1,
		_attack_delay: 0,
		_killed_score: 20,
		_do_teleport: false,

		health: 5,
		_max_health: 5,

		_spell_type: EntitySpell_MageSpell,

		_emitter: null,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (ig.game.get_particle_emitter)
				this._emitter = ig.game.get_particle_emitter(EntityParticleTeleported);

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

		ai: function()
		{
			if (!twws_player)
				return;

			this._ai_following = false;			

			if (this.distanceTo(twws_player) > 180)
				return;

			if (this._do_teleport || this.distanceTo(twws_player) > 80 && Math.random() > 0.1)
			{
				switch(twws_player.direction)
				{
					case DIRECTION.LEFT:
					{
						this._teleport_to.x = twws_player.pos.x + 32 + 8 * Math.random();						
						this._teleport_to.y = twws_player.pos.y -8  + 16 * Math.random();
						break;
					}
					case DIRECTION.RIGHT:
					{
						this._teleport_to.x = twws_player.pos.x - 32 - 8 * Math.random();						
						this._teleport_to.y = twws_player.pos.y -8  + 16 * Math.random();
						break;
					}
					case DIRECTION.UP:
					{
						this._teleport_to.x = twws_player.pos.x -8  + 16 * Math.random();						
						this._teleport_to.y = twws_player.pos.y + 32 + 8 * Math.random();
						break;
					}
					case DIRECTION.DOWN:
					{
						this._teleport_to.x = twws_player.pos.x -8 + 16 * Math.random();						
						this._teleport_to.y = twws_player.pos.y - 32 - 8 * Math.random();
						break;
					}
				}

				if (this._do_teleport)
				{
					ig.game.spawnEntity(EntityImp, this.pos.x + this.size.x * 0.5 , this.pos.y + this.size.x * 0.5, { recreate: true });
					this._emitter.emit((ig.ua.mobile ? 2 : (8 + 4 * Math.random())), this.pos.x + this.size.x * 0.5, this.pos.y + this.size.y * 0.5, { direction: this.direction });		
				}

				this.pos = this._teleport_to;
				this.direction = twws_player.direction;
				this._emitter.emit((ig.ua.mobile ? 4 : (16 + 4 * Math.random())), this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, { direction: this.direction });	
		
				this._do_teleport = false;
			}

			this.move = { x: 0, y: 0 };
			this.move.x = twws_player.pos.x - this.pos.x;
			this.move.y = twws_player.pos.y - this.pos.y;

			this.trace = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.move.x, this.move.y, this.size.x, this.size.y);
			if (this.trace.collision.x || this.trace.collision.y)
				return;

			this.vel.x = this.move.x * 0.1;
			this.vel.y = this.move.y * 0.1;

			this._ai_following = true;
		},

		handleMovementTrace: function(res)
		{
			this.parent(res);

			if (res.collision.x || res.collision.y)
			{
				this.random_walking();
				this._ai_update_timer.set(this._ai_update_speed + 2 * Math.random());
			}
		},

		receiveDamage: function(amount, from)
		{
			this._do_teleport = true;
			this._ai_do = true;

			this.parent(amount, from);
		},
	});
});