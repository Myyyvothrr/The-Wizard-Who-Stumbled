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
		_img_bg: new ig.Image('media/backgrounds/parchment.png'),
		_gui_font: new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),
		
		_logo: new ig.Image('media/logo1.png'),

		init: function()
		{
			twws_piwik_track('Credits');
		},

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

			this._logo.draw(0, 40);

			this._gui_font.draw("Credits", 200, 100, ig.Font.ALIGN.CENTER);

			this._gui_font.draw("Programming, Graphics,\nSound & Music\nby Daniel Baumartz", 200, 130, ig.Font.ALIGN.CENTER);
			
			this._gui_font.draw("Made with ImpactJS\npro motion, Photoshop Elements,\nRenoise, GoldWave\nand Sublime Text.", 200, 190, ig.Font.ALIGN.CENTER);
				
			this._gui_font.draw(twws_get_version(), 200, 250, ig.Font.ALIGN.CENTER);
		}
	});
});