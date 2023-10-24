export default function JsonJS<T>(data: T) {
	// essa função não é usada pelo backend, é usada para um html
	/* eslint-disable no-useless-escape */
	return `
    <script>
        // Função para colorir a sintaxe do JSON
        function syntaxHighlight(json) {
            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b)/g,
                function (match) {
                    let color = 'json-number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            color = 'json-key';
                        } else {
                            color = 'json-string';
                        }
                    } else if (/true|false/.test(match)) {
                        color = 'json-boolean';
                    } else if (/null/.test(match)) {
                        color = 'json-null';
                    }
                    return '<span class="' + color + '">' + match + '</span>';
                }
            );
        }

        // Carregando o JSON por ID
        document.getElementById('json').innerHTML = syntaxHighlight(JSON.stringify(${data}, null, 2));
    </script>
`;
}