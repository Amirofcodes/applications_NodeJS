const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');

function askName() {
  return new Promise((resolve) => {
    readline.question('Quel est votre nom ? ', name => {
      if (name.trim() === '') {
        console.log('Erreur : Le nom ne peut pas être vide. Veuillez réessayer.');
        resolve(askName());
      } else {
        console.log('Bonjour ' + name + ' !');
        resolve(name);
      }
    });
  });
}

function askAge() {
  return new Promise((resolve) => {
    readline.question('Quel est votre âge ? ', age => {
      const parsedAge = parseInt(age);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        console.log('Erreur : L\'âge doit être un nombre positif. Veuillez réessayer.');
        resolve(askAge());
      } else {
        console.log('Vous avez ' + parsedAge + ' ans !');
        resolve(parsedAge);
      }
    });
  });
}

function saveToFile(name, age) {
  const data = `Nom: ${name}\nÂge: ${age}\n\n`;
  fs.appendFile('user_data.txt', data, (err) => {
    if (err) throw err;
    console.log('Les données ont été enregistrées dans user_data.txt');
  });
}

async function askQuestions() {
  try {
    const name = await askName();
    const age = await askAge();
    saveToFile(name, age);
  } catch (error) {
    console.error('Une erreur est survenue:', error);
  } finally {
    readline.close();
  }
}

askQuestions();