/*
	@Auteur : Clément 
	@Date: 21/13/2016
	@Titre : Tic-Tac-Toe
*/

var cases	= [-1, -1, -1, -1, -1, -1, -1, -1, -1];
var started	= false; // si le jeu est démarré ou pas ?
var joueur1	= true; // joueur 1 par default.
var joueur2 = false; // joueur 2 juste après

var j1symb	= "X";
var j2symb	= "O";

var j1resu	= 0;
var j2resu	= 0;

document.addEventListener('click', function(e) { // détecter lorsqu'une case du tableau est cliquée
	var clicked	= parseInt(e.target.id);
	if ((started == true) && (isNaN(parseInt(e.target.id)) == false)) { // si le jeu est démarré et que l'id cliquée est numérique, on commence les vérifications.
		var result	= Winner();
		if (result != undefined) { // si la fonction nous retourne un caractère, un des joueurs a gagné.
			if (result == j1symb) {
				setResult(1);
				document.getElementById("joueur").innerHTML	= "<p>Le joueur 1 gagne.</p>";
			} else {
				setResult(2);
				document.getElementById("joueur").innerHTML	= "<p>Le joueur 2 gagne.</p>";
			}
		} else {
			Morpion(clicked); // on appelle la fonction pour d'autres vérifications
		}
	}
});

document.getElementById("play").addEventListener("click", function() { // on démarre le jeu lorsque l'utilisateur clique le bouton "jouer"
	if (started) {
		document.getElementById("joueur").innerHTML		= "<p>Il y a déjà un jeu de démarré!</p>";
	} else {
		started	= true;
		for (var i = 0; i < cases.length; i++) {
			cases[i]	= -1;
			document.getElementById(i).innerHTML	= "";
			document.getElementById(i).style	= "";
			
		}
		joueur1	= true;
		joueur2	= false;
		document.getElementById("show").style.display	= "inline";
		document.getElementById("joueur").style.color	= "#010101";
		document.getElementById("joueur").innerHTML		= "<p>C'est au joueur 1 de commencer.</p>";
	}
});

document.getElementById("reset").addEventListener("click", function() { // on reset le jeu lorsque l'utilisateur clique le bouton "reset"
	if (started == false) {
		document.getElementById("joueur").innerHTML		= "<p>Pourquoi redémarrer le jeu quand aucun jeu est démarré?</p>";
	} else {
		for (var i = 0; i < cases.length; i++) {
			cases[i]	= -1;
			document.getElementById(i).innerHTML	= "";
			document.getElementById(i).style		= "";
			
		}
		joueur1	= true;
		joueur2	= false;
		document.getElementById("joueur").style.color	= "#010101";
		document.getElementById("joueur").innerHTML		= "<p>Le jeu a été redémarré!</p>";
	}
});

function setResult(joueur) { // on met à jour le tableau des joueurs
	started = false;
	if (joueur == 1) {
		j1resu	+= 1;
		document.getElementById("stats1").innerHTML	 = j1resu;
	} else {
		j2resu	+= 1;
		document.getElementById("stats2").innerHTML	 = j2resu;
	}	
}

function setText(click, symb, center, largeur, color) {
	document.getElementById(click).fontsize 		= largeur;
	document.getElementById(click).style.textAlign	= center;
	document.getElementById(click).innerHTML 		= symb;
	document.getElementById(click).style.color 		= color;
}

function Verif(a, b, c) { // Vérifier si a = b = c et si c n'est pas une case vide
	var doc	= document;
	if ((doc.getElementById(a).innerHTML == doc.getElementById(b).innerHTML) && (doc.getElementById(b).innerHTML == doc.getElementById(c).innerHTML) && (doc.getElementById(c).innerHTML !== "")) {
		var test	= [a, b, c];
		for (var i = 0; i < test.length; i++) {
			if (doc.getElementById(a).innerHTML == "X") {
				document.getElementById(test[i]).style.background = "#008800";
			} else {
				document.getElementById(test[i]).style.background = "#FF0000";
			}
			document.getElementById(test[i]).style.color	  = "#ffffff";
		}
		return doc.getElementById(a).innerHTML;
	}
}

function Winner() { // vérifier chaque ligne du tableau si gagnant
    return ((Verif(0, 1, 2)) || (Verif(3, 4, 5)) ||( Verif(6, 7, 8)) || (Verif(0, 3, 6)) || (Verif(1, 4, 7)) || (Verif(2, 5, 8)) || (Verif(0, 4, 8)) || (Verif(2, 4, 6)));
}

function Morpion(click) { // quand le joueur clique sur une case
	var casee 	= parseInt(click);
	if (started !== false) {
		if (cases.indexOf(-1) != -1) { // il y a encore des cases en jeu
			if (cases[casee] != -1) {
				console.log("Cette case est déjà occupée!");
			} else {
				if (joueur1 == true) { // le joueur 1 joue
					cases[casee] 	= 1;
					joueur1			= false;
					joueur2			= true;
					setText(click, "X", "center", 200, "green");
					document.getElementById("joueur").innerHTML	= "<p>C'est au tour du joueur 2!</p>";
				} else { // le joueur 2 joue
					cases[casee] 	= 2;
					joueur1			= true;
					joueur2			= false;
					setText(click, "O", "center", 200, "red");
					document.getElementById("joueur").innerHTML	= "<p>C'est au tour du joueur 1!</p>";
				}
			}
		} else {
			document.getElementById("joueur").style.color	= "#ff0000";
			document.getElementById("joueur").innerHTML		= "<p>La partie est perdue pour les deux joueurs.</p>";
		}
	}
}