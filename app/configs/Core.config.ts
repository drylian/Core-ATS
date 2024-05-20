import { Configurations } from "@/controllers/configurations/Configurations";
import { gex } from "@/utils";

new Configurations([
    {
        key: "core:url",
        type: "string",
        description: "Url do painel, use http ou https.",
        defaults: "http://localhost",
    },
    {
        key: "core:logo",
        type: "string",
        description: "Logo do painel, use /img/favicon.png para imagem padrão ou link para imagens diferentes.",
        defaults: "/img/favicon.png",
    },
    {
        key: "core:signature",
        type: "string",
        description: "Logo do painel, use /img/favicon.png para imagem padrão ou link para imagens diferentes.",
        defaults: gex(128),
    },
    {
        key: "core:logo",
        type: "boolean",
        description: "Logo do painel, use /img/favicon.png para imagem padrão ou link para imagens diferentes.",
        defaults: "/img/favicon.png",
    }
])