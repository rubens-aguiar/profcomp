/* Trilha Computação — protótipo local, sem autenticação real nem serviço remoto. */
'use strict';

const STORAGE_KEY = 'trilha-computacao-prototype-v1';
const { skills: SKILLS, games: INITIAL_GAMES, votes: INITIAL_VOTES, comments: INITIAL_COMMENTS } = window.TRAIL_DATA;
const STAGES = ['Educação Infantil', 'Ensino Fundamental', 'Ensino Médio'];

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function initialData() { return { games: clone(INITIAL_GAMES), skills: clone(SKILLS), votes: clone(INITIAL_VOTES), comments: clone(INITIAL_COMMENTS), feedback: [], suggestions: [] }; }
function readData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialData();
    const parsed = JSON.parse(saved);
    const fallback = initialData();
    const migrated = { ...fallback, ...parsed,
      games: Array.isArray(parsed.games) ? parsed.games : fallback.games,
      skills: mergeSavedSkills(parsed.skills),
      votes: Array.isArray(parsed.votes) ? parsed.votes : fallback.votes,
      comments: Array.isArray(parsed.comments) ? parsed.comments : fallback.comments,
      feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch (error) { console.warn('Dados locais indisponíveis; usando a base inicial.', error); return initialData(); }
}
let data = readData();
let activeRole = null;
let activeName = '';
let selectedChoice = null;
let currentRating = 0;
let filterState = { search: '', stage: '', skill: '', concept: '', axis: '', type: '', sort: 'rating' };
let editingSuggestionId = null;
let rejectingSuggestionId = null;
let currentFiltersInitialized = false;
const app = document.getElementById('app');
const headerNav = document.getElementById('header-nav');
function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (error) { toast('Não foi possível guardar esta alteração neste navegador.', true); console.warn(error); } }
function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
function attr(value = '') { return escapeHtml(value); }
function shortDate(value) { try { return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(value)); } catch { return ''; } }
function skillByCode(code) { return data.skills.find(item => item.code === code) || { code, name: 'Habilidade não encontrada', description: '' }; }
function gameById(id) { return data.games.find(game => game.id === id); }
function makeId(prefix) { return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }
function averageVotes(gameId, skillCode = '') { const list = data.votes.filter(vote => vote.gameId === gameId && (!skillCode || vote.skill === skillCode)); if (!list.length) { const game = gameById(gameId); return { average: game?.rating || 0, count: game?.ratingCount || 0 }; } return { average: list.reduce((sum, vote) => sum + Number(vote.rating), 0) / list.length, count: list.length }; }
function displayRating(game) { const result = averageVotes(game.id); return result.average ? result.average.toFixed(1).replace('.', ',') : '—'; }
function totalReviews(game) { const result = averageVotes(game.id); return result.count; }
function toast(message, error = false) { let region = document.querySelector('.toast-region'); if (!region) { region = document.createElement('div'); region.className = 'toast-region'; region.setAttribute('role', 'status'); region.setAttribute('aria-live', 'polite'); document.body.append(region); } const item = document.createElement('div'); item.className = 'toast' + (error ? ' error' : ''); item.textContent = message; region.append(item); setTimeout(() => item.remove(), 3800); }
function navTo(route) { location.hash = route; }
function setHeader() {
  if (activeRole === 'teacher') headerNav.innerHTML = `<span class="nav-status">Olá, ${escapeHtml(activeName || 'educador(a)')}</span><a class="nav-link" href="#/teacher/catalog">Área docente</a><button class="nav-link" type="button" data-action="logout">Sair</button>`;
  else if (activeRole === 'curator') headerNav.innerHTML = `<span class="nav-status">Olá, ${escapeHtml(activeName || 'curador(a)')}</span><a class="nav-link" href="#/curator/catalog">Curadoria</a><button class="nav-link" type="button" data-action="logout">Sair</button>`;
  else headerNav.innerHTML = '<a class="nav-link" href="#/login/teacher">Educadores <span aria-hidden="true">↗</span></a><a class="nav-link primary" href="#/login/curator">Curadoria <span aria-hidden="true">↗</span></a>';
}
function statusClass(status) { return ({ 'Pendente': 'pending', 'Aprovada': 'approved', 'Ajustada': 'adjusted', 'Recusada': 'rejected' })[status] || ''; }
function prototypeNote() { return '<div class="prototype-note">Os títulos, avaliações e opiniões iniciais são conteúdo ilustrativo do protótipo; gratuidade, acesso e licença precisam ser validados pela curadoria antes de publicação.</div>'; }
function thumb(game, large = false) {
  if (game.image) return `<div class="game-thumb${large ? ' large-thumb' : ''}"><img src="${attr(game.image)}" alt="Prévia visual enviada para ${attr(game.title)}" loading="lazy"></div>`;
  const cls = game.id.includes('rota') ? 'thumb-network' : game.id.includes('detet') ? 'thumb-data' : 'thumb-security';
  return `<div class="game-thumb placeholder ${cls}${large ? ' large-thumb' : ''}" role="img" aria-label="Área reservada para miniatura de ${attr(game.title)}"><span class="thumb-glyph" aria-hidden="true">${escapeHtml(game.icon || '◇')}</span><span class="thumb-caption">Miniatura do jogo</span></div>`;
}
function gameCard(game) { const rating = displayRating(game); const count = totalReviews(game); return `<article class="game-card"><a href="#/play/${encodeURIComponent(game.id)}" class="card-thumb-link" aria-label="Acessar ${attr(game.title)}">${thumb(game)}</a><h3><a href="#/play/${encodeURIComponent(game.id)}">${escapeHtml(game.title)}</a></h3><p class="summary">${escapeHtml(game.description)}</p><div class="game-card-foot"><span class="rating" aria-label="Nota média ${rating} de 5">★ ${rating} <span>· ${count} votos docentes</span></span><a class="btn small" href="#/play/${encodeURIComponent(game.id)}">Acessar jogo <span aria-hidden="true">→</span></a></div></article>`; }
function filteredGames() {
  const query = filterState.search.trim().toLocaleLowerCase('pt-BR');
  let list = data.games.filter(game => {
    const skillRecords = game.skills.map(code => skillByCode(code));
    const skillText = skillRecords.map(skill => `${skill.code} ${skill.name} ${skill.description} ${skill.stage} ${skill.substage}`).join(' ');
    const searchable = [game.title, game.description, skillText, ...(game.concepts || []), game.axis, game.type].join(' ').toLocaleLowerCase('pt-BR');
    const matchesStage = !filterState.stage || skillRecords.some(skill => skill.stage === filterState.stage);
    return matchesStage && (!query || searchable.includes(query)) && (!filterState.skill || game.skills.includes(filterState.skill)) && (!filterState.concept || (game.concepts || []).includes(filterState.concept)) && (!filterState.axis || game.axis === filterState.axis) && (!filterState.type || game.type === filterState.type);
  });
  if (filterState.sort === 'rating') list.sort((a, b) => { const rb=averageVotes(b.id); const ra=averageVotes(a.id); return rb.count-ra.count || rb.average-ra.average; });
  if (filterState.sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
  if (filterState.sort === 'new') list.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  return list;
}
function getOptions(field) { return [...new Set(data.games.flatMap(game => Array.isArray(game[field]) ? game[field] : game[field] ? [game[field]] : []))].sort((a, b) => a.localeCompare(b, 'pt-BR')); }
function stageForSkillCode(code) {
  if (/^EI\d{2}CO/.test(code)) return 'Educação Infantil';
  if (/^EF0[1-9]CO/.test(code)) return 'Ensino Fundamental';
  if (/^EM13CO/.test(code)) return 'Ensino Médio';
  return 'Outra habilidade local';
}
function substageForSkillCode(code) {
  if (code.startsWith('EI')) return `Grupo EI${code.slice(2,4)}`;
  if (code.startsWith('EF')) return `${Number(code.slice(2,4))}º ano`;
  if (code.startsWith('EM13')) return 'EM13 (código comum à etapa)';
  return 'Registro local';
}
function mergeSavedSkills(savedSkills) {
  const officialCodes = new Set(SKILLS.map(skill => skill.code.toUpperCase()));
  const custom = [];
  const seen = new Set(officialCodes);
  for (const item of Array.isArray(savedSkills) ? savedSkills : []) {
    const code = String(item?.code || '').trim().toUpperCase();
    if (!code || seen.has(code)) continue;
    seen.add(code);
    custom.push({ ...item, code, name: item.name || item.description || code,
      stage: item.stage || stageForSkillCode(code), substage: item.substage || substageForSkillCode(code),
      official: false, source: item.source || 'Registro local de curadoria' });
  }
  return [...clone(SKILLS), ...custom];
}
function stageOptionsHtml(selected = '') {
  return `<option value="">Todas as etapas</option>${STAGES.map(stage => `<option value="${attr(stage)}" ${selected === stage ? 'selected' : ''}>${escapeHtml(stage)}</option>`).join('')}`;
}
function skillOptionsForStage(stage, selected = '') {
  if (!stage) return '<option value="">Selecione primeiro uma etapa</option>';
  const skills = data.skills.filter(skill => skill.stage === stage);
  if (!skills.length) return '<option value="">Nenhuma habilidade cadastrada nesta etapa</option>';
  const groups = [...new Set(skills.map(skill => skill.substage || stage))];
  return `<option value="">Todas as habilidades desta etapa</option>${groups.map(group => `<optgroup label="${attr(group)}">${skills.filter(skill => (skill.substage || stage) === group).map(skill => `<option value="${attr(skill.code)}" ${selected === skill.code ? 'selected' : ''}>${escapeHtml(skill.code)} · ${escapeHtml(skill.name || skill.description)}</option>`).join('')}</optgroup>`).join('')}`;
}
function selectedSkillDetailHtml() {
  const skill = filterState.skill ? skillByCode(filterState.skill) : null;
  if (skill?.description) {
    const kind = skill.stage === 'Educação Infantil' ? 'OBJETIVO DE APRENDIZAGEM' : 'HABILIDADE';
    return `<div class="skill-filter-detail selected" id="filter-skill-detail" role="status" aria-live="polite"><span>${kind} · ${escapeHtml(skill.substage || skill.stage)} · ${escapeHtml(skill.code)}</span><p>${escapeHtml(skill.description)}</p></div>`;
  }
  if (filterState.stage) {
    const count = data.skills.filter(skill => skill.stage === filterState.stage).length;
    return `<div class="skill-filter-detail" id="filter-skill-detail" role="status" aria-live="polite">${escapeHtml(filterState.stage)}: ${count} registros curriculares. Escolha uma habilidade ou objetivo no segundo campo.</div>`;
  }
  return '<div class="skill-filter-detail" id="filter-skill-detail" role="status" aria-live="polite">Escolha primeiro a etapa e, em seguida, a habilidade ou objetivo correspondente.</div>';
}
function catalogFilterFields({ teacher = false } = {}) {
  return `<div class="filters ${teacher ? 'teacher-filters' : ''}" aria-label="Buscas e filtros do catálogo"><label class="filter-step-field"><span class="filter-step">1 · Etapa de ensino</span><select class="control" id="filter-stage">${stageOptionsHtml(filterState.stage)}</select></label><label class="filter-step-field"><span class="filter-step">2 · Habilidade ou objetivo</span><select class="control" id="filter-skill" aria-describedby="filter-skill-detail" ${filterState.stage ? '' : 'disabled'}>${skillOptionsForStage(filterState.stage, filterState.skill)}</select></label><label class="search-control"><span class="visually-hidden">Buscar jogos ou textos de habilidades</span><input class="control" id="filter-search" type="search" value="${attr(filterState.search)}" placeholder="Buscar jogo, código ou texto…" autocomplete="off"></label><label><span class="visually-hidden">Filtrar por conceito</span><select class="control" id="filter-concept"><option value="">Todos os conceitos</option>${getOptions('concepts').map(item => `<option value="${attr(item)}" ${filterState.concept === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}</select></label>${teacher ? '' : `<label><span class="visually-hidden">Filtrar por eixo</span><select class="control" id="filter-axis"><option value="">Todos os eixos</option>${getOptions('axis').map(item => `<option value="${attr(item)}" ${filterState.axis === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}</select></label><label><span class="visually-hidden">Filtrar por tipo de jogo</span><select class="control" id="filter-type"><option value="">Todos os tipos</option>${getOptions('type').map(item => `<option value="${attr(item)}" ${filterState.type === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}</select></label>`}</div><div class="skill-detail-wrap">${selectedSkillDetailHtml()}</div>`;
}
function catalogEmptyState() {
  let heading = 'Nenhum jogo encontrado';
  let message = 'Tente remover um filtro ou buscar outro termo.';
  if (filterState.skill) {
    const skill = skillByCode(filterState.skill);
    heading = `Ainda não há jogo associado a ${skill.code}`;
    message = 'A habilidade/objetivo está no inventário da BNCC, mas ainda não tem jogo associado no catálogo demonstrativo. A curadoria precisa validar recursos antes de recomendá-los.';
  } else if (filterState.stage) {
    heading = `Nenhum jogo associado a ${filterState.stage}`;
    message = 'A etapa tem registros curriculares disponíveis no segundo campo, mas o catálogo demonstrativo ainda não tem jogos vinculados a este recorte.';
  }
  return `<div class="empty-state"><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(message)}</p><button class="btn secondary" data-action="clear-filters">Limpar filtros</button></div>`;
}
function skillCheckboxGroups(selectedCodes = []) {
  const stages = [...STAGES, ...new Set(data.skills.map(skill => skill.stage).filter(stage => !STAGES.includes(stage)))];
  return stages.map(stage => {
    const stageSkills = data.skills.filter(skill => skill.stage === stage);
    if (!stageSkills.length) return '';
    const groups = [...new Set(stageSkills.map(skill => skill.substage || stage))];
    const countLabel = stage === 'Educação Infantil' ? `${stageSkills.length} objetivos` : `${stageSkills.length} habilidades`;
    const subgroupMarkup = groups.map(group => `<details class="skill-subgroup"><summary>${escapeHtml(group)} <span>${stageSkills.filter(skill => (skill.substage || stage) === group).length}</span></summary><div class="skill-option-list">${stageSkills.filter(skill => (skill.substage || stage) === group).map(skill => `<label class="check-option skill-check-option"><input type="checkbox" name="skills" value="${attr(skill.code)}" ${selectedCodes.includes(skill.code) ? 'checked' : ''}><span><strong>${escapeHtml(skill.code)} · ${escapeHtml(skill.name || '')}</strong><small>${escapeHtml(skill.description)}</small></span></label>`).join('')}</div></details>`).join('');
    return `<details class="skill-stage-group"><summary><strong>${escapeHtml(stage)}</strong><span>${countLabel}</span></summary><div class="skill-subgroups">${subgroupMarkup}</div></details>`;
  }).join('');
}
function renderStudentCatalog() {
  const games = filteredGames();
  const concepts = getOptions('concepts').map(item => `<option value="${attr(item)}" ${filterState.concept === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('');
  const axes = getOptions('axis').map(item => `<option value="${attr(item)}" ${filterState.axis === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('');
  const types = getOptions('type').map(item => `<option value="${attr(item)}" ${filterState.type === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('');
  app.innerHTML = `<section aria-labelledby="catalog-title"><div class="page-head"><div><div class="eyebrow">ESCOLHA UM JOGO</div><h1 id="catalog-title">O que vamos jogar hoje?</h1><p class="subhead">Explore os desafios. Para localizar pelo currículo, escolha primeiro a etapa e depois uma habilidade ou objetivo.</p></div></div>${catalogFilterFields()}<div class="filter-row"><span class="text-small">Busca curricular: <strong>1. Etapa → 2. Habilidade ou objetivo</strong></span><label class="result-count">Ordenar <select id="filter-sort" class="field" style="width:auto;min-height:34px;padding:6px 9px"><option value="rating" ${filterState.sort === 'rating' ? 'selected' : ''}>Mais votados</option><option value="new" ${filterState.sort === 'new' ? 'selected' : ''}>Mais recentes</option><option value="title" ${filterState.sort === 'title' ? 'selected' : ''}>A–Z</option></select></label><button class="btn secondary small" data-action="clear-filters">Limpar filtros</button><span class="result-count" id="student-result-count" aria-live="polite">${games.length} ${games.length === 1 ? 'jogo' : 'jogos'}</span></div><div class="catalog-grid" id="catalog-grid">${games.length ? games.map(gameCard).join('') : catalogEmptyState()}</div>${prototypeNote()}</section>`;
}
function renderLogin(role) {
  const isCurator = role === 'curator';
  app.innerHTML = `<section class="login-shell"><div class="login-card"><div class="login-emblem" aria-hidden="true">↗</div><div class="eyebrow" style="margin-top:18px">ACESSO RESTRITO</div><h1>${isCurator ? 'Acesso à Curadoria' : 'Acesso de Educadores'}</h1><p class="subhead">Entre para ${isCurator ? 'gerenciar o catálogo e revisar sugestões.' : 'planejar suas aulas e compartilhar experiências.'}</p><div class="login-demo"><strong>Modo de demonstração local.</strong> Não existe autenticação real neste protótipo. Use um nome e um e-mail fictícios; sua senha não será enviada nem armazenada.</div><form id="login-form" data-role="${role}"><label class="field-label" for="login-name">Como podemos chamar você?</label><input class="field" id="login-name" name="name" autocomplete="off" placeholder="Ex.: Ana" required maxlength="50"><label class="field-label" for="login-email">E-mail fictício para esta sessão</label><input class="field" id="login-email" name="email" type="email" autocomplete="off" placeholder="ana@exemplo.local" required maxlength="120"><label class="field-label" for="login-password">Senha inventada</label><input class="field" id="login-password" name="password" type="password" autocomplete="new-password" placeholder="Não use sua senha real" required minlength="4"><button class="btn" type="submit">Entrar no modo local <span aria-hidden="true">→</span></button></form><p class="text-small"><a href="#/" class="back-link">← Voltar ao catálogo de jogos</a></p></div></section>`;
}
function studentRatingForm(game) { return `<section class="panel" aria-labelledby="feedback-title"><div class="eyebrow">SUA OPINIÃO</div><h2 id="feedback-title">Como foi jogar?</h2><p class="text-small">Sua resposta é anônima. Não escreva seu nome, turma ou outras informações que identifiquem você.</p><form id="student-feedback-form" data-game="${attr(game.id)}"><fieldset style="border:0;padding:0;margin:16px 0"><legend class="field-label">Sua experiência, de 1 a 5 estrelas</legend><div class="rating-select" role="radiogroup" aria-label="Avalie sua experiência de uma a cinco estrelas">${[5,4,3,2,1].map(n => `<input id="rating-${n}" name="rating" type="radio" value="${n}" required><label for="rating-${n}" title="${n} de 5 estrelas" aria-label="${n} de 5 estrelas">★</label>`).join('')}</div></fieldset><label class="field-label" for="student-comment">Quer contar mais? (opcional)</label><textarea class="field" id="student-comment" name="comment" maxlength="500" placeholder="O que você gostou ou achou difícil?"></textarea><div class="privacy-note"><span aria-hidden="true">◉</span><span>O comentário não aparece para outros estudantes. Professores e curadores autenticados podem consultá-lo sem seu nome.</span></div><button class="btn" type="submit">Enviar opinião</button></form></section>`; }
function renderPlay(id) {
  const game = gameById(id); if (!game) { app.innerHTML = '<div class="empty-state"><h2>Este jogo não está disponível</h2><a class="btn" href="#/">Voltar ao catálogo</a></div>'; return; }
  const started = selectedChoice !== null;
  app.innerHTML = `<nav class="breadcrumb" aria-label="Trilha de navegação"><a href="#/">Catálogo</a><span aria-hidden="true">/</span><span>${escapeHtml(game.title)}</span></nav><div class="page-head"><div><div class="eyebrow">PRÉVIA DO JOGO</div><h1>${escapeHtml(game.title)}</h1><p class="subhead">${escapeHtml(game.description)}</p></div><a class="btn secondary" href="#/">← Voltar aos jogos</a></div><div class="play-layout"><section class="panel"><div class="game-stage">${game.image ? `<img src="${attr(game.image)}" alt="Prévia visual de ${attr(game.title)}">` : `<div class="stage-placeholder"><div class="stage-symbol" aria-hidden="true">${escapeHtml(game.icon || '◇')}</div><div class="eyebrow" style="justify-content:center">ÁREA DO JOGO</div><h2>Prévia navegável</h2><p>O endereço do jogo real aguarda validação da curadoria. Esta interação local serve apenas para experimentar o fluxo do protótipo.</p></div>`}</div><div class="notice">Esta atividade é uma prévia ilustrativa, não uma avaliação escolar. Nenhuma resposta é usada para atribuir nota ou medir aprendizagem.</div>${safeUrl(game.url)?`<p><a class="btn" href="${attr(safeUrl(game.url))}" target="_blank" rel="noopener noreferrer">Abrir jogo em nova aba ↗</a></p>`:'<p class="text-small">O endereço do jogo real ainda não foi validado.</p>'}<div class="stage-prompt"><strong>${escapeHtml(game.playable || 'Escolha uma opção para experimentar a atividade.')}</strong><div class="choice-row" style="margin-top:12px">${(game.options || ['Opção A','Opção B','Opção C']).map(option => `<button type="button" class="choice ${selectedChoice === option ? 'selected' : ''}" data-action="choose-play" data-choice="${attr(option)}">${escapeHtml(option)}</button>`).join('')}</div>${started ? '<p class="success-note notice" role="status">Escolha registrada somente nesta sessão de prévia. Agora, se quiser, conte como foi a experiência.</p>' : ''}</div></section>${studentRatingForm(game)}</div>`;
}
function dashboardNav(role, active) {
  const teacher = role === 'teacher';
  const base = teacher ? '#/teacher/' : '#/curator/';
  const links = teacher ? [['catalog','⌕','Catálogo'],['suggest','＋','Sugerir jogo'],['feedback','◉','Opiniões dos alunos']] : [['catalog','▦','Jogos'],['suggestions','⇄','Sugestões'],['skills','⌘','Habilidades BNCC'],['reports','▤','Relatórios']];
  return `<aside class="dashboard-side" aria-label="Navegação da área ${teacher ? 'docente' : 'de curadoria'}"><div class="side-label">${teacher ? 'DOCÊNCIA' : 'CURADORIA'}</div>${links.map(([route, icon, label]) => `<a class="side-link ${active === route ? 'active' : ''}" href="${base}${route}"><span aria-hidden="true">${icon}</span>${label}</a>`).join('')}</aside>`;
}
function teacherShell(active, title, content) { app.innerHTML = `<div class="dashboard-layout">${dashboardNav('teacher', active)}<section class="dashboard-main"><div class="dashboard-title"><div><div class="eyebrow">ÁREA DOCENTE</div><h1>${escapeHtml(title)}</h1><p class="subhead">Planeje, compartilhe e aprenda com a experiência de outros professores.</p></div></div>${content}</section></div>`; }
function curatorShell(active, title, content) { app.innerHTML = `<div class="dashboard-layout">${dashboardNav('curator', active)}<section class="dashboard-main"><div class="dashboard-title"><div><div class="eyebrow">CURADORIA</div><h1>${escapeHtml(title)}</h1><p class="subhead">Mantenha o catálogo e as informações pedagógicas organizados.</p></div></div>${content}</section></div>`; }
function teacherCatalog() {
  const games = filteredGames();
  const cards = games.map(game => `<article class="game-card">${thumb(game)}<h3>${escapeHtml(game.title)}</h3><p class="summary">${escapeHtml(game.description)}</p><div class="tag-list">${game.skills.map(code => `<span class="skill-pill">${escapeHtml(code)}</span>`).join('')}</div><div class="game-card-foot"><span class="rating">★ ${displayRating(game)} <span>· ${totalReviews(game)} opiniões</span></span><a class="btn small" href="#/teacher/game/${encodeURIComponent(game.id)}">Ver ficha docente →</a></div></article>`).join('');
  const content = `${catalogFilterFields({teacher:true})}<div class="filter-row"><span class="text-small">Busca curricular: <strong>1. Etapa → 2. Habilidade ou objetivo</strong></span><button class="btn secondary small" data-action="clear-filters">Limpar filtros</button><span class="result-count" id="teacher-result-count" aria-live="polite">${games.length} ${games.length === 1 ? 'jogo' : 'jogos'} no acervo local</span></div><div class="catalog-grid" id="teacher-grid">${games.length ? cards : catalogEmptyState()}</div>${prototypeNote()}`;
  teacherShell('catalog','Encontre um jogo para sua aula',content);
}
function teacherGame(id) {
  const game = gameById(id); if (!game) { teacherShell('catalog','Jogo indisponível','<div class="empty-state">Este registro foi removido.</div>'); return; }
  const currentSkill = filterState.skill && game.skills.includes(filterState.skill) ? filterState.skill : (game.skills[0] || '');
  const stats = averageVotes(game.id, currentSkill);
  const pairVotes = data.votes.filter(v => v.gameId === game.id && v.skill === currentSkill);
  const pairComments = data.comments.filter(c => c.gameId === game.id && c.skill === currentSkill);
  const content = `${prototypeNote()}<div class="form-card"><div class="form-grid"><div class="span-2">${thumb(game,true)}</div><div><div class="eyebrow">FICHA PEDAGÓGICA</div><h2>${escapeHtml(game.title)}</h2><p class="muted">${escapeHtml(game.description)}</p></div><div class="detail-grid">${[['Habilidades',game.skills.map(code=>`${code} · ${skillByCode(code).description}`).join(' / ')],['Conceitos',(game.concepts||[]).join(', ')],['Eixo',game.axis],['Tipo',game.type],['Link de acesso',safeUrl(game.url)||'Ainda não informado'],['Código-fonte',safeUrl(game.source)||'Ainda não informado'],['Requisitos',game.requirements],['Público recomendado',game.audience],['Relação transversal',game.transversal],['Alinhamento',game.justification]].map(([label,value])=>`<div class="detail"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(value||'A preencher')}</p></div>`).join('')}</div></div><hr class="section-divider"><h3>Mediação pedagógica</h3><div class="detail-grid">${[['Antes da atividade',game.before],['Durante a atividade',game.during],['Depois da atividade',game.after],['Sugestão de avaliação (responsabilidade docente)',game.assessment],['Limitações e condições de uso',game.limitations]].map(([label,value])=>`<div class="detail"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(value||'A preencher')}</p></div>`).join('')}</div></div><div class="form-card" style="margin-top:15px"><div class="eyebrow">CONTRIBUIÇÃO DOCENTE</div><h2>Este jogo combina com qual habilidade?</h2><label class="field-label" for="pair-skill">Habilidade para avaliar</label><select class="field" id="pair-skill">${game.skills.map(code=>`<option value="${attr(code)}" ${code===currentSkill?'selected':''}>${escapeHtml(code)} · ${escapeHtml(skillByCode(code).name)}</option>`).join('')}</select><p class="skill-filter-detail selected">${escapeHtml(skillByCode(currentSkill).code)} · ${escapeHtml(skillByCode(currentSkill).description)}</p><p class="rating">★ ${stats.average.toFixed(1).replace('.',',')} <span>média · ${stats.count} votos para este par jogo–habilidade</span></p><form id="teacher-opinion-form" data-game="${attr(game.id)}"><fieldset style="border:0;padding:0"><legend class="field-label">Sua nota de adequação (1 a 5)</legend><div class="rating-select">${[5,4,3,2,1].map(n=>`<input id="teacher-rating-${n}" name="rating" type="radio" value="${n}" required><label for="teacher-rating-${n}" title="${n} de 5">★</label>`).join('')}</div></fieldset><label class="field-label" for="teacher-comment">Comentário público sobre este par</label><textarea class="field" id="teacher-comment" name="comment" maxlength="700" placeholder="Compartilhe uma observação de uso para outros professores…"></textarea><button class="btn" type="submit">Publicar avaliação docente</button></form><hr class="section-divider"><h3>Experiências de outros professores</h3><div class="comment-list">${pairComments.length?pairComments.map(comment=>`<article class="comment-item"><div class="comment-meta"><strong>${escapeHtml(comment.teacher)}</strong><span>${shortDate(comment.date)}</span></div><p>${escapeHtml(comment.text)}</p></article>`).join(''):'<p class="text-small">Ainda não há comentários docentes para este par.</p>'}</div><div style="margin-top:14px"><a class="btn secondary small" href="#/teacher/catalog">← Voltar ao catálogo</a></div></div>`;
  teacherShell('catalog','Ficha do jogo',content);
}
function teacherSuggest() {
  const own = data.suggestions.filter(item => item.author === (activeName || 'Educador(a)'));
  const content = `<div class="form-card"><h2>Sugerir um jogo para o acervo</h2><p class="text-small">As sugestões ficam pendentes até revisão da curadoria. Informe apenas dados que possam ser compartilhados com a equipe.</p><form id="suggest-form"><div class="form-grid"><div><label class="field-label" for="s-title">Nome do jogo</label><input class="field" id="s-title" name="title" required maxlength="100"></div><div><label class="field-label" for="s-url">Link de acesso (se conhecido)</label><input class="field" id="s-url" name="url" type="url" placeholder="https://"></div><div class="span-2"><label class="field-label" for="s-description">Descrição</label><textarea class="field" id="s-description" name="description" required maxlength="500"></textarea></div><div><label class="field-label" for="s-source">Código-fonte / licença (referência)</label><input class="field" id="s-source" name="source" type="url" placeholder="https://"></div><div class="span-2"><span class="field-label">Habilidades ou objetivos possivelmente relacionados</span><div class="skill-picker-groups">${skillCheckboxGroups()}</div></div></div><div class="notice">A equipe de curadoria validará se o jogo é gratuito, funciona no navegador e tem código-fonte aberto antes de aprová-lo.</div><button class="btn" type="submit">Enviar para avaliação</button></form></div><div class="form-card" style="margin-top:14px"><h2>Minhas sugestões</h2><div class="suggestion-list">${own.length?own.map(renderSuggestionSummary).join(''):'<p class="text-small">Você ainda não enviou sugestões nesta sessão.</p>'}</div></div>`;
  teacherShell('suggest','Compartilhe um jogo',content);
}
function renderSuggestionSummary(item) { return `<article class="suggestion-item"><div class="comment-meta"><strong>${escapeHtml(item.title)}</strong><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></div><p class="text-small">${escapeHtml(item.description)}</p>${item.reason?`<p class="text-small"><strong>Justificativa:</strong> ${escapeHtml(item.reason)}</p>`:''}</article>`; }
function teacherFeedback() {
  const content = `<div class="notice">Feedbacks textuais de estudantes são anônimos e privados. Esta área só aparece após entrar no perfil docente de demonstração.</div><div class="feedback-list">${data.feedback.length?data.feedback.slice().reverse().map(item=>`<article class="feedback-item"><div class="feedback-meta"><strong>${escapeHtml(gameById(item.gameId)?.title||'Jogo removido')}</strong><span>${shortDate(item.date)} · sem identificação discente</span></div><div class="rating">${'★'.repeat(Number(item.rating))}${'☆'.repeat(5-Number(item.rating))}</div>${item.comment?`<p>${escapeHtml(item.comment)}</p>`:'<p class="text-small">Sem comentário textual.</p>'}</article>`).join(''):'<div class="empty-state"><h3>Ainda não há opiniões de estudantes</h3><p>As respostas abertas aparecerão aqui, sem nome ou identificação.</p></div>'}</div>`;
  teacherShell('feedback','Opiniões anônimas dos alunos',content);
}
function curatorCatalog() {
  const rows = data.games.map(game=>`<tr><td><strong>${escapeHtml(game.title)}</strong><div class="text-small">${escapeHtml(game.description)}</div></td><td>${game.skills.map(code=>`<span class="skill-pill">${escapeHtml(code)}</span>`).join(' ')}</td><td>${escapeHtml(game.axis||'—')} · ${escapeHtml(game.type||'—')}</td><td><span class="status ${game.verified ? 'approved' : 'pending'}">${game.verified ? 'Validado' : 'A validar'}</span></td><td><div class="action-row"><button class="btn secondary small" data-action="edit-game" data-id="${attr(game.id)}">Editar</button><button class="btn danger small" data-action="delete-game" data-id="${attr(game.id)}">Excluir</button></div></td></tr>`).join('');
  const content = `<div class="filter-row"><span class="text-small">${data.games.length} registros no catálogo demonstrativo</span><button class="btn" data-action="new-game">＋ Cadastrar jogo</button></div><div class="table-card"><div class="table-scroll"><table><thead><tr><th>Jogo</th><th>Habilidades associadas</th><th>Classificação</th><th>Validação</th><th>Ações</th></tr></thead><tbody>${rows||'<tr><td colspan="5">Nenhum jogo cadastrado.</td></tr>'}</tbody></table></div></div><div class="form-card" style="margin-top:15px"><h2>Critérios antes da publicação</h2><div class="check-grid"><span class="check-option">□ Gratuito</span><span class="check-option">□ Acessível via navegador</span><span class="check-option">□ Código-fonte aberto</span></div><p class="text-small">Confirme as três condições antes de apresentar qualquer registro como publicado.</p></div>`;
  curatorShell('catalog','Jogos e catálogo',content);
}
function gameForm(game = null, suggestion = null) {
  const source = game || (suggestion ? { ...suggestion, id: '', image: '', concepts: [], skills: suggestion.skills || [], axis: 'Mundo Digital', type: 'Desafio', transversal: '', requirements: '', audience: 'Ensino Médio', justification: '', before: '', during: '', after: '', assessment: '', limitations: '' } : null);
  const value = key => source ? attr(source[key] || '') : '';
  const checkedSkill = code => source?.skills?.includes(code) ? 'checked' : '';
  const checkedValidation = key => source?.validation?.[key] ? 'checked' : '';
  const title = source ? 'Editar ficha do jogo' : 'Cadastrar jogo';
  const content = `<div class="form-card"><div class="notice">Campos organizados para cadastro. Títulos e licenças do conjunto inicial são registros de exemplo: valide condições reais antes de publicar.</div><form id="game-form" data-id="${value('id')}" data-suggestion="${suggestion?attr(suggestion.id):''}"><div class="form-grid"><div><label class="field-label" for="g-title">Nome do jogo</label><input class="field" id="g-title" name="title" value="${value('title')}" required maxlength="100"></div><div><label class="field-label" for="g-audience">Público recomendado</label><input class="field" id="g-audience" name="audience" value="${value('audience')}" placeholder="Ensino Médio"></div><div class="span-2"><label class="field-label" for="g-description">Descrição</label><textarea class="field" id="g-description" name="description" required maxlength="800">${value('description')}</textarea></div><div><label class="field-label" for="g-url">Link de acesso</label><input class="field" id="g-url" name="url" type="url" value="${value('url')}" placeholder="https://"></div><div><label class="field-label" for="g-source">Link/referência ao código-fonte aberto</label><input class="field" id="g-source" name="source" type="url" value="${value('source')}" placeholder="https://"></div><div class="span-2"><span class="field-label">Habilidades ou objetivos associados (pares jogo–habilidade)</span><p class="text-small">Abra a etapa e o ano/grupo para escolher um ou mais vínculos.</p><div class="skill-picker-groups">${skillCheckboxGroups(source?.skills||[])}</div></div><div class="span-2"><span class="field-label">Critérios de publicação (confirmar os três antes de publicar)</span><div class="check-grid"><label class="check-option"><input name="validateFree" type="checkbox" ${checkedValidation('free')}>Gratuito</label><label class="check-option"><input name="validateBrowser" type="checkbox" ${checkedValidation('browser')}>Acessível pelo navegador</label><label class="check-option"><input name="validateOpenSource" type="checkbox" ${checkedValidation('openSource')}>Código-fonte aberto</label></div></div><div><label class="field-label" for="g-concepts">Conceitos (separados por vírgula)</label><input class="field" id="g-concepts" name="concepts" value="${value('concepts') || attr((source?.concepts||[]).join(', '))}"></div><div><label class="field-label" for="g-transversal">Sugestão de relação transversal</label><input class="field" id="g-transversal" name="transversal" value="${value('transversal')}"></div><div><label class="field-label" for="g-axis">Eixo estruturante</label><input class="field" id="g-axis" name="axis" value="${value('axis')}" placeholder="Mundo Digital"></div><div><label class="field-label" for="g-type">Tipo de jogo</label><input class="field" id="g-type" name="type" value="${value('type')}" placeholder="Desafio"></div><div class="span-2"><label class="field-label" for="g-requirements">Requisitos técnicos mínimos</label><input class="field" id="g-requirements" name="requirements" value="${value('requirements')}"></div><div class="span-2"><label class="field-label" for="g-justification">Justificativa de alinhamento curricular</label><textarea class="field" id="g-justification" name="justification">${value('justification')}</textarea></div><div><label class="field-label" for="g-before">Orientações — antes da atividade</label><textarea class="field" id="g-before" name="before">${value('before')}</textarea></div><div><label class="field-label" for="g-during">Orientações — durante</label><textarea class="field" id="g-during" name="during">${value('during')}</textarea></div><div><label class="field-label" for="g-after">Orientações — depois</label><textarea class="field" id="g-after" name="after">${value('after')}</textarea></div><div><label class="field-label" for="g-assessment">Sugestões de avaliação sob responsabilidade do professor</label><textarea class="field" id="g-assessment" name="assessment">${value('assessment')}</textarea></div><div class="span-2"><label class="field-label" for="g-limitations">Limitações e condições de uso / adaptação a poucos recursos</label><textarea class="field" id="g-limitations" name="limitations">${value('limitations')}</textarea></div></div><div class="form-actions"><a class="btn secondary" href="#/curator/catalog">Cancelar</a><button class="btn" type="submit">Salvar ficha</button></div></form></div>`;
  curatorShell('catalog',title,content);
}
function curatorSuggestions() {
  const list = data.suggestions.slice().reverse();
  const html = list.length ? list.map(item=>`<article class="suggestion-item"><div class="comment-meta"><div><strong>${escapeHtml(item.title)}</strong><div class="text-small">Enviada por ${escapeHtml(item.author)} · ${shortDate(item.date)}</div></div><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></div><p class="text-small">${escapeHtml(item.description)}</p><p class="text-small">Acesso: ${item.url?`<a href="${attr(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.url)}</a>`:'não informado'} · Código-fonte: ${item.source?`<a href="${attr(item.source)}" target="_blank" rel="noopener">referência</a>`:'não informado'}</p><div class="tag-list">${(item.skills||[]).map(code=>`<span class="skill-pill">${escapeHtml(code)}</span>`).join('')||'<span class="text-small">Nenhuma habilidade indicada</span>'}</div>${item.reason?`<div class="notice danger-note"><strong>Justificativa da recusa:</strong> ${escapeHtml(item.reason)}</div>`:''}${item.status==='Pendente'?`<div class="check-grid" style="margin-top:12px"><label class="check-option"><input type="checkbox" name="approvalCheck">Gratuito</label><label class="check-option"><input type="checkbox" name="approvalCheck">Acessível via navegador</label><label class="check-option"><input type="checkbox" name="approvalCheck">Código-fonte aberto</label></div><div class="action-row" style="margin-top:12px"><button class="btn small" data-action="approve-suggestion" data-id="${attr(item.id)}">Aprovar</button><button class="btn secondary small" data-action="adjust-suggestion" data-id="${attr(item.id)}">Ajustar antes de publicar</button><button class="btn danger small" data-action="reject-suggestion" data-id="${attr(item.id)}">Recusar</button></div>`:''}${rejectingSuggestionId===item.id?`<form class="reject-form" data-id="${attr(item.id)}"><label class="field-label" for="reject-reason">Justificativa obrigatória</label><textarea class="field" id="reject-reason" name="reason" required maxlength="500"></textarea><div class="form-actions"><button class="btn secondary small" type="button" data-action="cancel-reject">Cancelar</button><button class="btn danger small" type="submit">Confirmar recusa</button></div></form>`:''}</article>`).join('') : '<div class="empty-state"><h3>Fila vazia</h3><p>As novas sugestões enviadas por professores aparecerão aqui.</p></div>';
  curatorShell('suggestions','Fila de sugestões',`<p class="text-small">Aprovações convertem a sugestão em um registro do catálogo; ajustes permitem revisar a ficha antes da inclusão. Recusas exigem justificativa.</p><div class="suggestion-list">${html}</div><hr class="section-divider"><h2>Histórico de status</h2><div class="table-card"><div class="table-scroll"><table><thead><tr><th>Jogo sugerido</th><th>Autor</th><th>Status</th><th>Justificativa / observação</th></tr></thead><tbody>${list.map(item=>`<tr><td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.author)}</td><td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td><td>${escapeHtml(item.reason||item.note||'—')}</td></tr>`).join('')||'<tr><td colspan="4">Nenhuma sugestão no histórico.</td></tr>'}</tbody></table></div></div>`);
}
function curatorSkills() {
  const stageGroups = [...STAGES, ...new Set(data.skills.map(skill => skill.stage).filter(stage => !STAGES.includes(stage)))].map(stage => {
    const items = data.skills.filter(skill => skill.stage === stage);
    if (!items.length) return '';
    const groups = [...new Set(items.map(skill => skill.substage || stage))];
    const count = stage === 'Educação Infantil' ? `${items.length} objetivos` : `${items.length} habilidades`;
    const subgroups = groups.map(group => `<section class="curator-skill-subgroup" aria-labelledby="skills-${attr(stage.replace(/\W/g,'-'))}-${attr(group.replace(/\W/g,'-'))}"><h3 id="skills-${attr(stage.replace(/\W/g,'-'))}-${attr(group.replace(/\W/g,'-'))}">${escapeHtml(group)} <span>${items.filter(skill => (skill.substage || stage) === group).length}</span></h3><div class="curator-skill-grid">${items.filter(skill => (skill.substage || stage) === group).map(skill => `<article class="curator-skill-card"><div class="skill-card-meta"><span class="skill-pill">${escapeHtml(skill.code)}</span><span class="text-small">${skill.official ? 'BNCC oficial' : 'Registro local'}</span></div><h4>${escapeHtml(skill.name || '')}</h4><p>${escapeHtml(skill.description)}</p>${skill.official ? '<span class="read-only-note">Texto normativo · somente leitura</span>' : `<button class="btn secondary small" data-action="edit-skill" data-id="${attr(skill.code)}">Editar registro</button>`}</article>`).join('')}</div></section>`).join('');
    return `<details class="curator-stage-group"><summary><strong>${escapeHtml(stage)}</strong><span>${count}</span></summary><div class="curator-stage-content">${subgroups}</div></details>`;
  }).join('');
  const stageOptions = STAGES.map(stage => `<option value="${attr(stage)}">${escapeHtml(stage)}</option>`).join('');
  const content = `<div class="form-card"><h2 id="skill-form-title">Cadastrar habilidade local</h2><p class="text-small">A base BNCC oficial é carregada integralmente. Registros locais têm etapa e grupo/ano próprios.</p><form id="skill-form"><input type="hidden" name="originalCode"><div class="form-grid"><div><label class="field-label" for="skill-code">Código BNCC ou identificador local</label><input class="field" id="skill-code" name="code" placeholder="EM13CO27" required pattern="[A-Za-z0-9]+" maxlength="20"></div><div><label class="field-label" for="skill-name">Rótulo curto</label><input class="field" id="skill-name" name="name" required maxlength="120"></div><div><label class="field-label" for="skill-stage">Etapa</label><select class="field" id="skill-stage" name="stage" required>${stageOptions}</select></div><div><label class="field-label" for="skill-substage">Grupo/ano</label><input class="field" id="skill-substage" name="substage" required maxlength="80" placeholder="Ex.: 1º ano, EM13 ou grupo local"></div><div class="span-2"><label class="field-label" for="skill-description">Redação da habilidade/objetivo</label><textarea class="field" id="skill-description" name="description" required maxlength="1200"></textarea></div></div><div class="form-actions"><button class="btn secondary" type="reset">Limpar</button><button class="btn" type="submit">Salvar habilidade</button></div></form></div><div class="curator-skills-list" aria-label="Inventário de habilidades agrupado por etapa">${stageGroups}</div>`;
  curatorShell('skills','Habilidades BNCC',content);
}
function curatorReports() {
  const ratingCount = data.votes.length; const feedbackAvg = data.feedback.length ? data.feedback.reduce((sum,item)=>sum+Number(item.rating),0)/data.feedback.length : 0;
  const content = `<div class="stats-grid"><article class="stat-card"><span class="stat-value">${data.games.length}</span><span class="stat-label">Jogos no catálogo</span></article><article class="stat-card"><span class="stat-value">${data.suggestions.filter(s=>s.status==='Pendente').length}</span><span class="stat-label">Sugestões pendentes</span></article><article class="stat-card"><span class="stat-value">${ratingCount}</span><span class="stat-label">Votos docentes registrados</span></article><article class="stat-card"><span class="stat-value">${data.feedback.length}</span><span class="stat-label">Opiniões anônimas de alunos</span></article></div><div class="form-card"><h2>Votos docentes por jogo–habilidade</h2><div class="table-card"><div class="table-scroll"><table><thead><tr><th>Jogo</th><th>Habilidade</th><th>Média</th><th>Votos</th></tr></thead><tbody>${data.games.flatMap(game=>game.skills.map(code=>{const stats=averageVotes(game.id,code);return `<tr><td>${escapeHtml(game.title)}</td><td>${escapeHtml(code)} · ${escapeHtml(skillByCode(code).name)}</td><td>★ ${stats.average.toFixed(1).replace('.',',')}</td><td>${stats.count}</td></tr>`})).join('')}</tbody></table></div></div></div><div class="form-card" style="margin-top:14px"><h2>Feedback discente anônimo</h2><p class="text-small">Média das experiências registradas: ${feedbackAvg?feedbackAvg.toFixed(1).replace('.',','):'—'} / 5. As respostas abertas permanecem sem identificação explícita.</p><div class="feedback-list">${data.feedback.length?data.feedback.slice().reverse().map(item=>`<article class="feedback-item"><div class="feedback-meta"><strong>${escapeHtml(gameById(item.gameId)?.title||'Jogo removido')}</strong><span>${shortDate(item.date)} · anônimo</span></div><div class="rating">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div><p>${escapeHtml(item.comment||'Sem comentário textual.')}</p></article>`).join(''):'<p class="text-small">Nenhum feedback discente recebido.</p>'}</div></div><div class="notice">Relatórios e dados salvos neste navegador são demonstrativos. A implementação acadêmica não inclui avaliação automatizada da aprendizagem.</div>`;
  curatorShell('reports','Relatórios de uso e avaliação',content);
}
function routeParts() { return decodeURIComponent((location.hash || '#/').slice(2)).split('?')[0].split('/').filter(Boolean); }
function render() {
  setHeader(); const parts = routeParts(); const first = parts[0] || '';
  if (first === 'login') { renderLogin(parts[1] === 'curator' ? 'curator' : 'teacher'); return; }
  if (first === 'play') { renderPlay(parts[1]); return; }
  if (first === 'teacher') {
    if (activeRole !== 'teacher') { navTo('#/login/teacher'); return; }
    if (parts[1] === 'game') { teacherGame(parts[2]); return; }
    if (parts[1] === 'suggest') { teacherSuggest(); return; }
    if (parts[1] === 'feedback') { teacherFeedback(); return; }
    teacherCatalog(); return;
  }
  if (first === 'curator') {
    if (activeRole !== 'curator') { navTo('#/login/curator'); return; }
    if (parts[1] === 'suggestions') { curatorSuggestions(); return; }
    if (parts[1] === 'skills') { curatorSkills(); return; }
    if (parts[1] === 'reports') { curatorReports(); return; }
    if (parts[1] === 'game' && parts[2] === 'new') { gameForm(); return; }
    if (parts[1] === 'game' && parts[2]) { gameForm(gameById(parts[2]) || null); return; }
    curatorCatalog(); return;
  }
  renderStudentCatalog();
}
function applyFilterFromElement(target) {
  if (!target) return;
  if (target.id === 'filter-search') filterState.search = target.value;
  if (target.id === 'filter-stage') { filterState.stage = target.value; filterState.skill = ''; }
  if (target.id === 'filter-skill') filterState.skill = target.value;
  if (target.id === 'filter-concept') filterState.concept = target.value;
  if (target.id === 'filter-axis') filterState.axis = target.value;
  if (target.id === 'filter-type') filterState.type = target.value;
  if (target.id === 'filter-sort') filterState.sort = target.value;
  const route = routeParts()[0];
  if (!route || route === 'teacher') {
    if (route === 'teacher') teacherCatalog(); else renderStudentCatalog();
    const next = document.getElementById(target.id);
    if (next && typeof next.focus === 'function') next.focus({preventScroll:true});
  }
}
function resetFilters() { filterState = { search: '', stage: '', skill: '', concept: '', axis: '', type: '', sort: 'rating' }; render(); }
function selectedValues(form, name) { return [...form.querySelectorAll(`[name="${name}"]:checked`)].map(node=>node.value); }
function safeUrl(url) { if (!url) return ''; try { const parsed = new URL(url); return ['http:','https:'].includes(parsed.protocol) ? parsed.href : ''; } catch { return ''; } }
function formObject(form) { return Object.fromEntries(new FormData(form).entries()); }
function updateGameFromForm(form) {
  const values = formObject(form); const selectedSkills = selectedValues(form,'skills');
  if (!selectedSkills.length) { toast('Associe o jogo a pelo menos uma habilidade.', true); return; }
  const concepts = String(values.concepts||'').split(',').map(item=>item.trim()).filter(Boolean);
  const id = form.dataset.id || makeId('jogo');
  const old = gameById(id) || {};
  const validation = { free: form.elements.validateFree.checked, browser: form.elements.validateBrowser.checked, openSource: form.elements.validateOpenSource.checked };
  const verified = validation.free && validation.browser && validation.openSource;
  if (validation.browser && !safeUrl(values.url)) { toast('Informe um link de acesso seguro antes de confirmar o acesso pelo navegador.', true); return; }
  if (validation.openSource && !safeUrl(values.source)) { toast('Informe uma referência válida ao código-fonte aberto antes de confirmar este critério.', true); return; }
  const game = { ...old, id, title: values.title.trim(), description: values.description.trim(), url: safeUrl(values.url), source: safeUrl(values.source), validation, verified, skills: selectedSkills, concepts, transversal: values.transversal.trim(), axis: values.axis.trim(), type: values.type.trim(), requirements: values.requirements.trim(), audience: values.audience.trim(), justification: values.justification.trim(), before: values.before.trim(), during: values.during.trim(), after: values.after.trim(), assessment: values.assessment.trim(), limitations: values.limitations.trim(), createdAt: old.createdAt || new Date().toISOString(), image: old.image || '', rating: old.rating || 0, ratingCount: old.ratingCount || 0 };
  if (old.id) data.games[data.games.findIndex(item=>item.id===id)] = game; else data.games.push(game);
  const suggestionId = form.dataset.suggestion;
  if (suggestionId) { const suggestion=data.suggestions.find(item=>item.id===suggestionId); if(suggestion){suggestion.status='Ajustada';suggestion.note='Informações ajustadas e convertidas em registro do catálogo.';} editingSuggestionId=null; }
  persist(); toast(verified ? 'Ficha salva com os três critérios de publicação confirmados.' : (old.id ? 'Ficha salva; mantenha como pendente de validação.' : 'Jogo salvo como pendente de validação.')); navTo(suggestionId ? '#/curator/suggestions' : '#/curator/catalog');
}
function approveSuggestion(id) {
  const suggestion = data.suggestions.find(item=>item.id===id); if(!suggestion)return;
  if(!safeUrl(suggestion.url)||!safeUrl(suggestion.source)){toast('Revise e confirme links válidos de acesso e código-fonte antes de aprovar.',true);return;}
  const game = { ...suggestion, id: makeId('jogo'), image:'', concepts:[], skills:suggestion.skills||[], axis:'Mundo Digital', type:'Jogo digital', transversal:'', requirements:'Validar antes da publicação', audience:'Ensino Médio', justification:'Alinhamento a validar pela curadoria.', before:'A preencher', during:'A preencher', after:'A preencher', assessment:'Sugestão docente; não automatizada.', limitations:'Condições verificadas pela curadoria após análise da sugestão.', validation:{free:true,browser:true,openSource:true}, verified:true, rating:0, ratingCount:0, createdAt:new Date().toISOString() };
  data.games.push(game); suggestion.status='Aprovada'; suggestion.note='Convertida em registro do catálogo; validar os critérios antes de publicação.'; persist(); render(); toast('Sugestão convertida em jogo. Valide a licença antes de publicar.');
}
function deleteGame(id) {
  const game = gameById(id); if (!game) return;
  if (!window.confirm(`Excluir “${game.title}” do catálogo? Os vínculos pedagógicos deste jogo serão removidos.`)) return;
  data.games = data.games.filter(item=>item.id!==id); data.votes=data.votes.filter(item=>item.gameId!==id); data.comments=data.comments.filter(item=>item.gameId!==id); persist(); render(); toast('Jogo e vínculos removidos do catálogo.');
}
function handleClick(event) {
  const target = event.target.closest('[data-action]'); if (!target) return;
  const action = target.dataset.action;
  if (action === 'logout') { activeRole=null; activeName=''; filterState={search:'',stage:'',skill:'',concept:'',axis:'',type:'',sort:'rating'}; navTo('#/'); }
  if (action === 'clear-filters') resetFilters();
  if (action === 'quick-skill') { filterState.skill=target.dataset.skill; render(); }
  if (action === 'choose-play') { selectedChoice=target.dataset.choice; renderPlay(routeParts()[1]); }
  if (action === 'new-game') navTo('#/curator/game/new');
  if (action === 'edit-game') navTo('#/curator/game/'+encodeURIComponent(target.dataset.id));
  if (action === 'delete-game') deleteGame(target.dataset.id);
  if (action === 'approve-suggestion') { const card=target.closest('.suggestion-item'); const checks=[...card.querySelectorAll('[name="approvalCheck"]')]; if(checks.length!==3||!checks.every(check=>check.checked)){toast('Confirme gratuidade, acesso pelo navegador e código-fonte aberto antes de aprovar.',true);return;} approveSuggestion(target.dataset.id); }
  if (action === 'adjust-suggestion') { editingSuggestionId=target.dataset.id; const suggestion=data.suggestions.find(item=>item.id===editingSuggestionId); gameForm(null,suggestion); }
  if (action === 'reject-suggestion') { rejectingSuggestionId=target.dataset.id; render(); }
  if (action === 'cancel-reject') { rejectingSuggestionId=null; render(); }
  if (action === 'edit-skill') { const skill=data.skills.find(item=>item.code===target.dataset.id); const form=document.getElementById('skill-form'); if(skill&&!skill.official&&form){form.elements.originalCode.value=skill.code;form.elements.code.value=skill.code;form.elements.name.value=skill.name;form.elements.description.value=skill.description;form.elements.stage.value=skill.stage||stageForSkillCode(skill.code);form.elements.substage.value=skill.substage||substageForSkillCode(skill.code);document.getElementById('skill-form-title').textContent='Editar habilidade';form.elements.code.readOnly=true;form.scrollIntoView({behavior:'smooth',block:'center'});} }
}
function handleSubmit(event) {
  const form = event.target;
  if (form.id === 'login-form') {
    event.preventDefault(); const values=formObject(form); if (!values.name.trim() || !values.email || !values.password) return;
    activeRole=form.dataset.role; activeName=values.name.trim(); selectedChoice=null; toast('Sessão demonstrativa iniciada. Credenciais não foram guardadas.'); navTo(activeRole==='teacher'?'#/teacher/catalog':'#/curator/catalog'); return;
  }
  if (form.id === 'student-feedback-form') {
    event.preventDefault(); const rating=Number(form.elements.rating.value); const comment=form.elements.comment.value.trim();
    data.feedback.push({id:makeId('fb'),gameId:form.dataset.game,rating,comment,date:new Date().toISOString()}); persist(); selectedChoice=null; toast('Opinião enviada sem nome ou identificador. Obrigado!'); renderPlay(form.dataset.game); return;
  }
  if (form.id === 'teacher-opinion-form') {
    event.preventDefault(); const rating=Number(form.elements.rating.value); const comment=form.elements.comment.value.trim(); const gameId=form.dataset.game; const skill=document.getElementById('pair-skill').value;
    data.votes.push({id:makeId('voto'),gameId,skill,rating,teacher:activeName||'Professor(a)'}); if(comment)data.comments.push({id:makeId('comentario'),gameId,skill,teacher:activeName||'Professor(a)',text:comment,date:new Date().toISOString()}); persist(); toast('Voto e comentário docente registrados para este par jogo–habilidade.'); teacherGame(gameId); return;
  }
  if (form.id === 'suggest-form') {
    event.preventDefault(); const values=formObject(form); const skills=selectedValues(form,'skills'); data.suggestions.push({id:makeId('sugestao'),title:values.title.trim(),description:values.description.trim(),url:safeUrl(values.url),source:safeUrl(values.source),skills,author:activeName||'Educador(a)',date:new Date().toISOString(),status:'Pendente'}); persist(); toast('Sugestão enviada para a fila de curadoria.'); teacherSuggest(); return;
  }
  if (form.id === 'game-form') { event.preventDefault(); updateGameFromForm(form); return; }
  if (form.id === 'reject-form' || form.classList.contains('reject-form')) {
    event.preventDefault(); const reason=form.elements.reason.value.trim(); if(!reason){toast('A justificativa é obrigatória.',true);return;} const item=data.suggestions.find(value=>value.id===form.dataset.id); if(item){item.status='Recusada';item.reason=reason;item.note='Recusada pela curadoria.';} rejectingSuggestionId=null; persist(); toast('Recusa registrada no histórico com justificativa.'); curatorSuggestions(); return;
  }
  if (form.id === 'skill-form') {
    event.preventDefault(); const values=formObject(form); const code=values.code.trim().toUpperCase(); const original=values.originalCode; if(!STAGES.includes(values.stage)||!values.substage?.trim()){toast('Informe etapa e grupo/ano antes de salvar.',true);return;} const existing=data.skills.find(item=>item.code===code); if(existing&&code!==original){toast('Já existe uma habilidade com este código.',true);return;}
    if(original){const skill=data.skills.find(item=>item.code===original); if(skill?.official){toast('Registros oficiais da BNCC são somente leitura.',true);return;} if(skill){skill.name=values.name.trim();skill.description=values.description.trim();skill.stage=values.stage;skill.substage=values.substage.trim();}}
    else data.skills.push({code,name:values.name.trim(),description:values.description.trim(),stage:values.stage,substage:values.substage.trim(),official:false,source:'Registro local de curadoria'}); persist(); toast('Habilidade salva.'); curatorSkills(); return;
  }
}
function handleInput(event) {
  if (event.target.id !== 'filter-search') return;
  filterState.search = event.target.value;
  const route = routeParts()[0];
  const games = filteredGames();
  const teacher = route === 'teacher';
  const grid = document.getElementById(teacher ? 'teacher-grid' : 'catalog-grid');
  if (grid) {
    const cards = teacher ? games.map(game => `<article class="game-card">${thumb(game)}<h3>${escapeHtml(game.title)}</h3><p class="summary">${escapeHtml(game.description)}</p><div class="tag-list">${game.skills.map(code => `<span class="skill-pill">${escapeHtml(code)}</span>`).join('')}</div><div class="game-card-foot"><span class="rating">★ ${displayRating(game)} <span>· ${totalReviews(game)} opiniões</span></span><a class="btn small" href="#/teacher/game/${encodeURIComponent(game.id)}">Ver ficha docente →</a></div></article>`).join('') : games.map(gameCard).join('');
    grid.innerHTML = cards || catalogEmptyState();
  }
  const count = document.getElementById(teacher ? 'teacher-result-count' : 'student-result-count');
  if (count) count.textContent = `${games.length} ${games.length === 1 ? 'jogo' : 'jogos'}${teacher ? ' no acervo local' : ''}`;
}
function handleChange(event) { if (event.target.id.startsWith('filter-')) applyFilterFromElement(event.target); if(event.target.id==='pair-skill')teacherGame(routeParts()[2]); }
function start() { document.addEventListener('click',handleClick); document.addEventListener('submit',handleSubmit); document.addEventListener('input',handleInput); document.addEventListener('change',handleChange); window.addEventListener('hashchange',()=>{selectedChoice=null;currentFiltersInitialized=false;render();document.getElementById('main')?.focus();}); render(); }
start();
