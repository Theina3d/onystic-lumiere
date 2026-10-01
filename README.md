# Onystic Lumière

Site vitrine statique pour les services de communication animale, soins énergétiques et cartomancie.

## Déploiement initial

Le site fonctionne sans build ni dépendances. Il suffit de servir le dossier racine avec un serveur HTTP local.

### Option locale

```bash
cd "f:\Onystic_Lumière"
python -m http.server 8000
```

Ensuite ouvrir : http://localhost:8000

### Fichiers importants

- `index.html` : page d'accueil
- `communication-animale.html` : service de communication animale
- `soins-energetiques.html` : service de soins énergétiques
- `cartomancie.html` : service de cartomancie
- `style.css` : design global du site

## Déploiement distant

Le projet est prêt pour un hébergement statique classique (GitHub Pages, Netlify, Vercel, etc.) sans étape de compilation.
