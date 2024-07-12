const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Stockage des données reçues avec horodatage
let receivedData = [];

app.get('/', (req, res) => {
  // Création d'une liste HTML des données reçues avec horodatage
  const dataList = receivedData.map(data => 
    `<li>Nom: ${data.name}, Âge: ${data.age}, Reçu le: ${data.timestamp}</li>`
  ).join('');

  res.send(`
    <h1>Bienvenue sur notre serveur!</h1>
    <p>Ce serveur est configuré pour recevoir des données d'utilisateurs via POST sur /api/users.</p>
    <p>Utilisez un client HTTP pour envoyer des données à ce serveur.</p>
    <h2>Données reçues :</h2>
    <ul>${dataList}</ul>
    <script>
      // Rafraîchit la page toutes les 5 secondes
      setTimeout(() => location.reload(), 5000);
    </script>
  `);
});

app.post('/api/users', (req, res) => {
  const now = new Date();
  const timestamp = now.toLocaleString('fr-FR', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$2/$1');

  const dataWithTimestamp = { ...req.body, timestamp };
  console.log('Données reçues:', dataWithTimestamp);
  // Ajoute les nouvelles données avec horodatage à notre tableau
  receivedData.push(dataWithTimestamp);
  res.json({ message: 'Données reçues avec succès', data: dataWithTimestamp });
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page non trouvée</h1>
    <p>Désolé, la page que vous recherchez n'existe pas.</p>
    <a href="/">Retour à l'accueil</a>
  `);
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});