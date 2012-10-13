ig.module
(
	'game.spells-manager'
)
.requires
(
	'impact.entity',
	'game.spells'
)
.defines(function()
{
	SpellsManager = ig.Class.extend(
	{
		_type: null,
		_max: 100,
		_spells: [ ],

		init: function(type, max)
		{
			this._type = type;
			this._max = max;
			this._spells.length = this._max;
		},

		spawn: function(x, y, settings)
		{
			for (var s = 0; s < this._max; ++s)
			{
				if (!this._spells[s])
				{
					this._spells[s] = ig.game.spawnEntity(this._type, x, y, settings);
					break;
				}
				else if (this._spells[s].destroyed)
				{
					this._spells[s].reset(x, y, settings);
					break;
				}
				//TODO: kein Platz mehr...
				//ig.game.spawnEntity(this.particle_type, x, y, settings);
			}
		}
	});
});