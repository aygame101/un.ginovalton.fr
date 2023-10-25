document.addEventListener("DOMContentLoaded", function () {
    const ajouterCompteurBtn = document.getElementById("ajouterCompteur");
    const compteursDiv = document.getElementById("compteurs");
    let compteurId = 1;

    // Fonction pour sauvegarder les compteurs dans les cookies
    function sauvegarderCompteurs() {
        const compteurs = [];
        const compteurElements = document.querySelectorAll(".compteur");

        compteurElements.forEach((element) => {
            const nomCompteurInput = element.querySelector(".nomCompteur");
            const valeurCompteurP = element.querySelector(".valeurCompteur");

            compteurs.push({
                nom: nomCompteurInput.value,
                valeur: parseInt(valeurCompteurP.textContent),
            });
        });

        // Convertir les compteurs en une chaîne JSON et stocker dans un cookie
        document.cookie = `compteurs=${JSON.stringify(compteurs)}`;
    }

    // Fonction pour charger les compteurs depuis les cookies
    function chargerCompteurs() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "compteurs") {
                const compteurs = JSON.parse(value);
                compteurs.forEach((compteur) => {
                    ajouterCompteur(compteur.nom, compteur.valeur);
                });
            }
        }
    }

    // Charger les compteurs lors de l'initialisation
    chargerCompteurs();

    ajouterCompteurBtn.addEventListener("click", () => {
        ajouterCompteur(`Compteur ${compteurId}`, 0);
        compteurId++;
        sauvegarderCompteurs();
    });

    function ajouterCompteur(nom, valeur) {
        const nouveauCompteur = document.createElement("div");
        nouveauCompteur.classList.add("compteur");
        nouveauCompteur.innerHTML = `
            <h2 display="non">${nom}</h2>
            <input type="text" placeholder="Nom du compteur" class="nomCompteur" value="${nom}">
            <p class="valeurCompteur">${valeur}</p>
            <button class="incrementer">+1</button>
            <button class="supprimer">Supprimer</button>
        `;

        compteursDiv.appendChild(nouveauCompteur);

        const nomCompteurInput = nouveauCompteur.querySelector(".nomCompteur");
        const valeurCompteurP = nouveauCompteur.querySelector(".valeurCompteur");
        const incrementerBtn = nouveauCompteur.querySelector(".incrementer");
        const supprimerBtn = nouveauCompteur.querySelector(".supprimer");

        incrementerBtn.addEventListener("click", () => {
            const valeurActuelle = parseInt(valeurCompteurP.textContent);
            valeurCompteurP.textContent = valeurActuelle + 1;
            sauvegarderCompteurs();
        });

        supprimerBtn.addEventListener("click", () => {
            compteursDiv.removeChild(nouveauCompteur);
            sauvegarderCompteurs();
        });

        nomCompteurInput.addEventListener("input", () => {
            const nouveauNom = nomCompteurInput.value;
            const h2 = nouveauCompteur.querySelector("h2");
            h2.textContent = nouveauNom;
            sauvegarderCompteurs();
        });
    }
});
