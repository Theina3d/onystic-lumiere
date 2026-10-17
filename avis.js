// Configuration de l'URL de ton API Google Apps Script
const URL_SHEET_API = "https://script.google.com/macros/s/AKfycbx0U_JI1ZoU223g2tZUJdW56ICdQV27iiHB4bosxElXS7GXbswTGaSWtkmVXH1q5T5f8A/exec";

/**
 * Charge et filtre les avis validés depuis Google Sheets
 * @param {string} filtrePrestation - Filtre optionnel (ex: 'Communication Animale', 'Soin Énergétique', 'Cartomancie', etc.)
 */
async function chargerAvisValides(filtrePrestation = 'TOUS') {
  const carrousel = document.getElementById('carrouselAvis');
  if (!carrousel) return;

  try {
    const reponse = await fetch(URL_SHEET_API);
    const avisList = await reponse.json();

    if (avisList && avisList.length > 0) {
      // Filtrer les avis si une prestation spécifique est demandée
      const avisFiltres = avisList.filter(item => {
        if (filtrePrestation === 'TOUS') return true;
        // Comparaison insensible à la casse / aux accents
        return item.service && item.service.toLowerCase().includes(filtrePrestation.toLowerCase());
      });

      // Si on a des avis correspondant au filtre
      if (avisFiltres.length > 0) {
        carrousel.innerHTML = ""; // Vider les avis statiques d'exemple

        avisFiltres.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'carrousel-item';
          itemDiv.innerHTML = `
            <article class="carte avis">
              <p class="avis__texte">« ${item.texte} »</p>
              <p class="avis__auteur">— ${item.auteur}</p>
            </article>
          `;
          carrousel.appendChild(itemDiv);
        });
      }
    }
  } catch (erreur) {
    console.error("Erreur lors de la récupération des avis :", erreur);
  }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const carrousel = document.getElementById('carrouselAvis');
  
  // Récupère la prestation souhaitée depuis un attribut data-service sur le carrousel
  const filtre = carrousel ? (carrousel.getAttribute('data-service') || 'TOUS') : 'TOUS';
  
  // Charge les avis filtrés
  chargerAvisValides(filtre);

  // Gestion des boutons fléchés
  const btnGauche = document.getElementById('btnGauche');
  const btnDroite = document.getElementById('btnDroite');

  if (btnGauche && btnDroite && carrousel) {
    btnGauche.addEventListener('click', () => carrousel.scrollBy({ left: -340, behavior: 'smooth' }));
    btnDroite.addEventListener('click', () => carrousel.scrollBy({ left: 340, behavior: 'smooth' }));
  }
});