const axios = require("axios");
const fs = require("fs/promises"); // Use fs/promises para suporte a promises

async function test() {
    try {
        const response = await axios.get("http://localhost:3000/api/admin/accounts", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer core_8uGa99icCOmGXnZxaTfs7Vdd0OVPFwDR"
            },
        });

        // Salva a resposta da API em um arquivo JSON
        await fs.writeFile("./api_admin_accounts.resp.json", JSON.stringify(response.data, null, 2), { flag: 'w' });

        console.log("Resposta da API salva em api_admin_accounts.resp.json");
    } catch (error) {
        console.error("Erro ao fazer a solicitação:", error.message);
    }
}
// async function test() {
//     try {
//       // Faça uma solicitação para obter a lista atualizada de contas
//       const response = await axios.put(
//         "http://localhost:3000/api/admin/accounts/new",
//         {
//           email: "novo_usuario@example.com",
//           password: "senha_segura",
//           permissions: 3000,
//           lang: "en",
//         },
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer core_uDPL3sfAHrXNCuFFwmOecNf8beeA6Wi6",
//           },
//         }
//       );
  
//       // Salva a resposta da API em um arquivo JSON
//       await fs.writeFile(
//         "./api_admin_accounts.resp.json",
//         JSON.stringify(response.data, null, 2),
//         { flag: "w" }
//       );
  
//       console.log("Resposta da API salva em api_admin_accounts.resp.json");
//     } catch (error) {
//       await fs.writeFile("./error.resp.json", JSON.stringify(error, null, 2), {
//         flag: "w",
//       });
  
//       console.error("Erro ao fazer a solicitação:", error.message);
//     }
//   }
  
  
test();
