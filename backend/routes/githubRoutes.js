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

// route for a specific repo's commits
router.get('/repos/details/:repo', async (req, res) => {
  try {
    const { repo } = req.params;
    const username = 'Dizkm8'; // Replace with the username

    const commits = await octokit.repos.listCommits({
      owner: username,
      repo,
      sha: 'main', // specify the branch
    });

    res.json(commits.data);
  } catch (error) {
    console.error('Error in /repos/:username/:repo/commits endpoint:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
