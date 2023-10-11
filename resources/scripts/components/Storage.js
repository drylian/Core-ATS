// Função para armazenar um item localmente
export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Função para obter um item armazenado localmente
export function getItem(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}

// Função para remover um item armazenado localmente
export function delItem(key) {
    localStorage.removeItem(key);
}
export default {
    setItem,
    getItem,
    delItem
}