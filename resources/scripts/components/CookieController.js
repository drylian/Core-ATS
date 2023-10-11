
export function setCookie(name, value, expireDate = undefined) {
  const existingCookie = getCookie(name);

  // Se o cookie já existe, remova-o
  if (existingCookie) {
    delCookie(name);
  }

  if (expireDate) {
    const now = new Date().getTime(); // Obtém a data atual em milissegundos
    const expireTime = new Date(expireDate).getTime(); // Converte a data de expiração em milissegundos
    const timeDifference = expireTime - now; // Calcula a diferença de tempo em milissegundos

    if (timeDifference > 0) {
      const expirationDate = new Date(now + timeDifference);
      const expires = `expires=${expirationDate.toUTCString()};`;
      document.cookie = `${name}=${value}; ${expires} path=/`;
    } else {
      // A data de expiração é anterior à data atual, o cookie já expirou
      console.error("A data de expiração desse cookie ja expirou.");
    }
  } else {
    // Se expireDate não for fornecido, o cookie será uma "cookie de sessão"
    document.cookie = `${name}=${value}; path=/`;
  }
}

// Função auxiliar para obter um cookie pelo nome
export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Função auxiliar para remover um cookie pelo nome
export function delCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export default {
  setCookie,
  getCookie,
  delCookie
}