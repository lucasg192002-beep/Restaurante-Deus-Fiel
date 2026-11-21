# Restaurante e Hotel Deus é Fiel

Site do **Restaurante e Hotel Deus é Fiel**, em Caetés - PE. Site estático (HTML, CSS e JavaScript puros), publicado na Vercel.
Endereço: https://restaurante-deus-fiel.vercel.app

## Páginas (cada uma tem URL própria)

| URL | Arquivo |
|---|---|
| `/` | `index.html` |
| `/sobre/` | `sobre/index.html` |
| `/delicias/` | `delicias/index.html` |
| `/cardapio/` | `cardapio/index.html` |
| `/depoimentos/` | `depoimentos/index.html` |
| `/localizacao/` | `localizacao/index.html` |
| `/hospedagem/` | `hospedagem/index.html` |
| `/faq/` | `faq/index.html` |

## Estrutura

```
index.html, sobre/, delicias/, cardapio/, hospedagem/, depoimentos/, localizacao/, faq/   páginas
assets/css/style.css     estilos de todas as páginas ([CSS-01..25])
assets/js/main.js        menu, barra de progresso, animações, abas do cardápio ([JS-01..05])
assets/img/              fotos (banner, salão), logo, imagem de compartilhamento (og-...) e favicon-192.png
favicon.ico, apple-touch-icon.png   ícone do site (a partir da logo)
404.html                 página de erro
sitemap.xml, robots.txt  indexação no Google
vercel.json              configuração da Vercel (cleanUrls + trailingSlash)
```

## Como editar

- Abra o arquivo `.html` da página e use Ctrl+F nos códigos entre colchetes (`[PAG-4.2]`, `[HTML-04]`...). Tudo é comentado.
- **Título e descrição do Google**: no `<head>` de cada página (únicos por página).
- **Menu lateral, rodapé e botão do WhatsApp** se repetem nas 7 páginas (e no `404.html`): ao mudar, altere em todos (Ctrl+F pelo texto).
- **Cores e visual**: `assets/css/style.css`. **Fotos**: substitua o arquivo em `assets/img/` mantendo o nome.
- **Página nova**: copie uma pasta existente, ajuste título/descrição/canonical, adicione o link no menu de todas as páginas e um bloco `<url>` no `sitemap.xml`.
- Se o endereço do site mudar, troque `https://restaurante-deus-fiel.vercel.app` (Ctrl+F) nos `.html`, em `sitemap.xml` e `robots.txt`.

## Publicação

Suba **todo o conteúdo desta pasta** para a raiz do repositório no GitHub (mantendo as pastas) e a Vercel publica sozinha.
Na Vercel, Application Preset: **Other**, sem build command.

## SEO (P2)

- **Texto da página Sobre é protegido** (texto institucional aprovado): não reescrever. Só mexa na estrutura HTML.
- Cada página tem título, descrição, canonical e metadados de compartilhamento (Open Graph/Twitter) próprios no `<head>`.
- Dados estruturados (JSON-LD): estabelecimento (Restaurant + Hotel) na página inicial e perguntas na `/faq/`. Só contêm dados confirmados; ao confirmar latitude/longitude, faixa de preço, tipo de cozinha ou horários de check-in/out, acrescente no bloco da página inicial.
- A página `/hospedagem/` só tem informações reais. Quando tiver tipos de quarto, comodidades, valores e fotos reais, complete o bloco `[PAG-8.2]`.
- Ao criar página nova: título/descrição/canonical/og, link no menu de todas as páginas e `<url>` no `sitemap.xml`.
