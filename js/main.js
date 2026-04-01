import '../css/style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="page">
    <header class="toolbar no-print">
      <div class="toolbar__title">Resume Builder</div>
      <div class="toolbar__actions">
        <button class="btn ripple" id="downloadPdfBtn">Скачать PDF</button>
        <button class="btn btn--ghost ripple" id="resetBtn">Сбросить изменения</button>
      </div>
    </header>

    <main class="resume" id="resume">
      <aside class="resume__sidebar">
        <div
          class="avatar editable ripple"
          contenteditable="true"
          data-key="avatar"
          spellcheck="false"
        >EA</div>

        <section class="panel ripple">
          <h2 class="panel__title">Контакты</h2>
          <p class="editable" contenteditable="true" data-key="phone" spellcheck="false">
            +7 (900) 123-45-67
          </p>
          <p class="editable" contenteditable="true" data-key="email" spellcheck="false">
            egor@example.com
          </p>
          <p class="editable" contenteditable="true" data-key="city" spellcheck="false">
            Новосибирск
          </p>
          <p class="editable" contenteditable="true" data-key="github" spellcheck="false">
            github.com/username
          </p>
        </section>

        <section class="panel ripple">
          <h2 class="panel__title">Навыки</h2>
          <ul class="skills">
            <li class="editable" contenteditable="true" data-key="skill1" spellcheck="false">
              HTML5, CSS3, JavaScript
            </li>
            <li class="editable" contenteditable="true" data-key="skill2" spellcheck="false">
              Адаптивная вёрстка
            </li>
            <li class="editable" contenteditable="true" data-key="skill3" spellcheck="false">
              DOM, localStorage, события
            </li>
            <li class="editable" contenteditable="true" data-key="skill4" spellcheck="false">
              Git, GitHub, GitHub Pages
            </li>
          </ul>
        </section>

        <section class="panel ripple">
          <h2 class="panel__title">Языки</h2>
          <p class="editable" contenteditable="true" data-key="lang1" spellcheck="false">
            Русский — родной
          </p>
          <p class="editable" contenteditable="true" data-key="lang2" spellcheck="false">
            Английский — A2/B1
          </p>
        </section>
      </aside>

      <section class="resume__content">
        <section class="hero panel ripple">
          <h1 class="editable" contenteditable="true" data-key="fullName" spellcheck="false">
            Егор Артёменко
          </h1>
          <p class="hero__role editable" contenteditable="true" data-key="role" spellcheck="false">
            Junior Frontend Developer
          </p>
          <p class="hero__summary editable" contenteditable="true" data-key="summary" spellcheck="false">
            Начинающий веб-разработчик, изучающий HTML, CSS и JavaScript. Интересуюсь
            созданием интерактивных интерфейсов, адаптивной вёрсткой и разработкой
            удобных пользовательских страниц.
          </p>
        </section>

        <section class="panel ripple">
          <h2 class="panel__title">О себе</h2>
          <p class="editable" contenteditable="true" data-key="about" spellcheck="false">
            Умею создавать статические и интерактивные веб-страницы, работать с DOM,
            реализовывать редактирование контента и сохранять данные в браузере.
          </p>
        </section>

        <section class="panel ripple">
          <h2 class="panel__title">Проекты</h2>

          <article class="entry">
            <div class="entry__header">
              <h3 class="editable" contenteditable="true" data-key="project1Title" spellcheck="false">
                Интерактивное резюме
              </h3>
              <span class="editable" contenteditable="true" data-key="project1Date" spellcheck="false">
                2026
              </span>
            </div>
            <p class="editable" contenteditable="true" data-key="project1Text" spellcheck="false">
              Разработал страницу резюме с редактируемыми блоками, сохранением данных,
              экспортом в PDF и эффектом Material Wave.
            </p>
          </article>

          <article class="entry">
            <div class="entry__header">
              <h3 class="editable" contenteditable="true" data-key="project2Title" spellcheck="false">
                Сайт с API персонажей
              </h3>
              <span class="editable" contenteditable="true" data-key="project2Date" spellcheck="false">
                2026
              </span>
            </div>
            <p class="editable" contenteditable="true" data-key="project2Text" spellcheck="false">
              Реализовал загрузку данных с внешнего API, карточки, модальные окна и
              публикацию проекта на хостинге.
            </p>
          </article>
        </section>

        <section class="panel ripple">
          <h2 class="panel__title">Образование</h2>
          <p class="editable" contenteditable="true" data-key="education" spellcheck="false">
            Студент технического университета, направление, связанное с информационными
            технологиями и разработкой программного обеспечения.
          </p>
        </section>
      </section>
    </main>
  </div>
`;

const STORAGE_PREFIX = 'resume:';
const editableElements = document.querySelectorAll('[contenteditable="true"]');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const resetBtn = document.getElementById('resetBtn');

editableElements.forEach((element) => {
  element.dataset.defaultValue = element.innerText.trim();
});

function getStorageKey(element) {
  return `${STORAGE_PREFIX}${element.dataset.key}`;
}

function saveElement(element) {
  localStorage.setItem(getStorageKey(element), element.innerText.trim());
}

function loadState() {
  editableElements.forEach((element) => {
    const saved = localStorage.getItem(getStorageKey(element));
    if (saved !== null) {
      element.innerText = saved;
    }
  });
  syncTitle();
}

function markUpdated(element) {
  element.classList.remove('updated');
  void element.offsetWidth;
  element.classList.add('updated');
}

function syncTitle() {
  const fullName = document.querySelector('[data-key="fullName"]');
  const role = document.querySelector('[data-key="role"]');
  document.title = `${fullName.innerText.trim()} — ${role.innerText.trim()}`;
}

function attachEditableHandlers() {
  editableElements.forEach((element) => {
    element.addEventListener('input', () => {
      saveElement(element);
      markUpdated(element);
      syncTitle();
    });

    element.addEventListener('blur', () => {
      saveElement(element);
      syncTitle();
    });
  });
}

function createRipple(event, container) {
  const circle = document.createElement('span');
  const rect = container.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  circle.className = 'ripple-circle';
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  container.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

function attachRipple() {
  document.querySelectorAll('.ripple').forEach((element) => {
    element.addEventListener('click', (event) => {
      createRipple(event, element);
    });
  });
}

function downloadPdf() {
  window.print();
}

function resetState() {
  const confirmed = window.confirm('Удалить все сохранённые изменения?');
  if (!confirmed) return;

  editableElements.forEach((element) => {
    localStorage.removeItem(getStorageKey(element));
    element.innerText = element.dataset.defaultValue;
  });

  syncTitle();
}

downloadPdfBtn.addEventListener('click', downloadPdf);
resetBtn.addEventListener('click', resetState);

loadState();
attachEditableHandlers();
attachRipple();