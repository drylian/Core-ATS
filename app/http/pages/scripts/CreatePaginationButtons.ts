import I18alt from "@/controllers/Language";

export default function createPaginationButtons(currentPage: number, totalPages: number, resultsCount: number) {
	const i18n = new I18alt();
	const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => ({
		value: page,
		text: page,
	}));
	if (currentPage > totalPages)
		return `
    <div class="ml-4 pagination-warning">
      <p class="sectext text-lg font-bold">
      ${i18n.t("attributes.api.meta.pagenotfound")},
        <a class="text-blue-500" href="javascript:void(0);" onclick="navigateToPage(1)" aria-label="Primeira Página">
        ${i18n.t("attributes.api.meta.selectOnePage")}
        </a>
      </p>
    </div>
  `;

	let paginationButtons = `
    <nav>
      <ul class="flex">
  `;

	if (currentPage > 1) {
		paginationButtons += `
      <li>
        <a
          class="icons pritext mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
          href="javascript:void(0);"
          onclick="navigateToPage(${currentPage - 1})"
          aria-label="Previous"
        >
            <i 
            style="font-size = 30px"
            class='bx bx-chevron-left' >
            </i>
            </a>
      </li>
    `;
	}
	if (currentPage - 2 > 1) {
		paginationButtons += `
        <li>
        <a
          class="icons pritext mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
          href="javascript:void(0);"
          onclick="navigateToPage(1)"
        >
        <i class='bx bx-chevrons-left'></i>
        </a>
      </li>
        `;
	}
	for (let i = currentPage - 2; i <= currentPage + 2; i++) {
		if (i < 1 || i > totalPages) {
			continue; // Ignorar números fora do intervalo de páginas
		}

		paginationButtons += `
        <li>
          <a
            class="pritext mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
	i === currentPage
		? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
		: "border border-blue-gray-100 bg-transparent text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
}"
            href="javascript:void(0);"
            onclick="navigateToPage(${i})"
          >
            ${i}
          </a>
        </li>
        `;
	}

	// Incluir "..." se houver páginas depois da última página
	if (currentPage + 2 < totalPages) {
		paginationButtons += `
          <li>
            <a
              class="icons pritext mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="javascript:void(0);"
              onclick="navigateToPage(${totalPages})"
            >
            <i class='bx bx-chevrons-right'></i>
            </a>
          </li>
        `;
	}

	if (currentPage < totalPages) {
		paginationButtons += `
          <li>
            <a
              class="icons pritext mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              href="javascript:void(0);"
              onclick="navigateToPage(${currentPage + 1})"
              aria-label="Next"
            >
            <i 
            class='bx bx-chevron-right' >
            </i>
            </a>
          </li>
    `;
	}
	paginationButtons += `
            <div class="ml-4 pagination-dropdown">
                <select
                class="text-black border rounded p-1 ml-2"
                id="pageSelect"
                onchange="navigateToPage(parseInt(this.value, 10))"
                >
                ${pageOptions
		.map(
			(option) => `
                    <option value="${option.value}" ${option.value === currentPage ? "selected" : ""}>
                    ${option.text}
                    </option>
                `,
		)
		.join("")}
                </select>
            </div>
        </ul>
    </nav>
    <div style="margin-left:15px" class="flex justify-end">
        <p class="sectext text-lg font-bold">
        ${i18n.t("attributes.api.meta.pageTotal")}: <span class="pritext font-bold">${totalPages}</span>,
        ${i18n.t("attributes.api.meta.pageCurrent")}: <span class="pritext font-bold">${currentPage}</span>,
        ${i18n.t("attributes.api.meta.pageResult")}: <span class="pritext font-bold">${resultsCount}</span>
        </p>
    </div>
    `;

	return paginationButtons;
}
