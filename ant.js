// AN ANT

function 	Ant(map, exploration, confiance)
		{
			this.state = "EMPTY";
			this.posX = 1;
			this.posY = 1;
			this.pheronome = 0;
			this.food_carry = 0;
			this.food_accumulate = 0;
			this.alive = 1;
			this.exploration = exploration;
			this.confiance = confiance;
			this.evaporation = 0.9999;
			this.bruit = 0.7;
			this.nb_move_aller = 0;
			this.nb_move_retour = 0;
			
			this.deliver	 = function ()
				{
					if (map.getStateOfThisCase(this.posX,this.posY) == "DEPARTURE")
						{
							this.food_accumulate += this.food_carry;
							this.food_carry = 0;
							this.state = "EMPTY";
						}
					else
						return;
				}
				
			this.pickFood	 = function ()
				{
					if (map.getStateOfThisCase(this.posX,this.posY) == "FOOD")
						{
							this.food_carry = 10;
							this.state = "FULL";
						}
					else
						return;
				}
				
		//////////////////// MAX /////////////////////
				
			this.maxScanNext = function (namephero, map)
				{			
					if (namephero == "V1")	
						{
							var case_up_v1 = map.getPheromoneV1((this.posX - 1), this.posY);
							var case_down_v1 = map.getPheromoneV1((this.posX + 1), this.posY);
							var case_right_v1 = map.getPheromoneV1(this.posX, this.posY + 1);
							var case_left_v1 = map.getPheromoneV1(this.posX, this.posY - 1);
						
							var max_pheromone = Math.max(case_up_v1, case_down_v1, case_right_v1, case_left_v1);
							return(max_pheromone);
						}
					else if (namephero == "V2")
						{
							var case_up_v2 = map.getPheromoneV2((this.posX - 1), this.posY);
							var case_down_v2 = map.getPheromoneV2((this.posX + 1), this.posY);
							var case_right_v2 = map.getPheromoneV2(this.posX, (this.posY + 1));
							var case_left_v2 = map.getPheromoneV2(this.posX, (this.posY - 1));
								
							var max_pheromone = Math.max(case_up_v2, case_down_v2, case_right_v2, case_left_v2);
							return(max_pheromone);
						}
				}
			this.pickTheGoodMove = function (namephero, map)
				{	
					if (namephero == "V1")	
						{
							var next_move = this.getMovePossibilityPhV1(map);
							return(next_move);
						}
					else if (namephero == "V2")
						{
							var next_move = this.getMovePossibilityPhV2(map);
							return(next_move);
						}
				}
			//////////////////// !MAX /////////////////////
		
				Array.prototype.average = function () {
					var sum = 0, j = 0; 
				   for (var i = 0; i < this.length, isFinite(this[i]); i++) { 
						  sum += parseFloat(this[i]); ++j; 
					} 
				   return j ? sum / j : 0; 
				};
				
			//////////////////// AVG /////////////////////
			
			this.avgScanNext = function (namephero, map)
				{
					if (namephero == "V1")	
						{
							var case_up_v1 = map.getPheromoneV1((this.posX - 1), this.posY);
							var case_down_v1 = map.getPheromoneV1((this.posX + 1), this.posY);
							var case_right_v1 = map.getPheromoneV1(this.posX, (this.posY + 1));
							var case_left_v1 = map.getPheromoneV1(this.posX, (this.posY - 1));
							var avg_pheromone = [case_up_v1, case_down_v1, case_right_v1, case_left_v1].average();
						
							return(avg_pheromone);
						} 
						else if (namephero == "V2")
						{
							var case_up_v2 = map.getPheromoneV2((this.posX - 1), this.posY);
							var case_down_v2 = map.getPheromoneV2((this.posX + 1), this.posY);
							var case_right_v2 = map.getPheromoneV2(this.posX, (this.posY + 1));
							var case_left_v2 = map.getPheromoneV2(this.posX, (this.posY - 1));
							
							var avg_pheromone = [case_up_v2, case_down_v2, case_right_v2, case_left_v2].average();
							return(avg_pheromone);
						 }
				}
			
			// => ////////////////////////////// FIRST STEP ////////////////////////
			this.majPheromone = function (map)
				{
					var case_state = map.getStateOfThisCase(this.posX,this.posY);
					switch(case_state) {
										case "BLOCK":
											map.setPheromoneV1(-1, this.posX, this.posY);
											map.setPheromoneV2(-1, this.posX, this.posY);
										break;
										case "BLANK":
											map.setPheromoneV1(this.evaporation * (((this.bruit * this.maxScanNext("V1", map)) + (1 - this.bruit) * this.avgScanNext("V1", map))), this.posX, this.posY);
											map.setPheromoneV2(this.evaporation * (((this.bruit * this.maxScanNext("V2", map)) + (1 - this.bruit) * this.avgScanNext("V2", map))), this.posX, this.posY);
										break;
										case "FOOD":
											map.setPheromoneV1(1, this.posX, this.posY);
											break;
										case "DEPARTURE":
											map.setPheromoneV2(1, this.posX, this.posY);	
										break;
									}
				var blocknumber = (this.posX * 11 + this.posY) + 1;
				if (this.confiance > 1)
					document.getElementById("td"+blocknumber).innerHTML = "<span style='color: red;'><strong>" + ((map.getPheromoneV1(this.posX, this.posY)) * 10).toFixed(2) +  "</strong></span><b> / </b><span style='color: blue;'><strong>" + ((map.getPheromoneV2(this.posX, this.posY)) * 10).toFixed(2) +"</strong></span>";
				else
					document.getElementById("td"+blocknumber).innerHTML = "<span style='color: red;'>" + ((map.getPheromoneV1(this.posX, this.posY)) * 10).toFixed(2) +  "</span><b> / </b><span style='color: blue;'>" + ((map.getPheromoneV2(this.posX, this.posY)) * 10).toFixed(2) +"</span>";
				}
				
					// => ////////////////////////////// SECOND STEP ////////////////////////	
			this.moving = function (map)
				{
					var proba = Math.floor((Math.random() * 10) + 1);
					if (this.getState() == "FULL")
						{ 
							if (proba >= (this.confiance * 10))
									var next_move = this.moveRandPossible(map);
							else
							{
								var next_move = this.pickTheGoodMove("V2", map);;
								this.moveToThisCase(next_move);						
							}
							return (map.getStateOfThisCase(this.posX,this.posY));
						}
					else 
						{
							if (proba >= (this.exploration * 10))
									var next_move = this.moveRandPossible(map);
							else
								{
									var next_move = this.pickTheGoodMove("V1", map);
									this.moveToThisCase(next_move);
								}
							return (map.getStateOfThisCase(this.posX,this.posY))
						}
				}
			///////////////////////////////////////////////////////////
			
			this.getState = function () { return (this.state); } 
			this.getPosX = function () { return (this.posX); } 
			this.getPosY = function () { return (this.posY); } 
			this.setX = function(x) { this.posX == x;}
			this.setY = function(y) { this.posY == y;}
			
			//////////////////////////// GET MOVE POSSIBILITY ///////////////////
			
			this.getMovePossibilityName = function (map)
				{
					var tab_pos = new Array();
					
					var case_state_down = map.getStateOfThisCase((this.posX + 1),this.posY);
					var case_state_up = map.getStateOfThisCase((this.posX - 1),this.posY);
					var case_state_right = map.getStateOfThisCase(this.posX,(this.posY + 1));
					var case_state_left = map.getStateOfThisCase(this.posX, (this.posY - 1));
					if (case_state_down == "BLANK" || case_state_down == "FOOD" || case_state_down == "DEPARTURE")
							tab_pos.push("DOWN");
					if (case_state_up == "BLANK" || case_state_up == "FOOD" || case_state_up == "DEPARTURE")
							tab_pos.push("UP");
					if (case_state_right == "BLANK" || case_state_right == "FOOD" || case_state_right == "DEPARTURE")
							tab_pos.push("RIGHT");
					if (case_state_left == "BLANK" || case_state_left == "FOOD" || case_state_left == "DEPARTURE")
							tab_pos.push("LEFT");
					return(tab_pos);
				}
			this.getMovePossibilityPhV1 = function (map)
				{
					var tab_phero = new Array();
					var tab_phero_name = new Array();
					var tab_max = new Array();
					var tab_egal = new Array();
					var max_pheromone = 0.000000001;
					var phero_egal = 0;
					var ancien_phero = 0;
					var tab_move_poss = this.getMovePossibilityName(map);
					for (var i = 0; i < tab_move_poss.length; ++i)
						{
							if (tab_move_poss[i] == "DOWN")
								var number_pv_v1 = map.getPheromoneV1((this.posX + 1),this.posY);
							else if (tab_move_poss[i] == "UP")
								var number_pv_v1 = map.getPheromoneV1((this.posX - 1),this.posY);
							else if (tab_move_poss[i] == "RIGHT")
								var number_pv_v1 = map.getPheromoneV1(this.posX, (this.posY + 1));
							else if (tab_move_poss[i] == "LEFT")
								var number_pv_v1 = map.getPheromoneV1(this.posX, (this.posY - 1));
							
							ancien_phero = number_pv_v1;
							ancien_phero_name = tab_move_poss[i];
							tab_phero.push(number_pv_v1);
							tab_phero_name.push(tab_move_poss[i]);
							if (ancien_phero > max_pheromone)
								{
									max_pheromone = ancien_phero;
									tab_max.shift();
									tab_max.push(tab_move_poss[i]);
								}
							if (ancien_phero == max_pheromone)
								{
									max_pheromone = ancien_phero;
									if (tab_egal.indexOf(ancien_phero_name) == -1)
										tab_egal.push(ancien_phero_name);
									if (tab_egal.indexOf(tab_move_poss[i]) == -1)
										tab_egal.push(tab_move_poss[i]);
									phero_egal = max_pheromone;
								}
						}
						var verif = 0;
						for (var i = 0; i < tab_phero.length; ++i)
							{
								if (tab_phero[i] != 0)
									verif++;
							}
						if (verif == 0)
							{
									var next_move = this.getAMoveBetween(map, tab_phero_name);
									return (next_move);
							}
						if (tab_egal.length > 1 && phero_egal >= tab_max[0])
							var next_move = this.getAMoveBetween(map, tab_egal);
						else
							var next_move = tab_max[0];
					return (next_move);
				}
			this.getMovePossibilityPhV2 = function (map)
				{
					var tab_phero = new Array();
					var tab_phero_name = new Array();
					var tab_max = new Array();
					var tab_egal = new Array();
					var max_pheromone = 0.000000001;
					var phero_egal = 0;
					var ancien_phero = 0;
					var tab_move_poss = this.getMovePossibilityName(map);
					for (var i = 0; i < tab_move_poss.length; ++i)
						{
							if (tab_move_poss[i] == "DOWN")
								var number_pv_v2 = map.getPheromoneV2((this.posX + 1),this.posY);
							else if (tab_move_poss[i] == "UP")
								var number_pv_v2 = map.getPheromoneV2((this.posX - 1),this.posY);
							else if (tab_move_poss[i] == "RIGHT")
								var number_pv_v2 = map.getPheromoneV2(this.posX, (this.posY + 1));
							else if (tab_move_poss[i] == "LEFT")
								var number_pv_v2 = map.getPheromoneV2(this.posX, (this.posY - 1));
									
							ancien_phero = number_pv_v2;
							ancien_phero_name = tab_move_poss[i];
							tab_phero.push(number_pv_v2);
							tab_phero_name.push(tab_move_poss[i]);
							if (ancien_phero > max_pheromone)
								{
									max_pheromone = ancien_phero;
									tab_max.shift();
									tab_max.push(tab_move_poss[i]);
								}
							if (ancien_phero == max_pheromone)
								{
									max_pheromone = ancien_phero;
									if (tab_egal.indexOf(ancien_phero_name) == -1)
										tab_egal.push(ancien_phero_name);
									if (tab_egal.indexOf(tab_move_poss[i]) == -1)
										tab_egal.push(tab_move_poss[i]);
									phero_egal = max_pheromone;
								}
						}
						var verif = 0;
						for (var i = 0; i < tab_phero.length; ++i)
							{
								if (tab_phero[i] != 0)
									verif++;
							}
						if (verif == 0)
							{
									var next_move = this.getAMoveBetween(map, tab_phero_name);
									return (next_move);
							}
						if (tab_egal.length > 1 && phero_egal >= tab_max[0])
							var next_move = this.getAMoveBetween(map, tab_egal);
						else
							var next_move = tab_max[0];	
					return (next_move);
				}
			this.getAMove = function (map)
				{
					var tab_pos = new Array();
					
					var case_state_down = map.getStateOfThisCase((this.posX + 1),this.posY);
					var case_state_up = map.getStateOfThisCase((this.posX - 1),this.posY);
					var case_state_right = map.getStateOfThisCase(this.posX,(this.posY + 1));
					var case_state_left = map.getStateOfThisCase(this.posX, (this.posY - 1));
					if ((case_state_down == "BLANK" || case_state_down == "FOOD" || case_state_down == "DEPARTURE")&& this.posX <= 10 && case_state_down != "BLOCK")
							tab_pos.push("DOWN");
					if ((case_state_up == "BLANK" || case_state_up == "FOOD" || case_state_up == "DEPARTURE") && this.posX >= 1 && case_state_up != "BLOCK")
							tab_pos.push("UP");
					if ((case_state_right == "BLANK" || case_state_right == "FOOD" || case_state_right == "DEPARTURE") && this.posY <= 9 && case_state_right != "BLOCK")
							tab_pos.push("RIGHT");
					if ((case_state_left == "BLANK" || case_state_left == "FOOD" || case_state_left == "DEPARTURE") && this.posY >= 1 && case_state_left != "BLOCK")
							tab_pos.push("LEFT");
						var rand = Math.floor((Math.random() * tab_pos.length));
					var next_move = tab_pos[rand];	
					return next_move;
				}
			this.getAMoveBetween = function (map, tab)
				{
					var rand = Math.floor((Math.random() * tab.length));
					var next_move = tab[rand];
					return next_move;
				}
				
		this.moveRandPossible = function (map)
				{
						var next_move = this.getAMove(map);
						switch(next_move) {
							case "LEFT":
								this.posY--;
								break;
							case "RIGHT":
								this.posY++;
								break;
							case "UP":
								this.posX--;
								break;
							case "DOWN":
								this.posX++;
								break;
						}
					return (next_move);
				}
			this.moveToThisCase = function (next_move)
				{
					var case_state_down = map.getStateOfThisCase((this.posX + 1),this.posY);
					var case_state_up = map.getStateOfThisCase((this.posX - 1),this.posY);
					var case_state_right = map.getStateOfThisCase(this.posX,(this.posY + 1));
					var case_state_left = map.getStateOfThisCase(this.posX, (this.posY - 1));
					if (next_move == "DOWN" && case_state_down != "BLOCK")
							this.posX++;
					else if (next_move == "UP" && case_state_up != "BLOCK")
							this.posX--;
					else if (next_move == "RIGHT" && case_state_right != "BLOCK")
							this.posY++;
					else if (next_move == "LEFT" && case_state_left != "BLOCK")
							this.posY--;
					else
						return(-1);
				}
	}