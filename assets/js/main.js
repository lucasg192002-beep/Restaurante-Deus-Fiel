// =============================================================================
// RESTAURANTE DEUS É FIEL — COMPORTAMENTOS DO SITE (assets/js/main.js)
// Arquivo compartilhado por todas as páginas. A navegação entre páginas NÃO depende
// dele: cada página é um arquivo .html com link normal. Aqui ficam só os extras.
//   [JS-01] Menu lateral (celular)   [JS-02] Barra de progresso   [JS-03] Animação de entrada
//   [JS-05] Abas do cardápio (só em /cardapio/)   [JS-06] Cartões da página Sobre (passam na horizontal)
// Padrão: todo bloco novo ganha um cabeçalho [JS-NN] e cada instrução um comentário.
// =============================================================================

// ===== [JS-01] MENU LATERAL (abrir e fechar no celular/tablet) ==============
const sidebar = document.getElementById('sidebar');          // o menu lateral
const overlay = document.getElementById('sidebarOverlay');   // fundo escuro atrás do menu
const menuBtn = document.getElementById('menuBtn');          // botão ☰ da barra superior
const closeBtn = document.getElementById('sidebarClose');    // botão × dentro do menu

// Abre o menu: mostra a gaveta e o fundo escuro, trava a rolagem da página e avisa os leitores de tela
function openSidebar(){
  sidebar.classList.add('is-open');
  overlay.classList.add('is-visible');
  document.body.classList.add('no-scroll');
  menuBtn && menuBtn.setAttribute('aria-expanded', 'true');
}
// Fecha o menu: desfaz tudo o que openSidebar fez
function closeSidebar(){
  sidebar.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.body.classList.remove('no-scroll');
  menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
}
if (menuBtn) menuBtn.addEventListener('click', openSidebar);    // clicar no ☰ abre
if (closeBtn) closeBtn.addEventListener('click', closeSidebar); // clicar no × fecha
if (overlay) overlay.addEventListener('click', closeSidebar);   // clicar fora do menu fecha
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); }); // tecla Esc fecha
if (sidebar){
  // Clicar em qualquer link do menu fecha o menu (só no celular/tablet; no desktop o menu é fixo)
  sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 1024) closeSidebar();
  }));
}


// ===== [JS-02] BARRA DE PROGRESSO DE ROLAGEM ================================
const progressBar = document.getElementById('progressBar'); // barrinha fina no topo da tela
// Calcula quanto da página já foi rolado (0 a 100%) e ajusta a largura da barrinha
function updateProgress(){
  if (!progressBar) return;
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = (isFinite(scrolled) ? scrolled : 0) + '%';
}
document.addEventListener('scroll', updateProgress, { passive:true }); // atualiza a cada rolagem
updateProgress();                                                      // e uma vez ao carregar


// ===== [JS-03] ANIMAÇÃO DE ENTRADA (elementos com class="reveal") ===========
const revealEls = document.querySelectorAll('.reveal'); // todos os elementos que aparecem "subindo"
// O observador avisa quando um elemento entra na tela; aí ele ganha a classe is-visible ([CSS-09])
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold:.15, rootMargin:'0px 0px -8% 0px' });
revealEls.forEach(el => io.observe(el)); // começa a observar cada elemento


