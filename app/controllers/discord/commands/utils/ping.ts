import { Command } from '@/controllers/discord/base'
import { ApplicationCommandType, EmbedBuilder } from 'discord.js'
import axios from "axios";
import storage from '@/controllers/Storage';
import { SettingsJson } from '@/interfaces';

interface Response {
  server: number| string
}

new Command({
  name: 'ping',
  description: '[ 🌐 Utilidades ] Mostra o ping do bot e do painel',
  dmPermission: true,
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const { client } = interaction;
    const apiLatency = client.ws.ping;
    const botLatency = Date.now() - interaction.createdTimestamp;
    const config:SettingsJson = storage.get("settings")
    const PanelPing = (): Promise<Response> => {
      return new Promise((resolve) => {
      
        axios.post(config.server.url + ":" + config.server.port + "/ping")
          .then((response) => {
            return resolve({
              server: response.data.ping || 0,
            });
          })
          .catch(e => {
            console.error("Discord Error : " + e)
            resolve({
              server:  "notvalid",
            })
        });
      });
    };

    // Chama a função PanelPing
    const panelPingResult = await PanelPing();

    // Atualiza a mensagem de resposta com o ping do painel
    const embed = new EmbedBuilder()
      .setTitle('Pong!')
      .setColor('DarkGold')
      .setDescription(`Latencia da API: ${apiLatency}ms \nLatencia do Bot: ${botLatency}ms\nLatencia do Painel: ${panelPingResult.server}ms`);

    await interaction.reply({
      ephemeral: true,
      embeds: [embed]
    });
  }
});
