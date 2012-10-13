ig.module
( 
	'game.gamestates.menu' 
)
.requires
(
	'impact.game',
	'game.gamestates.intro',
	'game.gamestates.highscores',
	'game.gamestates.credits'
)
.defines(function()
{
	Menu = ig.Game.extend(
	{
		_img_bg: new ig.Image('media/backgrounds/parchment.png'),
		_gui_font: new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),

		_logo: new ig.Image('media/logo1.png'),

		_cursor: 0,
		_num_items: 3,

		_music: new ig.Sound('media/music/twws-menu-1.*'),

		init: function()
		{
			ig.music.stop();
			ig.music.tracks.length = 0;
			ig.music.add(this._music);
			ig.music.volume = 0.9;
			ig.music.random = false;
			ig.music.next();

			twws_piwik_track('Menu');
		},

		update: function()
		{		
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here
			if (ig.input.pressed('fire') && this._cursor == 0)
				ig.system.setGame(Intro);
			else if (ig.input.pressed('fire') && this._cursor == 1)
				ig.system.setGame(Highscores);
			else if (ig.input.pressed('fire') && this._cursor == 2)
				ig.system.setGame(Credits);

			if (ig.input.pressed('up'))
				this._cursor--;
			else if (ig.input.pressed('down'))
				this._cursor++;

			if (this._cursor < 0)
				this._cursor = this._num_items - 1;
			else if (this._cursor > this._num_items - 1)
				this._cursor = 0;
		},

		draw: function()
	 	{
			// Draw all entities and backgroundMaps
			this.parent();		
		
			// Add your own drawing code here
			this._img_bg.draw(0, 0);

			this._logo.draw(0, 40);

			if (this._cursor == 0)
			{
				this._gui_font.draw("> play <", 200, 140, ig.Font.ALIGN.CENTER);
				this._gui_font.draw("help", 200, 160, ig.Font.ALIGN.CENTER);
				this._gui_font.draw("credits", 200, 180, ig.Font.ALIGN.CENTER);
			}
			else if (this._cursor == 1)
			{
				this._gui_font.draw("play", 200, 140, ig.Font.ALIGN.CENTER);
				this._gui_font.draw("> help <", 200, 160, ig.Font.ALIGN.CENTER);
				this._gui_font.draw("credits", 200, 180, ig.Font.ALIGN.CENTER);
			}
			else if (this._cursor == 2)
			{
				this._gui_font.draw("play", 200, 140, ig.Font.ALIGN.CENTER);
				this._gui_font.draw("help", 200, 160, ig.Font.ALIGN.CENTER);
				this._gui_font.draw("> credits <", 200, 180, ig.Font.ALIGN.CENTER);
			}
		}
	});
});