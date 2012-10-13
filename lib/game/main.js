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
			if (ig.ua.mobile)
			{
				ig.input.bindTouch('#button-addows-left', 'left');
				ig.input.bindTouch('#button-addows-right', 'right');
				ig.input.bindTouch('#button-addows-up', 'up');
				ig.input.bindTouch('#button-addows-down', 'down');
				ig.input.bindTouch('#button-action', 'fire');

				// TODO: spells!
			}
			else
			{				
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.A, 'left');
				ig.input.bind(ig.KEY.D, 'right');
				ig.input.bind(ig.KEY.W, 'up');
				ig.input.bind(ig.KEY.S, 'down');
				ig.input.bind(ig.KEY.ENTER, 'fire');
				ig.input.bind(ig.KEY.SPACE, 'fire');
				ig.input.bind(ig.KEY.H, 'potion');
				ig.input.bind(ig.KEY.ESC, 'back');
				ig.input.bind(ig.KEY._1, 'spell1');
				ig.input.bind(ig.KEY._2, 'spell2');
				ig.input.bind(ig.KEY._3, 'spell3');
				ig.input.bind(ig.KEY._4, 'spell4');
				ig.input.bind(ig.KEY._5, 'spell5');
				ig.input.bind(ig.KEY._6, 'spell6');
				ig.input.bind(ig.KEY._7, 'spell7');
				ig.input.bind(ig.KEY._8, 'spell8');
				ig.input.bind(ig.KEY._9, 'spell9');
			}
		},

		update: function()
		{
			ig.system.setGame(Menu);
		}
	});

	ig.Loader.inject(
	{
		draw: function()
		{
			this.parent();	
		
			ig.system.context.fillStyle = '#fff';
			ig.system.context.fillText(twws_get_version(), 10, 20);
		},
	});

	ig.log(twws_get_version());

	twws_piwik_init(2);
	twws_piwik_track('The Wizard Who Stumbled - version ' + TWWS_VERSION);

	// Default: width=400, height=300, scaled up by 2
	// Desktop browsers, iPad...
	var w = 400;//window.innerWidth*0.25;//
	var h = 300;//window.innerHeight*0.25;//
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
				s = 2;
			}
			else if (ig.ua.screen.width >= w && ig.ua.screen.height >= h)
			{
				// Screen min 400x300, no upscaling
				s = 1;
			}
			else
			{
				// TODO: Game will not work
			}
		}*/
	}
	else
	{
		document.getElementById('button-arrows').className = 'hide';
		document.getElementById('button-action').className = 'hide';
	}
	
	ig.Sound.use = [ ig.Sound.FORMAT.OGG ];

	ig.main('#canvas', TheWizardWhoStumbledGame, 60, w, h, s);
});
