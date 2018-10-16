var antwoordPrompt = "";
const PRIJSFRIS = 2;
const PRIJSBIER = 3;
const PRIJSWIJN = 5;
var aantalDrinken = 0;
var rekeningText = "";
var bevestiging = "";

function startMenu(){
	promptStartMenu = prompt("welke bestelling wilt u toevoegen?");
	if (promptStartMenu == "fris" || promptStartMenu == "bier" || promptStartMenu == "wijn"){
		bestelDrinken(promptStartMenu);
	} else if(promptStartMenu == "stop"){
		rekening();
	} else {
		alert("U heeft een ongeldige invoer gedaan. Uw bestelling kan niet worden toegevoegd.");
		startMenu();
	}
}

function bestelDrinken(drinken){
	aantalDrinken = prompt("hoeveel " + drinken + " wilt u toevoegen aan uw bestelling? ");
	if(aantalDrinken == "nee"){
		startMenu();
		return;
	}
	bevestiging = prompt("U gaat " + aantalDrinken + " " + drinken + " Toevoegen aan je bestelling, klopt dit? type 'ja' als dit klopt, type 'nee' als dit niet klopt.")
	if(bevestiging == "ja"){
		if(drinken == "fris"){
			totaalBestelling = (aantalDrinken * PRIJSFRIS);
		}else if(drinken == "bier"){
			totaalBestelling = (aantalDrinken * PRIJSBIER);
		}else if(drinken == "wijn"){
			totaalBestelling = (aantalDrinken * PRIJSWIJN);
		}
		rekeningText += ( aantalDrinken + " " + drinken + "      " + "€ " + totaalBestelling);
		startMenu(drinken);
	} else if(bevestiging = "nee"){
		bestelDrinken(drinken);
    }
}

function rekening(){
	document.write("rekening<br><br>");
	document.write(rekeningText)
}