const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // Crée une interface readline pour lire les entrées de l'utilisateur et afficher des messages
  
  const fs = require('fs');
  // Importe le module File System pour la manipulation de fichiers
  
  const http = require('http');
  // Importe le module HTTP pour envoyer des requêtes au serveur
  
  function askName() {
    return new Promise((resolve) => {
      // Retourne une promesse pour gérer l'asynchronicité
      readline.question('Quel est votre nom ? ', name => {
        // Pose la question à l'utilisateur
        if (name.trim() === '') {
          // Vérifie si le nom est vide après avoir supprimé les espaces
          console.log('Erreur : Le nom ne peut pas être vide. Veuillez réessayer.');
          resolve(askName()); // Redemande le nom si vide
        } else {
          console.log('Bonjour ' + name + ' !');
          resolve(name); // Résout la promesse avec le nom
        }
      });
    });
  }
  
  function askAge() {
    return new Promise((resolve) => {
      readline.question('Quel est votre âge ? ', age => {
        const parsedAge = parseInt(age);
        // Convertit l'âge en nombre
        if (isNaN(parsedAge) || parsedAge <= 0) {
          // Vérifie si l'âge est un nombre positif
          console.log('Erreur : L\'âge doit être un nombre positif. Veuillez réessayer.');
          resolve(askAge()); // Redemande l'âge si invalide
        } else {
          console.log('Vous avez ' + parsedAge + ' ans !');
          resolve(parsedAge); // Résout la promesse avec l'âge
        }
      });
    });
  }
  
  function sendDataToServer(name, age) {
    return new Promise((resolve, reject) => {
      // Retourne une promesse pour gérer l'envoi asynchrone au serveur
      const data = JSON.stringify({ name, age });
      // Convertit les données en format JSON
  
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };
      // Configure les options pour la requête HTTP
  
      const req = http.request(options, (res) => {
        // Crée une requête HTTP
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
          // Accumule les morceaux de la réponse
        });
        res.on('end', () => {
          console.log('Réponse du serveur:', responseBody);
          resolve(responseBody);
          // Résout la promesse avec la réponse du serveur
        });
      });
  
      req.on('error', (error) => {
        console.error("Erreur lors de l'envoi au serveur:", error);
        reject(error);
        // Rejette la promesse en cas d'erreur
      });
  
      req.write(data);
      req.end();
      // Envoie les données et termine la requête
    });
  }
  
  async function askQuestions() {
    try {
      // Utilise try-catch pour gérer les erreurs potentielles
      const name = await askName();
      const age = await askAge();
      // Attend la résolution des promesses pour le nom et l'âge
      await sendDataToServer(name, age);
      // Envoie les données au serveur
    } catch (error) {
      console.error('Une erreur est survenue:', error);
      // Affiche l'erreur si quelque chose se passe mal
    } finally {
      readline.close();
      // Ferme l'interface readline, que tout se soit bien passé ou non
    }
  }
  
  askQuestions();
  // Lance le processus de questions