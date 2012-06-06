ig.module
(
	'game.entities.level-exit'
)
.requires
(
	'impact.entity',
	'game.gamestates.results'
)
.defines(function()
{
	EntityLevelExit = ig.Entity.extend(
	{
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
		_wmScalable: true,
		size: { x: 16, y: 16 },
		checkAgainst: ig.Entity.TYPE.A,

		level: null,
		
		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				other.exit_level(false);

				if (this.level)
				{
					var level_name = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b)
					{
						return a.toUpperCase() + b;
					});
					ig.game.loadLevelDeferred(ig.global['Level'+level_name]);
				}
				else
				{
					ig.system.setGame(Results);
				}
			}
		}
	});
});