window.keys = [];
window.playerKeys = [[65,90,69], [73,79,80], [86, 66, 78], [87, 88, 67]];


function keyDown(e)
{

	keys[e.keyCode] = true;
}
function keyUp(e)
{
	
	for (var i = 0 ; i < 4 ; i++)
		{
			if((PlayersBool[0] && i == 0)||(PlayersBool[1] && i == 1)||(PlayersBool[2] && i == 2)||(PlayersBool[3] && i == 3))
			spellInput(i, playerKeys[i])
		}

	delete keys[e.keyCode];
}

function spellInput(playerNum, spellKeys)
{
	console.log(playerNum)
	if (keys[spellKeys[0]])
	{
		console.log("SORT 1 du JOUEUR " + (playerNum+1));
		attack((playerNum+1), 1);
	}
	else if (keys[spellKeys[1]])
	{
		console.log("SORT 2 du JOUEUR " + (playerNum+1));
		attack((playerNum+1), 2);
	}
	else if (keys[spellKeys[2]])
	{
		console.log("SORT 3 du JOUEUR " + (playerNum+1));
		attack((playerNum+1), 3);
	}
}