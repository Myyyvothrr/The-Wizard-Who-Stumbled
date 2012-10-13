ig.module
( 
	'game.gamestates.highscores' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Highscores = ig.Game.extend(
	{
		_img_bg: new ig.Image('media/backgrounds/parchment.png'),
		_gui_font: new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),
		_logo: new ig.Image('media/logo1.png'),

		init: function()
		{
			twws_piwik_track('Tips');
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
			
			this._gui_font.draw("HELP!", 200, 100, ig.Font.ALIGN.CENTER);

			this._gui_font.draw("Tip 1: The Wizard can crush Imps\nby just walking over them.", 200, 160, ig.Font.ALIGN.CENTER);
		}
	});
});