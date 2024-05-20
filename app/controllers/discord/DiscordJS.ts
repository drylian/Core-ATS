import type { ChatInputCommandInteraction, ClientOptions, CommandInteraction, BitFieldResolvable, GatewayIntentsString, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction, AutocompleteInteraction } from 'discord.js'
import { ApplicationCommandType, Client, version, IntentsBitField, Partials } from 'discord.js'
import { glob } from 'glob'
import * as path from 'path';
import { Component, Command, Event } from '@/controllers/discord/base'
import configuractions from '../settings/Default';
import Loggings from '../Loggings';

export function createClient(options?: ClientOptions): Client {
    const client = new Client({
        intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
        partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User, Partials.ThreadMember],
        failIfNotExists: false,
        ...options
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    client.start = async function (token: string) {
        const discordDir = path.join(configuractions.rootPATH)

        const paths = await glob([
            'controllers/discord/commands/**/*.{ts,js}',
            'controllers/discord/events/**/*.{ts,js}',
            'controllers/discord/components/**/*.{ts,js}'
        ], { cwd: discordDir })
        for (const pather of paths) await import(`./${pather.slice(20)}`)

        Event.all.forEach(({ run, name, once }) => (once ?? false)
            ? this.once(name, run)
            : this.on(name, run)
        )
        void this.login(token)
    }
    client.on('error', (error) => {
        console.error("Discord Error :" + error);
    });
    client.on('interactionCreate', interaction => {
        const onAutoComplete = (autoCompleteInteraction: AutocompleteInteraction): void => {
            const command = Command.all.get(autoCompleteInteraction.commandName)
            const interaction = autoCompleteInteraction
            if (command?.type === ApplicationCommandType.ChatInput && (command.autoComplete !== undefined)) {
                command.autoComplete(interaction)
            }
        }
        const onCommand = (commandInteraction: CommandInteraction): void => {
            const command = Command.all.get(commandInteraction.commandName)

            switch (command?.type) {
                case ApplicationCommandType.ChatInput: {
                    const interaction = commandInteraction as ChatInputCommandInteraction
                    command.run(interaction)
                    return
                }
                case ApplicationCommandType.Message: {
                    const interaction = commandInteraction as MessageContextMenuCommandInteraction
                    command.run(interaction)
                    return
                }
                case ApplicationCommandType.User: {
                    const interaction = commandInteraction as UserContextMenuCommandInteraction
                    command.run(interaction)
                }
            }
        }
        if (interaction.isCommand()) onCommand(interaction)
        if (interaction.isAutocomplete()) onAutoComplete(interaction)

        if (!interaction.isModalSubmit() && !interaction.isMessageComponent()) return

        if (interaction.isModalSubmit()) {
            const component = Component.find(interaction.customId, 'Modal')
            component?.run(interaction); return
        }
        if (interaction.isButton()) {
            const component = Component.find(interaction.customId, 'Button')
            component?.run(interaction); return
        }
        if (interaction.isStringSelectMenu()) {
            const component = Component.find(interaction.customId, 'StringSelect')
            component?.run(interaction); return
        }
        if (interaction.isChannelSelectMenu()) {
            const component = Component.find(interaction.customId, 'ChannelSelect')
            component?.run(interaction); return
        }
        if (interaction.isRoleSelectMenu()) {
            const component = Component.find(interaction.customId, 'RoleSelect')
            component?.run(interaction); return
        }
        if (interaction.isUserSelectMenu()) {
            const component = Component.find(interaction.customId, 'UserSelect')
            component?.run(interaction); return
        }
        if (interaction.isMentionableSelectMenu()) {
            const component = Component.find(interaction.customId, 'MentionableSelect')
            component?.run(interaction)
        }
    })
    client.once('ready', async client => {
        const core = new Loggings("Discord", "magenta")
        core.info(`Extensão do discord foi iniciada com sucesso.`)
        await client.application.commands.set(Array.from(Command.all.values()))
            .then((c) => { core.info(`Comandos definidos com [sucesso].green`) })
            .catch(e => core.error(e))
    })
    return client
}