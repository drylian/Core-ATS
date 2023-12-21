import { i18t } from "@/controllers/Language";
import { SettingsJson } from "@/interfaces";

export default function JsonBody(config: SettingsJson, i18n: i18t, query?: boolean) {

    return (`
    <div class="pricor min-h-screen flex items-center justify-center min-w-screen">
    <div class="seccor p-6 rounded-lg shadow-lg m-5 box">
        <div class="border-b mb-4 pb-4 items-center">
            <div class="flex">
                <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem"
                    style="max-width: 70px; max-height: 70px; margin-right: 10px;" class="ml-4">

                <div class="border-b mb-4 pb-4">
                    <h1 class="pritext text-2xl font-bold">${config.server.title || "Core"} - ${i18n.t(
        "attributes.JsonViewerTitle",
    )}${query ? ` - ${i18n.t("http:messages.api.Listtype")}` : ""}</h1>
                    <p class="sectext text-sm">${i18n.t("http:messages.JsonViewerApi", {
        title: `${config.server.title || "Core"}`,
    })}</p>
                </div>
            </div>
            ${query ? `<input type='text' placeholder='Pesquisar...' value="" id='searchInput'
            class='block p-2 w-full text-sm textpri corsec border duration-200 border-none rounded focus:border-blue-500' />`: ""}
        </div> 
        
        ${query ? `<!--JSON Container-->` : `<div class="tercor border mt-4 p-4 overflow-x-auto max-h-screen max-w-screen prebox">
        <!--JSON Container-->
    </div>`}
    </div>
</div>
        `)
}