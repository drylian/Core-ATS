
const request = require("supertest")
const APPURL = 'http://localhost:8080';

describe('Testes da API', () => {
  it('Deve retornar informações do usuário', async () => {
    const response = await request(APPURL).get('/test');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual('test');
  });
});
