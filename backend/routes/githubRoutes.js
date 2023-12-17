const express = require('express');
const router = express.Router();
const { Octokit } = require('@octokit/rest');
// token de git
const octokit = new Octokit({
  auth: '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' // Utilizando el token de acceso desde las variables de entorno
});


// ruta para la lista de repos del usuario
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

// ruta para un repo especifico
router.get('/repos/:repo', async (req, res) => {
  try {
    const { repo } = req.params;
    const username = 'Dizkm8'; 
    const { data } = await octokit.repos.get({ owner: username, repo });

    const commits = await octokit.repos.listCommits({
      owner: username,
      repo,
    });

    const numberOfCommits = commits.data.length;

    console.log('jaja')
    console.log(numberOfCommits)

    res.json({ ...data, commits: numberOfCommits });
    console.log(res.json.commits)
  } catch (error) {
    console.error('Error in /repos/:username/:repo endpoint:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
