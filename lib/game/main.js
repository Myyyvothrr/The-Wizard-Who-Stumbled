ig.module
( 
	'game.main' 
)
.requires
(
	'impact.game',
//	'impact.debug.debug',
	'game.global',
	'game.gamestates.menu'
)
.defines(function()
{
	TheWizardWhoStumbledGame = ig.Game.extend(
	{
		clearColor: null,

		init: function()
		{
			// Initialize your game here; bind keys etc.

			ig.music.add('media/twws-1.*');
			ig.music.volume = 0.3;
			ig.music.play();

			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.SPACE, 'fire');
			ig.input.bind(ig.KEY.ENTER, 'fire');
			ig.input.bind(ig.KEY._1, 'spell1');
			ig.input.bind(ig.KEY._2, 'spell2');
			ig.input.bind(ig.KEY._3, 'spell3');
			ig.input.bind(ig.KEY.ESC, 'back');

			ig.input.bind(ig.KEY.F2, 'cheat_level');

			if (ig.ua.mobile)
			{
				ig.input.bindTouch('#button-addows-left', 'left');
				ig.input.bindTouch('#button-addows-right', 'right');
				ig.input.bindTouch('#button-addows-up', 'up');
				ig.input.bindTouch('#button-addows-down', 'down');
				ig.input.bindTouch('#button-action', 'fire');
			}
		},

		update: function()
		{
			ig.system.setGame(Menu);
		}
	});

	// Default: width=400, height=300, scaled up by 2
	// Desktop browsers, iPad...
	var w = 400;
	var h = 300;
	var s = 2;

	if (ig.ua.mobile)
	{
		ig.Sound.enable = false;
		
	/*	if (ig.ua.iPhone)
		{
			// iPod touch and iPhone: keep resolution but no upscaling
			s = 1;
		}
		else if (ig.ua.iPhone4)
		{
			// iPod/iPhone with retina display: scaled up by 4
			s = 4;
		}
		else
		{
			if (ig.ua.screen.width >= 2*w && ig.ua.screen.height >= 2*h)
			{
				// Screen min 800x600, scaling x2
			}
			else if (ig.ua.screen.width >= w && ig.ua.screen.height >= h)
			{
				// Screen min 400x300, no upscaling
				s = 1;
			}
			else
			{
				// Game will not work
			}
		}*/
	}
	else
	{
		document.getElementById('button-arrows').className = 'hide';
		document.getElementById('button-action').className = 'hide';
	}
	
	ig.Sound.use = [ ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A ];

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main('#canvas', TheWizardWhoStumbledGame, 60, w, h, s);
});
