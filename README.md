# Guia de Atividades — Natura & Avon

Site estático (HTML, CSS e JS puros — sem build, sem dependências) com os tutoriais das atividades.

## Estrutura

```
index.html          → página inicial (índice dos tutoriais)
styles.css           → estilo visual de todo o site
script.js             → menu mobile + checklist com progresso salvo no navegador
tutorials/
  cadastro-plano-b.html
  check-minha-consultoria.html
  check-perfumaria.html
  aba-ganhe-mais.html
  check-publicacao.html
```

## Publicar na Vercel

1. Crie uma conta em vercel.com (dá pra entrar com GitHub).
2. Clique em **Add New → Project**.
3. Se o projeto estiver num repositório do GitHub, selecione o repositório. Se não, use a opção de arrastar a pasta (**Deploy** → arraste esta pasta inteira, sem zipar).
4. Não é preciso configurar nada — é site estático puro (Framework: "Other", sem build command).
5. Clique em **Deploy**. Em menos de um minuto você recebe uma URL tipo `seu-projeto.vercel.app`.
6. Gere o QR code dessa URL em qualquer gerador (ex.: qr-code-generator.com) e é só imprimir ou compartilhar.

## Adicionar o 6º tutorial depois

1. Crie o arquivo `tutorials/nome-do-tutorial.html` copiando a estrutura de um dos existentes (cabeçalho, barra lateral, `<ol class="steps">`).
2. No `index.html`, troque o card "Em breve" pelo link real e adicione o item correspondente na barra lateral de **todas** as páginas (inclusive nas outras 5).
3. Ajuste o link "Próximo" no rodapé do tutorial 05 para apontar para o novo arquivo.
