ig.module
(
	'game.entities.sign'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySign = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/sign.png', 16, 16),
		size: { x: 40, y: 40 },
		offset: { x: -12, y: -12 },
		checkAgainst: ig.Entity.TYPE.A,
		zIndex: 0,

		text: 'You cannot read this.',
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{		
				ig.game.messages.show_dialog("SIGN", String(this.text).replace(/\\n/g, '\n'), ig.Font.ALIGN.CENTER);
			}
		},
	});
});