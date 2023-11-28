import { ColorJson, SettingsJson } from "@/interfaces";
import JsonJS from "@/http/pages/javascript/Json.javascript";
import JsonCss from "@/http/pages/styles/Json.css";
import createPaginationButtons from "@/http/pages/scripts/CreatePaginationButtons";
import { Request } from "express";
import I18alt from "@/controllers/Language";
import storage from "@/controllers/Storage";
type meta = {
    pagination: {
        pages: number;
        per_page: number;
        current: number;
        results: number;
    };
};

// Função para criar um visualizador de JSON
export default function JsonViewer<T>(jsonData: T, req: Request, type?: "list") {
	const config: SettingsJson = storage.get("config");
	const color: ColorJson = storage.get("color");
	const language = req?.access.lang
		? req?.access.lang
		: req?.language
			? req.language
			: config.server.lang
				? config.server.lang
				: "pt-BR";
	const i18n = new I18alt(language);

	// Converte o objeto JSON em uma string JSON formatada
	const formattedJSON = JSON.stringify(jsonData, null, 2);
	return `
    <!DOCTYPE html>
    <html lang="${language}">

    <head>
      <meta charset="UTF-8">
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${i18n.t("meta.description")}.">
      <meta name="keywords" content="${i18n.t("meta.keywords")}.">
      <meta name="author" content="${config.server.title || "Core"}">
      <link rel="icon" type="image/png" href="${config.server.logo || "/img/favicon.png"}" />
      <title>${config.server.title || "Core"} - ${i18n.t("attributes.JsonViewerTitle")}${
	type ? ` - ${type ? ` - ${i18n.t("http:messages.api.Listtype")}` : ""}` : ""
}</title>
      ${JsonCss(color)}
    </head>
      <body>
      <div class="pricor min-h-screen flex items-center justify-center min-w-screen">
          <!-- Container principal com margens -->
          <div class="seccor p-6 rounded-lg shadow-lg m-5 box">
              <!-- Título e descrição -->
              <div class="border-b mb-4 pb-4 flex items-center">
                  <img src="${config.server.logo || "/img/favicon.png"}" alt="Imagem"
                      style="max-width: 70px; max-height: 70px; margin-right: 10px;" class="ml-4">

                  <div class="border-b mb-4 pb-4">
                      <h1 class="pritext text-2xl font-bold">${config.server.title || "Core"} - ${i18n.t(
	"attributes.JsonViewerTitle",
)}${type ? ` - ${i18n.t("http:messages.api.Listtype")}` : ""}</h1>
                      <p class="sectext text-sm">${i18n.t("http:messages.JsonViewerApi", {
		title: `${config.server.title || "Core"}`,
	})}</p>
                  </div>
              </div>
              ${(() => {
		if (type === "list") {
			const pagination = (jsonData as { meta: meta }).meta.pagination;

			return createPaginationButtons(pagination.current, pagination.pages, pagination.results);
		} else {
			return "";
		}
	})()}
    ${(() => {
		if (
			(type === "list" &&
                (jsonData as { data: object[] }).data &&
                (jsonData as { data: object[] }).data.length > 0) ||
            (type !== "list" && jsonData)
		) {
			return `
        <!-- JSON Container -->
              <div class="tercor border mt-4 p-4 overflow-x-auto max-h-screen max-w-screen prebox">
                  <pre class="code" id="codeOutput"></pre>
              </div>
            </div>
          </div>
        ${JsonJS(formattedJSON, req.access.nonce ? req.access.nonce : "")}
        `;
		} else {
			return `
            <div class="tercor border mt-4 p-4 overflow-x-auto max-h-screen max-w-screen prebox">
              <h1 class="pritext text-2xl font-bold">${i18n.t("http:messages.api.ResourcesNotFound")}</h1>
            </div>
        </div>
      </div>
      <script nonce="${req?.access?.nonce}">
    function navigateToPage(page) {
        // Obtenha a parte da URL atual que não inclui a consulta (query) - Pode variar de acordo com o ambiente
        const currentURLWithoutQuery = window.location.origin + window.location.pathname;
        window.location.href = ${"`${currentURLWithoutQuery}?page=${page}`"};
    };
    </script>
    `;
		}
	})()}
  </body>

    </html>
  `;
}
