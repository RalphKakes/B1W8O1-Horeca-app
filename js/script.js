const PRIJSFRIS = 2;
const PRIJSBIER = 3;
const PRIJSWIJN = 5;
const PRIJSSNACK8 = 4.50;
const PRIJSSNACK16 = 8

var totaalBestelling = 0;
var aantalBestelling = 0;
var aantalBitterballen = 0;

var totaalFris = 0;
var totaalBier = 0;
var totaalWijn = 0;
var totaalBitterballen = 0;
var totaalTotaal = 0;

var antwoordPrompt = "";
var rekeningText = "";
var bevestiging = "";

var frisBesteld = false;
var bierBesteld = false;
var wijnBesteld = false;
var snackBesteld = false;
var beginRekening = false;

// startmenu waar alles wordt besteld
function startMenu() {
	// kijkt of het begin van de rekening al geprint is, dit gebeurt maar één keer
	if (beginRekening == false) {
		rekeningText += ("Rekening <br>--------------------------------<br>");
		beginRekening = true;
	}

	promptStartmenu = prompt("Welke bestelling wilt u toevoegen?");
	if (promptStartmenu == "fris" || promptStartmenu == "bier" || promptStartmenu == "wijn" || promptStartmenu == "snack") {
		bestel(promptStartmenu);
	} else if (promptStartmenu == "stop"){
		rekening();
	} else {
		alert("U heeft een ongeldige invoer gedaan. Uw bestelling kan niet worden toegevoegd.");
		startMenu();
	}
}

// bestelfunctie
function bestel(bestelling) {
	// kijkt wat de klant heeft ingevult in het startmenu
	if (bestelling == "fris" || bestelling == "bier" || bestelling == "wijn") {
		aantalBestelling = prompt("Hoeveel " + bestelling + " wilt u toevoegen aan uw bestelling? type 'annuleer' om iets anders te kiezen");

		// als de klant van gedachten veranderd dan wordt die teruggestuurd naar het startmenu, waarna de 'return' ervoor zorgt dat de functie gelijk eindigt
		if (aantalBestelling == "annuleer") {
		startMenu();
		return;
		}
		bevestiging = prompt("U gaat " + aantalBestelling + " " + bestelling + " toevoegen aan uw bestelling, klopt dit? Type 'ja' om te bevestigen of type 'annuleer' om terug te gaan.");
		
		// bij als antwoord 'ja' gaat de functie vervolgens de bestelling uitrekenen
		if (bevestiging == "ja") {
			aantalBestelling = parseInt(aantalBestelling);
			if (bestelling == "fris") {
				totaalBestelling = (aantalBestelling * PRIJSFRIS);
				totaalFris += (totaalBestelling);
				frisBesteld = true;
			} else if (bestelling == "bier") {
				totaalBestelling = (aantalBestelling * PRIJSBIER);
				totaalBier += (totaalBestelling);
				bierBesteld = true;
			} else if (bestelling == "wijn") {
				totaalBestelling = (aantalBestelling * PRIJSWIJN);
				totaalWijn += (totaalBestelling);
				wijnBesteld = true;
			}

			// hier wordt de huidige bestelling aan de rekening toegevoegd
			rekeningText += (aantalBestelling + " " + bestelling + " €" + totaalBestelling.toFixed(2) + "<br>");
			startMenu();
		} else if (bevestiging == "annuleer") {
			bestel(bestelling);
		} else {
			alert("U heeft een ongeldige invoer gedaan.");
			bestel(bestelling);
		}

	// als de klant een snack wilt dan wordt dat hier afgehandeld
	} else if (bestelling == "snack") {
		aantalBestelling = prompt("Hoeveel bitterballen wilt u toevoegen (8 of 16)?  type 'annuleer' om iets anders te kiezen");
		if (aantalBestelling == 8 || aantalBestelling == 16) {
			aantalBitterballen = prompt("Hoeveel bitterbalschalen van " + aantalBestelling + " stuks wilt u bestellen? type 'annuleer' om terug te gaan.");

			// annuleer
			if (aantalBitterballen == "annuleer") {
				bestel(bestelling);
				return;
			}
			bevestiging = prompt("U gaat " + aantalBitterballen + " schalen van bitterballen toevoegen van " + aantalBestelling + " stuks aan uw bestelling, klopt dit? Type 'ja' om te bevestigen of type 'annuleer' om terug te gaan.");

			// bevestiging check
			if (bevestiging == "ja") {
				aantalBestelling = parseInt(aantalBestelling);
				aantalBitterballen = parseInt(aantalBitterballen);
				if (aantalBestelling == 8) {
					totaalBestelling = (aantalBitterballen * PRIJSSNACK8);
				} else if (aantalBestelling == 16) {
					totaalBestelling = (aantalBitterballen * PRIJSSNACK16);
				}
				snackBesteld = true;
				totaalBitterballen += (totaalBestelling);

				// toevoegen aan rekening
				rekeningText += (aantalBitterballen + " bitterbalschaal " + aantalBestelling + " stuks €" + totaalBestelling.toFixed(2) + "<br>");
				startMenu();
			} else if (bevestiging == "annuleer") {
				bestel(bestelling);
			} else {
				alert("U heeft een ongeldige invoer gedaan.");
				bestel(bestelling);
			}
		} else if (aantalBestelling == "annuleer") {
			startMenu();
		} else {
			alert("U kunt alleen een keuze maken tussen 8 en 16.");
			bestel(bestelling);
		}
	}
}

// rekening functie, hier worden de totalen opgeteld en toegevoegd aan de rekening waarna de rekening zelf wordt uitgeprint
function rekening() {
	totaalTotaal = (totaalFris + totaalBier + totaalWijn + totaalBitterballen);
	rekeningText += ("<br>");
	if (frisBesteld) {
		rekeningText += ("Totaal fris: €" + totaalFris.toFixed(2) + "<br>");
	}
	if (bierBesteld) {
		rekeningText += ("Totaal bier: €" + totaalBier.toFixed(2) + "<br>");
	}
	if (wijnBesteld) {
		rekeningText += ("Totaal wijn: €" + totaalWijn.toFixed(2) + "<br>");
	}
	if (snackBesteld) {
		rekeningText += ("Totaal bitterballen: €" + totaalBitterballen.toFixed(2) + "<br>");
	}
	rekeningText += ("--------------------------------<br> Totaal: €" + totaalTotaal.toFixed(2));

	// de volledige rekening wordt geprint, dit is een string text in een variabele zodat je maar 1 of een paar keer iets hoeft te printen
	document.getElementById('rekening').innerHTML = (rekeningText);
}