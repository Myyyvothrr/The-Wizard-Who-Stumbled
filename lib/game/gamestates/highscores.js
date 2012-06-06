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
		_img_bg: new ig.Image('media/parchment.png'),
		_gui_font: new ig.Font('media/della_respira-16.font.png'),

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

			this._gui_font.draw("The highscore list", 200, 100, ig.Font.ALIGN.CENTER);

			this._gui_font.draw("currently not available\nwork in progress", 200, 160, ig.Font.ALIGN.CENTER);
		}
	});
});