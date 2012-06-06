ig.module
( 
	'game.gamestates.credits' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Credits = ig.Game.extend(
	{
		_img_bg: new ig.Image('media/parchment.png'),
		_gui_font: new ig.Font('media/della_respira-16.font.png'),
		_gui_font_small: new ig.Font('media/04b03.font.png'),

		update: function()
		{		
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here
			if (ig.input.pressed('fire'))
				ig.system.setGame(Menu);
		},
	
		draw: function()
	 	{
			// Draw all entities and backgroundMaps
			this.parent();		
		
			// Add your own drawing code here
			this._img_bg.draw(0, 0);

			this._gui_font.draw("THE WIZARD\nWHO STUMBLED", 200, 50, ig.Font.ALIGN.CENTER);

			this._gui_font.draw("Credits", 200, 100, ig.Font.ALIGN.CENTER);

			this._gui_font.draw("Programming, Graphics,\nSound & Music\nby Daniel Baumartz", 200, 130, ig.Font.ALIGN.CENTER);
			
			this._gui_font_small.draw("Made with Impact impactjs.com, jQuery jquery.com,\npro motion cosmigo.com, Photoshop Elements adobe.com,\nRenoise renoise.com, GoldWave goldwave.com\nand Sublime Text sublimetext.com.", 200, 190, ig.Font.ALIGN.CENTER);
				
			this._gui_font_small.draw(twws_get_version(), 200, 250, ig.Font.ALIGN.CENTER);
		}
	});
});