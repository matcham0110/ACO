// GENERATE GRAPHICLY AND IN MEMORY

function		Map (mapposX, mapposY) {

	function	Case(myposX, myposY, mapposX, mapposY, type)
		{
			this.posX = myposX;
			this.posY = myposY;
			this.pheromoneV1 = 0;
			this.pheromoneV2 = 0;
			if (type == "BLOCK")
				this.case_state = "BLOCK";
			else
				this.case_state = initialiseGetAState(mapposX, mapposY);
			
			function	initialiseGetAState(mapposX, mapposY)
				{
					var state;
					var  rand = Math.floor((Math.random() * 10) + 1);
						if  (rand == 1 || rand == 2)
							state = "BLOCK";
						else
							state = "BLANK";
					 if (myposX == 1 && myposY == 1)
							state = "DEPARTURE";
					if (myposX == 8 && myposY == 8) // POSITION FOR FOOD
							state = "FOOD";
					return (state);
				}
			this.getCaseState = function ()
			{
				return (this.case_state);
			}
		}

this.liste = new Array();

var incremental = 1;
var height = 0;
var width = 0;

	while (height < (mapposX + 1))
		{
			this.liste[height] = new Array();
				while (width < (mapposY + 1))
				{
					if (height == 0 || height == mapposX || width == 0 || width == mapposY)
						{
							var unit = new Case (height, width, mapposY, mapposY, "BLOCK");
							this.liste[height][width] = unit;
							draw(unit.case_state, incremental);
							incremental++;
							width++;
						}
					else 
						{
							var unit = new Case (height, width, mapposY, mapposY, "NORMAL");
							this.liste[height][width] = unit;
							draw(unit.case_state, incremental);
							incremental++;
							width++;
						}
				}
			height++;
			width = 0;
		}
	function	draw(state, incremental)
					{
						switch(state) {
								case "BLOCK":
									document.getElementById("td"+incremental).innerHTML = "||";
									break;
								case "BLANK":
									document.getElementById("td"+incremental).innerHTML = ".";
									break;
								case "DEPARTURE":
									document.getElementById("td"+incremental).innerHTML = "D";
									break;
								case "FOOD":
									document.getElementById("td"+incremental).innerHTML = "F";
									break;
							}
					}
		this.getPheromoneV1 = function(x, y)
			{
				if (x > 0 && y > 0 && x <= 10 && y <= 9)
					{
						var uniter = this.liste[x][y];
						return (uniter.pheromoneV1);
					}
				else
					return (0);
			}
		this.setPheromoneV1 = function(number,x , y)
			{
				if (x > 0 && y > 0 && x <= 10 && y <= 9)
					{
						var uniter = this.liste[x][y];
						uniter.pheromoneV1 = number;
					}
				return;
			}
		this.setPheromoneV2 = function(number,x ,y)
			{
				if (x > 0 && y > 0 && x <= 10 && y <= 9)
					{
						var uniter = this.liste[x][y];
						uniter.pheromoneV2 = number;
					}
				return;
			}
		this.getListe = function ()
			{
				return (this.liste);
			}
		this.getStateOfThisCase = function(x, y)
			{
				if (x > 0 && y > 0 && x <= 10 && y <= 9)
					{
						var uniter = this.liste[x][y];
							return (uniter.getCaseState());
					}
				else
					return("BLOCK");
			}
		this.getPheromoneV2 = function(x, y)
			{
				if (x > 0 && y > 0 && x <= 10 && y <= 9)
					{
						var uniter = this.liste[x][y];
						return (uniter.pheromoneV2);
					}
				else
					return (0);
			}
}