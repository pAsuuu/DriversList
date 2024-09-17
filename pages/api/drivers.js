import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export default async function handler(req, res) {
  const csvFilePath = path.join(process.cwd(), 'public', 'data', 'drivers.csv');

  try {
    // Vérifier si le fichier existe
    if (!fs.existsSync(csvFilePath)) {
      return res.status(404).json({ error: 'Fichier CSV introuvable.' });
    }

    // Lire le fichier CSV
    const fileContent = await fs.promises.readFile(csvFilePath, 'utf8');

    // Parser le contenu du fichier CSV
    Papa.parse(fileContent, {
      header: true,
      complete: (result) => {
        // Vérifier si des données ont été trouvées
        if (!result.data || result.data.length === 0) {
          return res.status(404).json({ error: 'Aucun pilote trouvé dans le fichier CSV.' });
        }
        // Retourner les données JSON des pilotes
        res.status(200).json(result.data);
      },
      error: (err) => {
        res.status(500).json({ error: 'Erreur lors du parsing du fichier CSV.' });
      },
    });
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier CSV:', error);
    res.status(500).json({ error: 'Erreur lors de la lecture du fichier CSV.' });
  }
}
