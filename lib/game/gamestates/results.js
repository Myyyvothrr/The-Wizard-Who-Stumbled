ig.module
( 
	'game.gamestates.results' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Results = ig.Game.extend(
	{
		_img_bg: new ig.Image('media/gameover.png'),
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

			if (twws_stats._wizard_killed)
				this._gui_font.draw("THE WIZARD HAS BEEN KILLED", 200, 35, ig.Font.ALIGN.CENTER);
			else
				this._gui_font.draw("THE WIZARD HAS SUCCEEDED", 200, 35, ig.Font.ALIGN.CENTER);

			this._gui_font.draw("This is how you did:", 200, 70, ig.Font.ALIGN.CENTER);		

			this._gui_font.draw("Points: " + twws_stats.score, 200, 100, ig.Font.ALIGN.CENTER);
			this._gui_font.draw("Coins (x100): " + twws_stats.coins, 200, 120, ig.Font.ALIGN.CENTER);
			this._gui_font.draw("Kills (x10): " + twws_stats.kills, 200, 140, ig.Font.ALIGN.CENTER);
		
			this._gui_font.draw("Your final score:", 200, 190, ig.Font.ALIGN.CENTER);
			this._gui_font.draw(twws_calc_final_score(), 200, 220, ig.Font.ALIGN.CENTER);
		}
	});
});