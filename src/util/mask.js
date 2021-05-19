export const Mascaras = {

  CPF: value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  },
  CEP: value => {
    return !value ? value :
      value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{5})(\d)/, '$1-$2')  
      .replace(/(-\d{3})\d+?$/, '$1') // captura 3 numeros seguidos de um traço e não deixa ser digitado mais nada
    },
    TELEFONE: value => {
      return !value ? value :
        value
        .replace(/\D/g,"") //Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d{3,5})(\d{4})$/,"$1-$2") //Coloca hífen entre o quarto e o quinto dígitos
        .replace(/(-\d{4})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    },
}
