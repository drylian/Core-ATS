// Função para aguardar um determinado tempo em milissegundos
function delay(ms: number):Promise<any> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export{ delay };