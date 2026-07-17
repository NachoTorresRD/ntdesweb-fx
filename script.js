const state = {
  effects: [],
  category: "All",
  query: ""
};

const elements = {
  grid: document.querySelector("#effects-grid"),
  filters: document.querySelector("#category-filters"),
  search: document.querySelector("#effect-search"),
  status: document.querySelector("#results-status"),
  count: document.querySelector("#effect-count"),
  empty: document.querySelector("#empty-state"),
  error: document.querySelector("#error-state"),
  clear: document.querySelector("#clear-filters"),
  retry: document.querySelector("#retry-load")
};

const preferredCategoryOrder = [
  "Experiences",
  "Text",
  "Buttons",
  "Cards",
  "Navigation",
  "Forms",
  "Animations",
  "Cursor",
  "Effects"
];

function normalize(value) {
  return value
    .toLocaleLowerCase("en")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isSecureUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEffect(effect) {
  return ["name", "category", "description", "demo", "github", "preview", "previewAlt"]
    .every((key) => typeof effect[key] === "string" && effect[key].trim())
    && isSecureUrl(effect.demo)
    && isSecureUrl(effect.github);
}

function makeLink(label, href, className, accessibleLabel) {
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", accessibleLabel);
  link.append(document.createTextNode(label));

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(arrow);
  return link;
}

function createCard(effect, index) {
  const card = document.createElement("article");
  card.className = "effect-card";
  if (effect.category === "Experiences") card.classList.add("effect-card--experience");
  card.setAttribute("role", "listitem");
  card.style.setProperty("--card-delay", `${Math.min(index * 45, 315)}ms`);

  const previewLink = document.createElement("a");
  previewLink.className = "card-preview";
  previewLink.href = effect.demo;
  previewLink.target = "_blank";
  previewLink.rel = "noopener noreferrer";
  previewLink.setAttribute("aria-label", `Open the live demo for ${effect.name}`);

  const image = document.createElement("img");
  image.src = effect.preview;
  image.alt = effect.previewAlt;
  image.width = 720;
  image.height = 440;
  image.loading = index < 3 ? "eager" : "lazy";
  image.decoding = "async";
  previewLink.append(image);

  const previewAction = document.createElement("span");
  previewAction.className = "preview-action";
  previewAction.setAttribute("aria-hidden", "true");
  previewAction.textContent = "Open demo ↗";
  previewLink.append(previewAction);

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const category = document.createElement("span");
  category.className = "category-tag";
  category.textContent = effect.category;

  const number = document.createElement("span");
  number.className = "card-number";
  number.textContent = String(index + 1).padStart(2, "0");
  meta.append(category, number);

  const title = document.createElement("h3");
  title.textContent = effect.name;

  const description = document.createElement("p");
  description.textContent = effect.description;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(
    makeLink("Live demo", effect.demo, "card-link card-link-primary", `Open the live demo for ${effect.name}`),
    makeLink("GitHub", effect.github, "card-link", `Open the GitHub repository for ${effect.name}`)
  );

  body.append(meta, title, description, actions);
  card.append(previewLink, body);
  return card;
}

function getFilteredEffects() {
  const query = normalize(state.query.trim());
  return state.effects.filter((effect) => {
    const matchesCategory = state.category === "All" || effect.category === state.category;
    const searchable = normalize(`${effect.name} ${effect.category} ${effect.description}`);
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function renderEffects() {
  const effects = getFilteredEffects();
  elements.grid.replaceChildren(...effects.map(createCard));
  elements.grid.setAttribute("aria-busy", "false");
  elements.empty.hidden = effects.length > 0;

  const noun = effects.length === 1 ? "project" : "projects";
  elements.status.textContent = `${effects.length} ${noun}`;
}

function renderFilters() {
  const categoryRank = (category) => {
    const index = preferredCategoryOrder.indexOf(category);
    return index === -1 ? preferredCategoryOrder.length : index;
  };
  const categories = [...new Set(state.effects.map((effect) => effect.category))]
    .sort((a, b) => categoryRank(a) - categoryRank(b) || a.localeCompare(b));

  const buttons = ["All", ...categories].map((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.textContent = category;
    button.dataset.category = category;
    button.setAttribute("aria-pressed", String(category === state.category));
    button.addEventListener("click", () => {
      state.category = category;
      elements.filters.querySelectorAll("button").forEach((item) => {
        item.setAttribute("aria-pressed", String(item.dataset.category === category));
      });
      renderEffects();
    });
    return button;
  });

  elements.filters.replaceChildren(...buttons);
}

function resetFilters() {
  state.category = "All";
  state.query = "";
  elements.search.value = "";
  renderFilters();
  renderEffects();
  elements.search.focus();
}

async function loadEffects() {
  elements.error.hidden = true;
  elements.empty.hidden = true;
  elements.grid.setAttribute("aria-busy", "true");
  elements.status.textContent = "Loading the collection…";

  try {
    const response = await fetch("effects.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const effects = await response.json();
    if (!Array.isArray(effects) || effects.length === 0 || !effects.every(isValidEffect)) {
      throw new Error("Invalid effects.json structure");
    }

    state.effects = effects;
    elements.count.textContent = String(effects.length).padStart(2, "0");
    renderFilters();
    renderEffects();
  } catch (error) {
    console.error("NTDESWEB FX catalog error:", error);
    elements.grid.replaceChildren();
    elements.grid.setAttribute("aria-busy", "false");
    elements.status.textContent = "Catalog unavailable";
    elements.error.hidden = false;
  }
}

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderEffects();
});

elements.clear.addEventListener("click", resetFilters);
elements.retry.addEventListener("click", loadEffects);

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    elements.search.focus();
  }
  if (event.key === "Escape" && document.activeElement === elements.search && elements.search.value) {
    resetFilters();
  }
});

loadEffects();
