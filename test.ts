import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;
const CLIENT_ID = '1000986495705948212';
const CLIENT_SECRET = 'Iecqq76hZEkY8Ap_z-x6ySaqMXpagw9Y';
const REDIRECT_URI = 'http://localhost:3000/callback';

// Rota de autorização
app.get('/login', (req, res) => {
  res.redirect(
    `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`
  );
});

// Rota de callback
app.get('/callback', async (req, res) => {
  const code = req.query.code as string;

  // Trocar o código por um token de acesso
  const tokenResponse = await axios.post(
    'https://discord.com/api/oauth2/token',
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const accessToken = tokenResponse.data.access_token;
  console.log(accessToken)
  // Obter informações do usuário
  const userResponse = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = userResponse.data;

  // Faça o que desejar com as informações do usuário
  console.log(user);

  res.send(`Usuário autenticado: ${user.username}`);
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
