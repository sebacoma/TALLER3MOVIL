const express = require('express');
const router = express.Router();
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: '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' // Utilizando el token de acceso desde las variables de entorno
});

// Endpoint para obtener información de un repositorio en GitHub
router.get('/repo-info', async (req, res) => {
  try {
    const owner = 'nombre_usuario'; // Reemplaza con el nombre de usuario
    const repo = 'nombre_repositorio'; // Reemplaza con el nombre del repositorio

    const { data } = await octokit.repos.get({ owner, repo });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
