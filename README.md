# Teste Eniwine - Guilherme Souza Silva

## Descrição

Foi criado um jogo em single-page para adivinhar um assassino em casos aleatórios com dados provindos de API já criada.

## Ferramentas e tecnologias utilizadas

### Build

#### Servidor + Automatizador + npm
Utilizei um servidor em Node.js com uma automação de tarefas em Gulp.js. Além do NPM para organizar as dependências e tornar o desenvolvimento portável.

O automatizador realizava os seguintes passos:
1. Verificava modificações em arquivos .html .css e .js
2. Minificava e concatenava os arquivos (caso houvesse mais de um)
3. Em arquivos css, adicionava prefixadores para compatibilidade com browsers antigos (caso houvesse necessidade)
4. Recarregava o navegador com a página em aberto

Utilizo essas ferramentas para aumentar produtividade e êxito na criação do projeto

#### Framework Bootstrap
Foi utilizado o framework Bootstrap na sua versão 4 por conter diversos elementos de layout e design que facilitam o trabalho e requerem o mínimo de modificações. Além de prover um fácil desenvolvimento, ganho na produtividade por já conhcer muito bem o framework.

#### JS/JQuery
Utilizei jQuery na maior parte das funções por facilitar e automatizar o desenvolvimento.
Criei uma 'Library' (Game) para encapsular e manter o código organizado e somente uma função operava todo o setup da aplicação.

## Layout

### Mobile First
Utilizo sempre esse approach, focando no desenvolvimento mobile e crescendo conforme assertividade. Dado o grande número de usuários mobile, foco neste desenvolvimento.

## Utilização

Mantive a build caso necessário.
Executar o arquivo index.html encontrado na pasta /dist
