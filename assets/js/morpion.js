// on verifie si la case contient deja une valeur
function estValide(button) {
    return button.innerHTML.length == 0;
}

// on ecrit le symbole dans le button
function setSymbole(btn,symbole) {
    btn.innerHTML = symbole;
}

// on verifie si li y a un gagnant
// ligne
// 0 1 2 
function rechercherVainqueur(pions,joueurs,tour) {
    if(pions[0].innerHTML == joueurs[tour] && pions[1].innerHTML == joueurs[tour] && pions[2].innerHTML == joueurs[tour]){
        pions[0].style.backgroundColor = "#9ACD32";
        pions[1].style.backgroundColor = "#9ACD32";
        pions[2].style.backgroundColor = "#9ACD32";
        return true;
    }
// 3 4 5
    if(pions[3].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[5].innerHTML == joueurs[tour]){
        pions[3].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        return true;
    }
// 6 7 8
    if(pions[6].innerHTML == joueurs[tour] && pions[7].innerHTML == joueurs[tour] && pions[8].innerHTML == joueurs[tour]){
        pions[6].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }
// colonne
// 0 3 6 
    if(pions[0].innerHTML == joueurs[tour] && pions[3].innerHTML == joueurs[tour] && pions[6].innerHTML == joueurs[tour]){
        pions[0].style.backgroundColor = "#9ACD32";
        pions[3].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }
// 1 4 7
    if(pions[1].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[7].innerHTML == joueurs[tour]){
        pions[1].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[7].style.backgroundColor = "#9ACD32";
        return true;
    }
//2 5 8
    if(pions[2].innerHTML == joueurs[tour] && pions[5].innerHTML == joueurs[tour] && pions[8].innerHTML == joueurs[tour]){
        pions[2].style.backgroundColor = "#9ACD32";
        pions[5].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }
//diagonale
//0 4 8
    if(pions[0].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[8].innerHTML == joueurs[tour]){
        pions[0].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[8].style.backgroundColor = "#9ACD32";
        return true;
    }
//2 4 6 
    if(pions[2].innerHTML == joueurs[tour] && pions[4].innerHTML == joueurs[tour] && pions[6].innerHTML == joueurs[tour]){
        pions[2].style.backgroundColor = "#9ACD32";
        pions[4].style.backgroundColor = "#9ACD32";
        pions[6].style.backgroundColor = "#9ACD32";
        return true;
    }
}

// on verifie si il n'y a pas de gagnant

function matchNul(pions){
    for(var i=0, len = pions.length; i < len;i++) {
        if(pions[i].innerHTML.length == 0) return false;
    }
    return true;
}

// pour afficher les information
let Afficheur = function(element){
    let affichage = element;

    function setText(message) {
        affichage.innerHTML = message;
    }
    return { sendMessage: setText};
}; // ; pour les fonctions anonyme ; a la fin sinon ça ne fonctionne pas 


// fonction qui fait tout le jeu
function game() {
    // on recup toutes les cases
    let pions = document.querySelectorAll('#morpion button')
    // defini le symbole des joueurs
    let joueurs = ['X', 'O'];
    // defini le 1er tour
    let tour = 0;
    let jeuEstfini = false;
    // defini l'element du DOM  qui affiche les infos
    let afficheur = new Afficheur(document.querySelector('#resultat'));
    afficheur.sendMessage("Joueur "+joueurs[tour]+" c'est à vous");
    // le nerf de la guerre 
    for(var i=0, len = pions.length; i < len;i++) {
        pions[i].addEventListener("click",function(){
            // joue un son au clic
            let sonClic = document.createElement('audio');
            sonClic.src = "assets/son/clic.mp3"
            sonClic.play()
            // verif si jeu fini
            if(jeuEstfini) return;

            // verif si case est pas occupé
            if(!estValide(this)) {
                // indique que la case est deja prise
                afficheur.sendMessage("case occupé !!! <br /> Joueur "+joueurs[tour]+" c'est encore a vous");
            }
            else {
                //remplit le bouton symbole
                setSymbole(this,joueurs[tour]);
                //verif si gagnant
                jeuEstfini = rechercherVainqueur(pions,joueurs,tour);

                // si le jeu est terminé
                if(jeuEstfini) {
                    // affiche un message
                    afficheur.sendMessage("Le joueur "+joueurs[tour]+" a gagné !!");
                    // joue un son quand la partie est gagné
                    let sonFini = document.createElement('audio');
                    sonFini.src = "assets/son/gagne.mp3"
                    sonFini.play()
                    return;
                }
                // verif si match nul
                if(matchNul(pions)) {
                    // affiche mess
                    afficheur.sendMessage("Partie terminé ! Match nul")
                    // joue un son quand match nul
                    let sonPerdu = document.createElement('audio');
                    sonPerdu.src = "assets/son/perdu.mp3"
                    sonPerdu.play()
                    return;
                }
                // ensuite incrementer les tours
                tour++;
                tour = tour % 2;
                afficheur.sendMessage("Joueur"+joueurs[tour]+"c'est a vous !");
            }
        });
    }
}
game();