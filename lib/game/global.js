ig.module
( 
	'game.global' 
)
.requires
(
)
.defines(function()
{
	TWWS_VERSION = "v0.5.0.b1";

	twws_get_version = function()
	{
		return "The Wizard Who Stumbled " + TWWS_VERSION + "\n(c) 2012 Daniel Baumartz\nwww.the-wizard-who-stumbled.de";
	};

	DIRECTION =
	{
		LEFT: 0,
		RIGHT: 1,
		UP: 2,
		DOWN: 3
	};

	TRIGGER =
	{
		DIALOG: 0,
	};

	RANDOM_QUOTES_LOW_LP =
	[
		{
			text: 'Oh, I should be more careful now.',
			speech: null,
		},
		{
			text: "I'm dying here...",
			speech: null,
		},
		{
			text: 'Where are my potions?',
			speech: null,
		},
	];

	RANDOM_QUOTES_HEALTH_POTION =
	[
		{
			text: 'Yes! Another potion.',
		},
		{
			text: 'Delicious, need more...',
		},
		{
			text: "I'll take that.",
		},
	];

	RANDOM_QUOTES_HEALTH_POTION_USED =
	[
		{
			text: 'I will not die!',
		},
		{
			text: 'Not today...',
		},
		{
			text: "Can't stop now.",
		},
	];

	RANDOM_QUOTES_HEALTH_POTION_NOT_ENOUGH =
	[
		{
			text: 'Fuck, I need more potions!',
		},
		{
			text: "Can't find any potions!",
		},
		{
			text: "Noooo! I don't have a potion!",
		},
	];

	RANDOM_QUOTES_HEALTH_POTION_NO_NEED =
	[
		{
			text: "I'm perfectly fine.",
		},
		{
			text: "Na, won't wanna waste 'em.",
		},
		{
			text: "Don't need a potion right now.",
		},
	];

	RANDOM_QUOTES_COINS =
	[
		{
			text: 'COINS!',
		},
		{
			text: 'More gold for me...',
		},
		{
			text: "Where can I buy stuff?",
		},
	];

	RANDOM_QUOTES_BOMBS =
	[
		{
			text: 'BOOM!',
		},
		{
			text: 'One bomb a day...',
		},
		{
			text: "...keeps the zombie away.",
		},
	];

	RANDOM_QUOTES_SHIELD =
	[
		{
			text: 'Shield scroll, great.',
		},
		{
			text: 'More shields, more safe.',
		},
		{
			text: "Zombies! I'm ready!",
		},
	];

	RANDOM_QUOTES_SPEED =
	[
		{
			text: 'Speed scroll, nice.',
		},
		{
			text: 'Move, this already took too long.',
		},
		{
			text: "Hey, zombie, can't keep up?",
		},
	];

	RANDOM_QUOTES_LOCKED =
	[
		{
			text: 'Locked, I need a key.',
		},
		{
			text: 'No key for this door.',
		},
		{
			text: "Have to find a key.",
		},
	];

	RANDOM_QUOTES_OPENED =
	[
		{
			text: 'Opened the door with ',
		},
		{
			text: 'Great, I have ',
		},
		{
			text: "Done. Used ",
		},
	];

	RANDOM_QUOTES_KEYS =
	[
		{
			text: 'Picked up ',
		},
		{
			text: "So, where's the door? ",
		},
		{
			text: "Nice, new key: ",
		},
	];

	RANDOM_QUOTES_SWORD =
	[
		{
			text: 'Yeah! New sword for me.',
		},
		{
			text: "I'll take this stronger sword.",
		},
		{
			text: "The longer the sword...",
		},
	];

	RANDOM_QUOTES_SWORD_NO =
	[
		{
			text: "I don't need this crap.",
		},
		{
			text: "Nope, already have this.",
		},
		{
			text: "I'm wielding a far better sword.",
		},
	];

	RANDOM_QUOTES_SWORD_MISSING =
	[
		{
			text: "I don't have a sword.",
		},
		{
			text: "I'm not hitting them with my hand.",
		},
		{
			text: "Should find a sword.",
		},
	];

	RANDOM_QUOTES_ARMOR =
	[
		{
			text: 'Feeling stronger now!',
		},
		{
			text: 'New armor, this should help.',
		},
		{
			text: "Looks heavy...",
		},
	];

	RANDOM_QUOTES_FIREBALL =
	[
		{
			text: 'Fireball scroll, like that.',
		},
		{
			text: "More help to burn them.",
		},
		{
			text: "Can't have enough fire!",
		},
	];

	RANDOM_QUOTES_NO_SCROLLS =
	[
		{
			text: 'I do not have any scrolls left.',
		},
		{
			text: "Can't remember, need scrolls.",
		},
		{
			text: "Already out of scrolls!?",
		},
	];

	SPELL_ID =
	{
		FIREBALL: 0,
		BOMB: 1,
		SHIELD: 2,
		SWORD: 3,
		LIGHTNING: 4,
		ICESPLITTERS: 5,
		SUNBEAM: 6,
		WATERFLOATING: 7,
		RUNNING: 8,
	};

	ITEMS =
	{
		HEALTH_POTION: 0,
		SPEED_SCROLL: 1,
		COINS: 2,
	};

	MESSAGE_TYPE =
	{
		NORMAL: 0,
		BAD: 1,
		GOOD: 2,
	};

	twws_player = null;
	twws_player_data = null;

	twws_init_player_data = function()
	{
		twws_player_data =
		{
			teleport_pos: null,
			teleport_direction: null,

			health: 3,
			max_health: 3,

			health_potions: 1,

			sword_level: -1,

			spell_scrolls: [ 10, 1, 1, -1, 0, 0, 0, 0, 2 ],
			current_spell_nr: 0,

			running_remaining: 0,

			coins: 0,
			score: 0,
			kills: 0,

			keys: [ ],
		};
	};

	twws_calc_final_score = function()
	{
		return twws_player_data.score + twws_player_data.coins * 100 + twws_player_data.kills * 10;
	};

	twws_piwik_tracker = null;

	twws_piwik_init = function(id)
	{
		if (twws_piwik_base_url)
		{
			twws_piwik_tracker = Piwik.getTracker(twws_piwik_base_url + "piwik.php", id);
			twws_piwik_tracker.enableLinkTracking();
		}
	};

	twws_piwik_track = function(title)
	{
		if (twws_piwik_tracker)
			twws_piwik_tracker.trackPageView(title);
	};
});
