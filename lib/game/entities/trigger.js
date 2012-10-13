ig.module
(
	'game.entities.trigger'
)
.requires
(
	'impact.entity',
	'game.global'
)
.defines(function()
{
	EntityTrigger = ig.Entity.extend(
	{
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(22, 125, 22, 0.7)',
		_wmScalable: true,
		size: { x: 16, y: 16 },
		checkAgainst: ig.Entity.TYPE.A,

		trigger: 0,
		
		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				switch (this.trigger)
				{
					case TRIGGER.DIALOG:
					{
						for (var i in this.dialog) 
						{
							ig.game.messages.add_dialog(this.name[i], String(this.dialog[i]).replace(/\\n/g, '\n'), this.align[i]);
						}
						break;
					}
					default:
					{
						break;
					}
				}
			}

			this.kill();
		}
	});
});