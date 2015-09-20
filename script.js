window.addEventListener("load", function() {

  var game_width = 500;
  var game_height = 300;

  var game_live = true;

  //enemies
  var enemies = [
  	{
  		x:100,
  		y:100,
  		speedY:1,
  		w:40,
  		h:40,
  	},
  {
  		x:200,
  		y:50,
  		speedY:1.5,
  		w:40,
  		h:40,
  	},
  {
  		x:300,
  		y:150,
  		speedY:1,
  		w:40,
  		h:40,
  	},
  {
  		x:400,
  		y:100,
  		speedY:1.5,
  		w:40,
  		h:40,
  	},
  
  ];
  
  //players
  var player = 
  	{
  		x:10,
  		y:120,
  		speedX:2,
  		w:40,
  		h:40,
  		isMoving:false,
  	};

  var goal = 
  	{
  		x:460,
  		y:120,
  		w:40,
  		h:60,
  	};

  //move player
  var movePlayer = function() {
  	player.isMoving = true;
  };

  //stop player
  var stopPlayer = function() {
  	player.isMoving = false;
  };


  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");

  canvas.addEventListener("mousedown", movePlayer);
  canvas.addEventListener("mouseup", stopPlayer);

  var sprites = {};
  var load = function() {
  	sprites.background = new Image();
  	sprites.background.src = 'images/floor.png';

  	sprites.player = new Image();
  	sprites.player.src = 'images/hero.png';

  	sprites.enemy = new Image();
  	sprites.enemy.src = 'images/enemy.png';

  	sprites.goal = new Image();
  	sprites.goal.src = 'images/chest.png';
  }

 
  var update = function() {

  	//check if you won the game
    if(checkCollision(player, goal)) {
    	game_live = false;
    	alert('Congratulation: You won the game');

    	window.location ="";
    }

  	if(player.isMoving) {
  		player.x += player.speedX;
  	}

  	//update enemies
    enemies.forEach(function(element, index){
    	//check collision
    	if(checkCollision(player, element)) {
    		game_live = false;
    		alert('Game Over');

    		window.location ="";
    	}

    	//move enemies
    	element.y += element.speedY;

    	if(element.y <= 10) {
    		element.speedY *= -1;
    	}
    	else if(element.y >= game_height - 50) {
    		element.speedY *= -1;
    	}
    });

  };

  var draw = function() {
    ctx.clearRect(0, 0, game_width, game_height);

    //draw background
    ctx.drawImage(sprites.background, 0, 0);

    //player
    ctx.drawImage(sprites.player, player.x, player.y);

    //Goal
    ctx.drawImage(sprites.goal, goal.x, goal.y);

    //enemies
    enemies.forEach(function(element, index){
    	ctx.drawImage(sprites.enemy, element.x, element.y);
    });
  };

  //check collision
  var checkCollision = function(rect1, rect2) {
  	var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
  	var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.w, rect2.w);
  	return closeOnWidth && closeOnHeight;
  };

  var step = function () {
    update();
    draw();
    if(game_live = true) {
   		window.requestAnimationFrame(step);
   	}
  };

  load();
  step();

});