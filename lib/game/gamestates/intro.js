ig.module
( 
	'game.gamestates.intro' 
)
.requires
(
	'impact.game',
	'game.gamestates.game'
)
.defines(function()
{
	Intro = ig.Game.extend(
	{
		_img_bg: new ig.Image('media/backgrounds/intro.png'),

		_intro_timer: null,

		_music: new ig.Sound('media/music/twws-music-1-intro.*'),

		init: function()
		{
			ig.music.stop();
			ig.music.tracks.length = 0;
			ig.music.add(this._music);
			ig.music.volume = 0.7;
			ig.music.random = false;
			ig.music.next();

			this._intro_timer = new ig.Timer(0);

			twws_piwik_track('Intro');
		},
	
		update: function()
		{		
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here

			// TODO: Hier Intro Film abspielen, dann automatisch zum Spiel
			if (ig.input.pressed('fire') || this._intro_timer.delta() > 6)
			{
				twws_piwik_track('Intro/Skipped');
				ig.system.setGame(Game);
			}
		},
	
		draw: function()
	 	{
			// Draw all entities and backgroundMaps
			this.parent();		
		
			// Add your own drawing code here
			this._img_bg.draw(0, 0);
		}
	});
});