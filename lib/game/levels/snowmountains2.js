ig.module( 'game.levels.snowmountains2' )
.requires('impact.image','game.entities.player','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.zombie','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.coins','game.entities.level-exit','game.entities.speed-parchment','game.entities.shield-parchment','game.entities.speed-parchment','game.entities.shield-parchment','game.entities.speed-parchment','game.entities.coins','game.entities.mage','game.entities.mage','game.entities.mage','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.imp','game.entities.necro','game.entities.conjurer')
.defines(function(){
LevelSnowmountains2=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":457,"y":937,"settings":{"direction":2}},{"type":"EntityZombie","x":721,"y":73},{"type":"EntityZombie","x":753,"y":33},{"type":"EntityZombie","x":801,"y":113},{"type":"EntityZombie","x":841,"y":65},{"type":"EntityZombie","x":793,"y":57},{"type":"EntityZombie","x":745,"y":169},{"type":"EntityZombie","x":793,"y":241},{"type":"EntityZombie","x":705,"y":225},{"type":"EntityZombie","x":641,"y":169},{"type":"EntityZombie","x":705,"y":329},{"type":"EntityZombie","x":825,"y":273},{"type":"EntityZombie","x":737,"y":281},{"type":"EntityZombie","x":545,"y":89},{"type":"EntityZombie","x":841,"y":777},{"type":"EntityZombie","x":817,"y":809},{"type":"EntityZombie","x":833,"y":841},{"type":"EntityZombie","x":745,"y":865},{"type":"EntityZombie","x":737,"y":817},{"type":"EntityZombie","x":697,"y":833},{"type":"EntityZombie","x":785,"y":841},{"type":"EntityZombie","x":873,"y":801},{"type":"EntityZombie","x":849,"y":705},{"type":"EntityZombie","x":809,"y":713},{"type":"EntityZombie","x":649,"y":833},{"type":"EntityZombie","x":617,"y":873},{"type":"EntityZombie","x":641,"y":801},{"type":"EntityZombie","x":673,"y":777},{"type":"EntityZombie","x":713,"y":753},{"type":"EntityZombie","x":737,"y":777},{"type":"EntityZombie","x":657,"y":737},{"type":"EntityZombie","x":521,"y":681},{"type":"EntityZombie","x":553,"y":553},{"type":"EntityZombie","x":457,"y":633},{"type":"EntityZombie","x":737,"y":585},{"type":"EntityZombie","x":673,"y":457},{"type":"EntityZombie","x":625,"y":409},{"type":"EntityZombie","x":577,"y":425},{"type":"EntityZombie","x":505,"y":345},{"type":"EntityZombie","x":481,"y":401},{"type":"EntityZombie","x":217,"y":489},{"type":"EntityZombie","x":177,"y":449},{"type":"EntityZombie","x":209,"y":417},{"type":"EntityZombie","x":65,"y":569},{"type":"EntityZombie","x":105,"y":737},{"type":"EntityZombie","x":177,"y":689},{"type":"EntityZombie","x":265,"y":657},{"type":"EntityZombie","x":289,"y":761},{"type":"EntityZombie","x":97,"y":841},{"type":"EntityZombie","x":401,"y":761},{"type":"EntityZombie","x":257,"y":257},{"type":"EntityZombie","x":305,"y":217},{"type":"EntityZombie","x":241,"y":161},{"type":"EntityZombie","x":185,"y":153},{"type":"EntityZombie","x":241,"y":321},{"type":"EntityZombie","x":417,"y":177},{"type":"EntityZombie","x":385,"y":353},{"type":"EntityZombie","x":441,"y":73},{"type":"EntityZombie","x":897,"y":425},{"type":"EntityZombie","x":889,"y":361},{"type":"EntityZombie","x":849,"y":329},{"type":"EntityZombie","x":865,"y":297},{"type":"EntityZombie","x":881,"y":241},{"type":"EntityZombie","x":849,"y":401},{"type":"EntityCoins","x":274,"y":882},{"type":"EntityCoins","x":266,"y":858},{"type":"EntityCoins","x":250,"y":882},{"type":"EntityCoins","x":306,"y":890},{"type":"EntityCoins","x":338,"y":882},{"type":"EntityCoins","x":322,"y":906},{"type":"EntityCoins","x":266,"y":898},{"type":"EntityCoins","x":242,"y":906},{"type":"EntityCoins","x":226,"y":898},{"type":"EntityLevelExit","x":576,"y":0,"settings":{"size":{"x":368,"y":16},"level":"snowmountains3"}},{"type":"EntitySpeedParchment","x":290,"y":898},{"type":"EntityShieldParchment","x":410,"y":874},{"type":"EntitySpeedParchment","x":522,"y":866},{"type":"EntityShieldParchment","x":298,"y":122},{"type":"EntitySpeedParchment","x":298,"y":154},{"type":"EntityCoins","x":322,"y":146},{"type":"EntityMage","x":81,"y":777},{"type":"EntityMage","x":577,"y":201},{"type":"EntityMage","x":201,"y":201},{"type":"EntityImp","x":680,"y":544},{"type":"EntityImp","x":784,"y":648},{"type":"EntityImp","x":344,"y":560},{"type":"EntityImp","x":112,"y":584},{"type":"EntityImp","x":192,"y":728},{"type":"EntityImp","x":176,"y":464},{"type":"EntityImp","x":184,"y":304},{"type":"EntityImp","x":408,"y":216},{"type":"EntityImp","x":184,"y":120},{"type":"EntityImp","x":400,"y":32},{"type":"EntityImp","x":552,"y":144},{"type":"EntityImp","x":616,"y":272},{"type":"EntityImp","x":768,"y":144},{"type":"EntityImp","x":720,"y":120},{"type":"EntityImp","x":744,"y":240},{"type":"EntityImp","x":736,"y":392},{"type":"EntityImp","x":856,"y":584},{"type":"EntityNecro","x":689,"y":801},{"type":"EntityConjurer","x":785,"y":801}],"layer":[{"name":"map","width":60,"height":60,"linkWithCollision":false,"visible":1,"tilesetName":"media/tiles.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,82,82],[82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,4,4,50,4,4,82,4,4,4,4,81,82,82,82,4,4,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,4,82],[82,82,82,4,4,82,4,82,82,82,82,82,82,82,82,4,6,82,82,82,82,82,82,4,4,4,4,6,4,4,4,4,4,4,4,82,82,82,4,50,82,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,4,4,82],[82,82,82,82,4,4,6,82,82,4,4,82,82,82,4,60,4,4,82,4,4,4,4,4,4,81,4,4,4,4,4,4,4,4,4,81,4,82,4,4,82,4,50,50,50,50,50,50,50,50,50,50,50,50,50,50,4,82,82,82],[82,82,82,82,82,59,54,82,82,4,4,4,82,82,54,54,4,4,4,4,60,4,4,4,4,4,4,4,4,4,81,49,4,6,4,4,4,82,82,81,82,4,4,50,50,50,50,50,50,50,50,50,50,50,50,50,50,4,4,82],[82,82,82,82,82,82,67,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,70,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82,82,82,82,4,4,4,4,50,50,50,50,50,50,50,50,50,50,50,6,4,82],[82,82,82,4,4,82,66,51,51,51,51,51,51,51,51,51,51,84,75,76,75,75,66,53,82,82,82,82,82,4,81,4,4,4,4,4,4,4,4,82,82,81,81,4,4,4,4,50,50,50,50,50,50,50,50,50,4,4,4,82],[82,82,82,4,4,60,66,84,51,51,84,51,51,84,51,51,51,84,51,51,77,77,66,55,82,82,4,4,82,82,50,4,4,49,4,4,4,4,4,4,82,82,82,4,4,4,4,50,50,50,50,50,50,4,50,50,4,4,82,82],[82,82,82,4,60,61,66,84,51,51,84,51,51,84,51,51,51,84,51,51,51,77,66,82,82,4,4,4,82,82,82,4,4,4,4,4,4,81,4,4,4,4,82,82,4,4,50,50,4,4,50,50,50,4,50,50,50,4,82,82],[82,82,82,4,4,57,66,51,51,51,51,51,51,51,51,51,51,84,51,51,51,51,66,82,4,4,4,4,4,82,82,4,4,4,4,4,4,4,81,4,4,4,6,4,50,50,50,4,4,4,4,4,4,4,4,50,50,4,82,82],[82,82,4,4,4,62,66,51,51,51,51,51,51,51,51,51,51,84,51,51,51,75,66,82,4,4,81,4,4,4,82,4,4,4,4,4,4,4,4,4,4,4,4,4,50,50,50,50,4,4,4,4,4,82,6,81,4,82,82,82],[82,82,82,4,4,60,66,84,51,51,84,51,51,84,51,51,51,84,51,51,77,51,66,53,4,4,4,4,4,4,82,82,4,4,4,4,4,81,4,4,4,4,4,4,4,4,4,50,50,50,4,82,82,82,82,82,82,82,82,82],[82,82,82,4,61,60,66,51,51,51,51,51,51,51,51,51,51,84,51,51,51,51,66,53,4,81,4,4,4,4,82,82,4,4,50,4,4,4,4,4,4,49,81,4,4,4,4,4,4,50,4,4,82,82,82,82,82,82,82,82],[82,82,4,4,62,60,66,51,51,51,51,51,51,51,51,51,51,84,51,51,51,51,66,60,4,4,4,6,4,82,82,82,4,4,4,6,4,4,4,4,4,4,4,4,4,49,4,4,4,50,4,4,82,4,81,4,4,82,82,82],[82,82,82,4,4,59,66,84,51,51,84,51,51,84,51,51,51,51,51,51,51,51,66,61,4,4,4,4,4,82,82,82,82,4,4,4,4,4,4,82,82,4,4,4,4,4,4,4,4,4,50,4,4,4,4,81,6,4,82,82],[82,82,82,82,4,57,66,84,51,51,84,51,51,84,51,51,51,51,51,51,51,51,66,62,61,4,4,4,82,82,82,82,82,82,4,4,4,4,82,82,4,82,4,4,4,4,4,6,4,4,4,4,4,81,4,4,4,4,82,82],[82,82,82,4,4,57,66,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,66,63,4,4,4,4,82,82,82,82,82,82,82,4,4,4,4,4,4,4,82,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82],[82,82,4,4,4,58,74,64,64,64,64,64,64,64,65,52,52,52,69,64,64,64,72,4,4,4,82,82,82,82,4,4,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,50,4,4,4,4,4,4,82,82,82],[82,82,82,4,4,4,58,52,55,4,63,4,4,4,4,4,87,4,4,4,60,4,4,4,4,82,82,82,82,4,4,4,4,82,82,4,4,50,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,50,82,82,82,82],[82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,4,87,4,4,4,4,4,4,4,82,82,4,4,82,82,4,4,4,4,82,82,4,4,4,4,4,4,49,4,4,4,4,49,4,4,4,82,4,4,4,4,4,4,82,82],[82,82,4,4,4,4,82,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82,4,4,4,81,4,82,82,82,4,4,4,4,4,4,4,50,4,4,4,4,4,82,4,4,4,4,4,81,4,82],[82,82,50,4,4,4,4,82,82,4,4,4,4,4,4,4,4,4,4,81,4,4,4,4,4,4,4,4,4,82,4,4,4,4,4,4,4,82,4,4,4,4,4,4,4,4,81,4,82,82,82,82,4,4,4,4,4,81,4,82],[82,4,4,4,4,4,4,4,4,4,82,4,82,82,4,4,87,4,4,4,4,4,6,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82,82,4,4,4,4,4,4,4,4,4,4,82,82,82,82,82,4,81,4,4,4,82],[82,4,4,4,4,6,4,4,4,82,82,82,82,4,4,4,4,4,4,82,4,4,4,4,4,4,81,4,4,4,4,4,4,4,4,4,4,4,82,82,82,82,4,4,4,4,4,4,4,82,82,82,82,4,4,4,4,6,82,82],[82,82,4,4,4,4,4,82,82,82,4,4,4,4,4,81,4,4,4,82,82,4,4,6,4,87,4,4,4,4,4,4,4,4,82,4,4,4,4,4,4,4,82,82,4,4,4,4,4,4,4,82,4,4,4,4,4,4,82,82],[82,82,4,82,4,82,82,82,4,4,4,4,4,4,4,4,82,82,82,82,82,82,4,4,4,4,4,4,4,4,6,4,4,4,4,4,4,4,4,4,4,81,4,82,4,4,4,87,4,4,4,82,4,4,50,4,4,4,82,82],[82,82,82,82,82,82,4,4,4,4,4,81,4,4,87,4,4,82,82,82,82,82,82,82,4,4,50,87,4,4,4,4,4,4,4,4,50,4,4,4,4,4,4,82,82,4,4,4,4,50,4,82,4,4,4,4,4,4,4,82],[82,82,82,82,4,4,82,4,81,81,4,4,4,4,4,4,4,4,82,82,82,82,82,4,4,4,4,4,4,4,4,82,82,4,4,4,4,4,4,82,4,4,4,4,82,4,4,4,4,4,4,82,82,4,4,4,81,4,4,82],[82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,50,4,82,82,82,82,82,82,82,4,4,4,4,4,4,82,82,82,82,82,4,4,4,4,4,81,4,4,4,82,82,4,4,4,4,4,4,82,82,4,4,81,4,82,82],[82,82,82,4,6,4,4,4,4,4,4,4,4,4,50,50,82,82,82,82,82,82,82,82,82,82,4,4,4,82,82,82,82,82,82,82,82,4,4,4,4,4,4,4,4,82,82,82,4,4,4,4,4,82,82,82,82,81,82,82],[82,82,82,4,4,4,4,4,6,4,4,4,4,4,4,4,4,82,82,82,82,82,82,4,4,4,4,4,4,82,82,82,82,82,82,82,82,82,4,4,4,4,4,4,82,82,82,4,4,4,87,4,4,4,4,81,82,82,82,82],[82,82,4,4,4,4,81,4,4,82,4,4,4,4,4,4,4,82,82,82,82,82,82,82,4,4,4,4,82,82,82,82,82,82,82,82,82,82,82,4,4,4,82,82,82,82,82,82,4,4,4,4,4,4,4,81,4,82,82,82],[82,82,4,4,4,4,82,82,82,82,4,4,50,4,4,4,4,4,82,82,82,82,82,4,4,4,4,6,4,82,82,82,82,4,82,4,6,82,82,82,4,4,4,82,82,82,82,82,82,82,4,4,4,4,4,4,4,82,82,82],[82,4,4,4,4,4,4,82,82,82,82,4,4,4,4,4,4,4,4,82,82,82,4,4,4,49,4,4,82,82,82,82,82,4,4,4,4,82,82,82,4,4,6,4,4,4,4,4,82,82,82,4,4,4,4,4,6,82,82,82],[82,4,4,4,4,4,4,82,82,4,82,82,4,4,82,4,4,4,4,82,82,4,4,4,87,4,4,4,82,82,82,82,4,4,4,6,4,82,82,82,4,4,4,6,4,6,4,4,4,4,82,4,87,81,4,50,4,4,82,82],[82,82,50,4,4,4,4,4,4,4,4,82,82,4,82,82,82,4,82,82,4,4,4,4,4,4,82,82,82,82,82,82,82,4,4,4,4,82,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82,82],[82,82,4,4,4,4,4,4,4,4,4,4,82,82,82,82,82,82,82,82,4,4,4,4,4,82,82,4,50,4,82,82,82,4,4,6,4,4,82,82,82,82,4,4,4,4,4,50,4,4,4,4,4,4,4,4,4,4,82,82],[82,4,4,6,81,4,4,4,4,4,4,4,4,82,82,4,4,82,82,82,4,4,4,4,82,82,4,4,4,4,4,82,82,82,4,4,4,81,4,82,82,82,82,81,4,4,4,4,4,4,4,4,87,4,4,4,50,4,82,82],[82,4,4,4,4,4,4,4,4,4,4,4,4,4,82,4,4,4,4,82,4,4,4,82,82,4,4,81,4,4,50,4,4,82,82,4,4,4,4,82,4,4,82,4,81,4,4,4,4,4,4,82,4,4,4,4,4,4,82,82],[82,4,4,82,82,4,4,82,82,4,4,4,4,81,4,4,4,4,4,4,4,4,4,82,82,82,82,4,81,4,4,4,4,82,82,82,4,50,4,4,4,81,4,82,82,4,6,4,4,4,4,82,4,4,4,4,4,4,4,82],[82,4,82,82,82,82,4,4,4,82,4,4,4,4,4,4,4,4,4,4,4,4,82,82,82,82,82,82,4,4,4,4,4,4,82,82,82,4,4,4,4,4,4,4,82,82,4,4,4,4,4,4,81,4,4,4,4,4,4,82],[82,82,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,49,49,4,4,4,82,82,4,4,4,4,6,4,4,4,81,4,82,82,4,4,4,6,4,4,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,82],[82,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82,82,4,4,4,4,4,4,4,4,4,4,82,82,4,4,4,87,4,82,4,82,82,4,4,4,4,4,4,4,4,82,82,81,4,82],[82,82,82,4,4,50,4,81,4,4,4,4,4,4,4,4,4,4,4,82,4,4,4,4,82,82,82,4,4,82,4,4,4,4,4,4,4,4,4,81,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,82,82,4,82],[82,82,82,4,4,50,4,4,6,4,87,4,4,4,4,82,4,4,82,82,82,4,4,4,4,4,4,82,82,82,82,4,82,4,4,4,4,4,4,4,4,4,4,50,4,4,4,82,4,4,4,4,4,4,4,4,4,82,82,82],[82,82,82,82,4,4,4,4,4,4,4,4,4,4,4,82,82,82,4,4,82,82,4,4,4,82,4,4,4,4,82,82,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,82,82,4,4,4,81,4,4,81,4,4,82,82],[82,82,82,82,82,4,4,4,4,4,4,4,4,4,4,4,4,4,81,4,4,82,4,81,4,4,4,4,6,4,4,4,82,82,82,82,81,4,4,4,4,4,4,4,4,4,82,82,82,82,4,4,4,4,4,4,82,82,82,82],[82,82,82,82,4,4,4,4,4,82,4,4,4,4,6,4,4,4,4,4,4,82,82,4,4,4,4,4,4,4,4,4,82,82,82,4,4,4,6,4,4,4,4,4,4,4,4,4,82,4,4,4,4,4,4,4,6,4,82,82],[82,82,82,4,4,4,4,87,4,82,82,4,4,4,4,4,4,4,4,4,4,4,82,4,4,6,4,87,4,4,4,4,4,82,82,50,4,4,4,4,4,4,4,4,4,81,4,4,4,82,6,4,4,6,4,4,4,4,82,82],[82,82,4,4,4,4,81,4,4,4,82,82,82,4,4,4,81,82,4,50,4,4,82,82,4,4,4,4,4,4,82,4,4,4,82,4,4,81,82,4,4,6,4,4,4,4,4,4,4,6,6,6,4,4,6,6,4,4,4,82],[82,82,4,4,4,4,4,4,4,4,82,82,82,82,82,82,82,82,4,4,4,4,4,82,4,82,4,4,4,4,4,4,4,4,82,82,4,82,82,4,4,4,4,4,4,4,6,4,4,81,6,6,6,4,6,4,4,82,82,82],[82,82,82,4,73,85,85,73,64,73,4,82,82,82,82,82,82,82,82,4,6,4,82,82,82,82,82,4,87,4,4,4,81,4,81,82,82,82,82,82,4,4,4,6,4,4,4,4,4,4,4,4,6,6,4,6,4,4,82,82],[82,82,82,82,66,79,79,79,79,66,4,82,82,82,82,82,4,82,82,82,4,4,82,82,82,82,4,4,87,4,4,4,4,81,81,82,82,82,4,4,4,81,4,6,6,6,4,6,4,4,4,6,6,6,4,6,6,6,82,82],[82,82,82,82,66,79,79,79,79,66,82,82,82,82,82,82,4,4,82,82,82,4,4,82,82,82,4,4,4,4,4,4,81,4,82,82,82,82,4,4,4,6,4,4,6,6,4,4,4,6,4,4,6,4,4,82,4,4,4,82],[82,82,82,4,66,79,79,79,79,73,82,82,82,82,82,4,4,4,82,82,4,82,82,82,82,4,4,4,4,4,4,82,81,4,82,82,4,4,4,4,4,4,4,82,4,6,6,4,4,4,6,4,4,6,82,82,82,4,82,82],[82,82,82,4,66,79,79,79,79,86,4,4,82,82,4,4,4,4,4,4,4,4,82,82,82,4,4,4,87,4,4,81,4,82,82,4,4,4,81,50,4,4,82,82,4,6,4,4,6,4,4,6,4,4,4,82,82,82,82,82],[82,82,4,6,66,79,79,79,79,86,50,4,4,4,4,4,4,4,4,4,6,4,82,82,82,4,4,4,4,4,4,4,82,82,4,4,50,4,4,4,4,82,82,82,4,6,82,4,4,4,82,4,4,6,4,4,4,82,82,82],[82,82,4,4,73,64,64,64,64,73,4,82,4,4,4,4,82,4,82,4,4,82,82,82,82,82,4,4,4,87,4,82,82,82,4,4,4,82,4,4,82,82,82,82,82,82,82,4,82,4,82,82,4,4,4,6,82,82,82,82],[82,82,82,82,4,4,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,4,4,4,4,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82],[82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,4,4,4,4,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82,82]]},{"name":"collision","width":60,"height":60,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,1,1,0,0,1,1,1,0,1,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,0,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,1,1,1,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1],[1,1,1,0,0,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1],[1,1,1,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1],[1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1],[1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1],[1,0,0,0,0,0,0,1,1,0,1,1,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1],[1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],[1,0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1],[1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,0,1,0,0,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1],[1,1,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,1,1],[1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1,0,1,1,0,0,0,0,1,1,1,1],[1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelSnowmountains2Resources=[new ig.Image('media/tiles.png')];
});