// ===== [JS-05] ABAS DO CARDÁPIO =============================================
// Cada botão .menu-tab aponta (aria-controls) para o id de um painel .menu-panel.
// Clicar numa aba mostra o painel dela e esconde os outros. Não precisa mexer aqui
// para criar abas novas: basta seguir as instruções em [PAG-4-PAINEIS].
(function(){
  const tablist = document.querySelector('.menu-tabs');         // faixa com os botões das abas
  if (!tablist) return;                                          // sem abas na página: não faz nada
  const wrap = tablist.closest('.menu-tabs-wrap');              // faixa fixa (sticky) que guarda as abas
  const tabs = Array.prototype.slice.call(tablist.querySelectorAll('.menu-tab')); // todos os botões

  // Abre a aba escolhida. focus = true quando a troca veio do teclado (setas)
  function selectTab(tab, focus){
    tabs.forEach(function(t){
      const on = (t === tab);
      t.setAttribute('aria-selected', on ? 'true' : 'false');   // marca qual aba está aberta (e pinta de laranja)
      t.tabIndex = on ? 0 : -1;                                  // só a aba aberta recebe o Tab do teclado
      const p = document.getElementById(t.getAttribute('aria-controls')); // painel ligado a esta aba
      if (p) p.hidden = !on;                                     // mostra só o painel da aba aberta
    });
    if (focus) tab.focus();

    // No celular a faixa rola para o lado: centraliza a aba escolhida
    const lr = tablist.getBoundingClientRect(), tr = tab.getBoundingClientRect();
    tablist.scrollLeft += (tr.left + tr.width / 2) - (lr.left + lr.width / 2);

    // Se a pessoa já tinha rolado a página para baixo, volta para o começo do painel novo
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel && wrap && panel.getBoundingClientRect().top < wrap.getBoundingClientRect().bottom){
      panel.scrollIntoView({ block:'start' });
    }
  }

  // Clique do mouse ou toque
  tabs.forEach(function(t){ t.addEventListener('click', function(){ selectTab(t, false); }); });

  // Teclado: setas esquerda/direita andam entre as abas; Home vai para a primeira; End para a última
  tablist.addEventListener('keydown', function(e){
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    let next = null;
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    if (next){ e.preventDefault(); selectTab(next, true); }
  });
})();


// ===== [JS-06] CARTÕES DA PÁGINA SOBRE: passam na horizontal, um por um ======
// O trilho (.sobre-trio) já rola com o dedo/mouse sem JavaScript; aqui só se acrescenta o avanço automático e as setas.
const trilho = document.querySelector('[data-slider]');
if (trilho){
  const cartoes = trilho.querySelectorAll('.sobre-block');
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches; // quem pediu menos movimento não tem avanço automático
  let pausado = false, naTela = true, timer = null;
  // largura de um passo = largura do cartão + espaço entre cartões
  const passo = () => cartoes[0].getBoundingClientRect().width + parseFloat(getComputedStyle(trilho).columnGap || 20);
  // vai para o próximo cartão (dir = 1) ou o anterior (dir = -1); no fim volta ao começo
  const ir = (dir) => {
    const fim = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
    if (dir > 0 && fim) trilho.scrollTo({ left:0, behavior:'smooth' });
    else if (dir < 0 && trilho.scrollLeft <= 4) trilho.scrollTo({ left:trilho.scrollWidth, behavior:'smooth' });
    else trilho.scrollBy({ left:dir * passo(), behavior:'smooth' });
  };
  // setas (só existem com JavaScript)
  const setas = document.createElement('div');
  setas.className = 'sobre-setas';
  setas.innerHTML = '<button type="button" aria-label="Cartão anterior">&#8249;</button><button type="button" aria-label="Próximo cartão">&#8250;</button>';
  trilho.insertAdjacentElement('afterend', setas);
  setas.children[0].addEventListener('click', () => ir(-1));
  setas.children[1].addEventListener('click', () => ir(1));
  // avanço automático a cada 6 segundos
  if (!reduz){
    timer = setInterval(() => { if (!pausado && naTela && !document.hidden) ir(1); }, 6000);
  }
  // pausa enquanto a pessoa lê (mouse em cima, toque ou foco no teclado)
  ['mouseenter','touchstart','focusin','pointerdown'].forEach(ev => trilho.addEventListener(ev, () => { pausado = true; }, { passive:true }));
  ['mouseleave','focusout'].forEach(ev => trilho.addEventListener(ev, () => { pausado = false; }));
  trilho.addEventListener('touchend', () => { setTimeout(() => { pausado = false; }, 8000); }, { passive:true });
  // só avança quando o trilho está visível na tela
  if ('IntersectionObserver' in window){
    new IntersectionObserver((e) => { naTela = e[0].isIntersecting; }, { threshold:.3 }).observe(trilho);
  }
}
