import { Configurations } from "@/controllers/configurations/Configurations";

new Configurations([
    {
        key:"cors:allowedroutes",
        type:"string[]",
        description:"Dominios permitidos pelo cors painel.",
        defaults:["localhost"],
    },
    {
        key:"cors:enabled",
        type:"boolean",
        description:"Ativa ou desativa o cors do painel.",
        defaults:true,
    }
])