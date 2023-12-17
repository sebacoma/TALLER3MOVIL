const express = require('express');
const router = express.Router();
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: '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' // Utilizando el token de acceso desde las variables de entorno
});


// Endpoint to get the list of repositories for a GitHub user
router.get('/user-repos', async (req, res) => {
  try {
    const username = 'Dizkm8'; // Replace with the username
    console.log('antes')
    const { data } = await octokit.repos.listForUser({ username });
    console.log('despues jojo')
    res.json(data);
  } catch (error) {
    console.error('Error in /user-repos endpoint:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
