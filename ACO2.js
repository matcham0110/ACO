
// ANTS COLONY

function		Ants(carte, nb_ants)
{
	
	var ant_colony = new Array();
	var type_of_this_case = "";
	var confiance = 0.5; // VALUES FOR CHANGING ANTS COMPORTMENT
	var exploration = 0.8; // VALUES FOR CHANGING ANTS COMPORTMENT
	
	// SENT nb_ants FOR x rows (between anthill and the food)
	
	for (var i = 0; i < nb_ants; ++i)
		{
			ant_colony[i] = new Ant(carte, exploration, confiance);
			for (var x = 0; x < 3; ++x)
				{
					while (type_of_this_case != "FOOD")
						{
							ant_colony[i].majPheromone(carte);
							type_of_this_case = ant_colony[i].moving(carte);
						}
					ant_colony[i].pickFood();
				//	alert("ANT NUMBER [" + i + "] REACH FOOD"); // DISPLAY INFORMATION
					 while (type_of_this_case != "DEPARTURE")
						{
							ant_colony[i].majPheromone(carte);
							type_of_this_case = ant_colony[i].moving(carte);
						}
						ant_colony[i].deliver();
				//		alert("ANT NUMBER [" + i + "] REACH ANTHILL"); // DISPLAY INFORMATION
				}
		}
	
	// SENT A ANT WHO WILL USE THE PHEROMONE OF THE OTHER AND WHO WHILL ALWAYS FIND THE SHORTEST ROAD
	
		alert("RUSHEUSE TURN");
		var rusheuse = new Ant(carte, 1.1, 1.1);
		while (type_of_this_case != "FOOD")
						{
							rusheuse.majPheromone(carte);
							type_of_this_case = rusheuse.moving(carte);
							rusheuse.nb_move_aller++;
						}
						rusheuse.pickFood();
					 while (type_of_this_case != "DEPARTURE")
						{
							rusheuse.majPheromone(carte);
							type_of_this_case = rusheuse.moving(carte);
							rusheuse.nb_move_retour++;
						}
						rusheuse.deliver();
				alert(" FINAL RUSHEUSE ==> NUMBER OF MOUVEMENT TO GET FOOD = " + rusheuse.nb_move_aller + " || NUMBER OF MOUVEMENT TO COME BACK ANTHILL =" + rusheuse.nb_move_retour);
}

var m = 10; // ANTS
var S = new Map(10, 10); // MAP
var ants = new Ants(S, m);
