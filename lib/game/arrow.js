ig.module
(
	'game.arrow'
)
.requires
(
	'impact.entity',
	'game.global',
	'game.spells',
	'game.particle-emitter',
	'game.entities.particle-emitter'
)
.defines(function()
{
	EntityArrow = EntitySpell_Base.extend(
	{
		animSheet: new ig.AnimationSheet('media/arrow.png', 16, 16),
		size: { x: 10, y: 10 },
		offset: { x: 3, y: 3 },
		maxVel: { x: 700, y: 700 },
		vel: { x: 0, y: 0 },
		accel: { x: 0, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,
		zIndex: 10,
		health: 1,

		owner: null,

		direction: DIRECTION.LEFT,
		_start_speed: 200,
		_accel_add: 85,
		_timer: null,
		_lifetime: 4,

		x: 0,
		y: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
			
			this.type = ig.Entity.TYPE.B;
			this.collides = ig.Entity.COLLIDES.ACTIVE;
			this.checkAgainst = ig.Entity.TYPE.BOTH;
			this._lifetime = 4;
			this.health = 1;
			this.x = 0;
			this.y = 0;
			this.owner = null;
			
			this.addAnim('fly_right', 0.2, [ 0, 1 ]);
			this.addAnim('fly_down', 0.2, [ 2, 3 ]);
			this.addAnim('fly_left', 0.2, [ 4, 5 ]);
			this.addAnim('fly_up', 0.2, [ 6, 7 ]);

			this._timer = new ig.Timer(0);

			switch(this.direction)
			{
				case DIRECTION.LEFT:
				{
					this.vel.x = -this._start_speed;
					this.accel.x = -this._accel_add;
					this.pos.x -= 16;
					this.pos.y += 4;
					this.currentAnim = this.anims.fly_left;
					break;
				}
				case DIRECTION.RIGHT: 
				{
					this.vel.x = this._start_speed;
					this.accel.x = this._accel_add;
					this.currentAnim = this.anims.fly_right;
					this.pos.x += 16;
					this.pos.y += 4;
					break;
				}
				case DIRECTION.UP:
				{
					this.vel.y = -this._start_speed;
					this.accel.y = -this._accel_add;
					this.currentAnim = this.anims.fly_up;
					this.pos.y -= 16;
					this.pos.x += 4;
					break;
				}
				case DIRECTION.DOWN:
				{
					this.vel.y = this._start_speed;
					this.accel.y = this._accel_add;
					this.currentAnim = this.anims.fly_down;
					this.pos.y += 16;
					this.pos.x += 4;
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

			if (this._timer.delta() > this._lifetime)
				this.kill();
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

				this.kill();
			}
		},
		
		handleMovementTrace: function(res)
		{
			if (this.destroyed)
				return;

			this.parent(res);

			if (res.collision.x || res.collision.y)
				this.kill();
		},
	});
});