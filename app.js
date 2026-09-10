/**
 * MIDIS JARVIS AI PROMPT ENGINE
 * Pure Vanilla JavaScript ES6+
 * Author: Melnikov Semen
 * Brand: International Institute of Design and Service (MIDIS)
 */

// ==========================================
// 1. DATASETS & SCENARIOS
// ==========================================

const MIDIS_DB = {
  // 10 Use Cases grouped by categories
  scenarios: [
    {
      id: 'iot-roadmap',
      category: 'study',
      icon: '🧭',
      badge: 'МЕТОДИКА МИДиС',
      title: 'Индивидуальный трек обучения (ИОТ)',
      desc: 'Пошаговый роадмап прокачки навыков по семестрам с учетом проектов МИДиС и баланса жизни.',
      systemRole: 'Ты — опытный карьерный наставник и коуч по личностному развитию, эксперт по методике индивидуальных образовательных траекторий (ИОТ) МИДиС.',
      goalSummary: 'Составить глубокий ориентировочный индивидуальный план развития на весь оставшийся срок обучения по годам (профессиональные навыки, софт-скиллы, проверка профессии, первые шаги на месяц).',
      taskLabel: 'Твои сомнения, приоритеты или фокус на ближайший семестр:'
    },
    {
      id: 'portfolio-pet-projects',
      category: 'creation',
      icon: '✨',
      badge: 'ХИТ ДЛЯ BEHANCE',
      title: 'Идеи для пет-проектов и портфолио',
      desc: 'Поиск нестандартных концепций на стыке твоей специальности и хобби с Wow-эффектом.',
      systemRole: 'Ты — креативный директор и лид продуктовой разработки с опытом отбора сильных джуниор-портфолио, мастер генерации свежих гипотез.',
      goalSummary: 'Сгенерировать 3–4 проработанные концепции пет-проектов с четким описанием проблемы, ЦА, стека инструментов и wow-эффекта для работодателей.',
      taskLabel: 'Какую тему, проблему или хобби хочется развить в проекте?'
    },
    {
      id: 'exam-defense-prep',
      category: 'study',
      icon: '🛡️',
      badge: 'АНТИСТРЕСС',
      title: 'Подготовка к защите и сессии',
      desc: 'Разбор сложной темы методом Фейнмана + 8-10 каверзных вопросов экзаменационной комиссии.',
      systemRole: 'Ты — академический наставник и строгий, но справедливый член государственной экзаменационной комиссии (ГЭК) МИДиС.',
      goalSummary: 'Разложить сложную тему или курсовой проект на понятные тезисы и подготовить чек-лист уверенных ответов на каверзные вопросы защиты.',
      taskLabel: 'Тема проекта, дисциплина или сложный вопрос к защите:'
    },
    {
      id: 'case-presentation',
      category: 'creation',
      icon: '📐',
      badge: 'BEHANCE & GITHUB',
      title: 'Оформление кейса и презентации',
      desc: 'Покадровый сторителлинг: от исследований до визуала, бизнес-метрик и выводов автора.',
      systemRole: 'Ты — арт-директор и специалист по сторителлингу продуктовых и дизайнерских кейсов для топовых студий и платформ (Behance, Dprofile, GitHub).',
      goalSummary: 'Сформировать сценарий оформления кейса: структура экранов, акценты на трудностях и их преодолении, формулировка результатов.',
      taskLabel: 'О каком проекте пишем кейс и для какой площадки?'
    },
    {
      id: 'internship-cover-letter',
      category: 'career',
      icon: '💼',
      badge: 'ТРУДОУСТРОЙСТВО',
      title: 'Поиск стажировок и фриланс-старт',
      desc: 'Составление продающего сопроводительного письма и позиционирования студента без клише.',
      systemRole: 'Ты — IT/Creative HR-директор и карьерный консультант, отбирающий стажеров и джунов в прогрессивные компании.',
      goalSummary: 'Сформулировать яркое позиционирование (Elevator Pitch) и убедительное персонализированное сопроводительное письмо под вакансию или фриланс.',
      taskLabel: 'Желаемая позиция, компания или сфера для фриланса:'
    },
    {
      id: 'troubleshooting-review',
      category: 'study',
      icon: '🔍',
      badge: 'ЭКСПЕРТИЗА',
      title: 'Код-ревью и дизайн-критика',
      desc: 'Объективный аудит решения: 3 достоинства, 3-5 критических ошибок и пошаговые исправления.',
      systemRole: 'Ты — Senior-эксперт (Lead Architect & Principal Designer), проводящий детальное и конструктивное код-ревью и дизайн-критику.',
      goalSummary: 'Проанализировать представленный макет или кусок кода, выделить критические ошибки и дать пошаговый план оптимизации.',
      taskLabel: 'Что именно нужно отрецензировать? (опишите макет или логику кода):'
    },
    {
      id: 'time-management-balance',
      category: 'study',
      icon: '⏳',
      badge: 'БЕЗ ВЫГОРАНИЯ',
      title: 'Тайм-менеджмент и баланс жизни',
      desc: 'Недельный спринт совмещения пар в МИДиС, дедлайнов, спорта в бассейне и отдыха.',
      systemRole: 'Ты — ментор по личной эффективности и здоровому тайм-менеджменту для студентов креативных и IT-профессий.',
      goalSummary: 'Разработать сбалансированный недельный спринт без перегрузок с учетом пар, тренировок в бассейне МИДиС и отдыха.',
      taskLabel: 'В чем главная сложность с расписанием и концентрацией?'
    },
    {
      id: 'design-concept-brainstorm',
      category: 'creation',
      icon: '💡',
      badge: 'КРЕАТИВ',
      title: 'Дизайн-концепты и брейншторм',
      desc: '3 контрастных стилистических направления: метафоры, шрифты, цветовые палитры и референсы.',
      systemRole: 'Ты — визионерский концепт-дизайнер и креативный фасилитатор, мастер генерации неожиданных визуальных ассоциаций.',
      goalSummary: 'Предложить 3 принципиально разных концептуальных направления проекта (метафора, палитра, шрифтовая пара, референсы из искусства).',
      taskLabel: 'Тема проекта, продукт или настроение, которое нужно передать:'
    },
    {
      id: 'research-coursework-helper',
      category: 'study',
      icon: '📚',
      badge: 'ГОСТ & НАУКА',
      title: 'Курсовая и дипломная работа',
      desc: 'Формулирование актуальности, объекта, предмета, гипотез и структуры проекта на базе МИДиС.',
      systemRole: 'Ты — научный руководитель и эксперт по академическим исследованиям в сфере дизайна, IT и сервиса.',
      goalSummary: 'Сформулировать академический аппарат исследования (актуальность, объект, предмет, цель, гипотеза) и составить план практической части.',
      taskLabel: 'Предварительная тема курсовой работы или диплома:'
    },
    {
      id: 'interview-simulator',
      category: 'career',
      icon: '🎯',
      badge: 'ИНТЕРАКТИВ',
      title: 'Симулятор собеседования (Mock Interview)',
      desc: 'Режим живого диалога с тимлидом: задает по 1 вопросу, оценивает ответ по 10 баллам и тренирует.',
      systemRole: 'Ты — ведущий тимлид и нанимающий менеджер. Ты проводишь реалистичное интерактивное собеседование на позицию Junior-специалиста.',
      goalSummary: 'Провести интерактивное собеседование в режиме живого диалога (задавать ровно по одному вопросу за раз и давать развивающий фидбек).',
      taskLabel: 'На какую позицию и уровень тренируем собеседование?'
    }
  ],

  // Specializations mapped to level
  specializations: {
    bachelor: [
      { id: 'spec-fde-web', name: '🎨 Веб-дизайн и цифровые продукты (FDE)', defaultStack: ['Figma', 'React', 'HTML/CSS', 'Notion', 'Midjourney'] },
      { id: 'spec-ai-pm', name: '⚡ Управление IT-проектами и искусственный интеллект (FDE)', defaultStack: ['Python', 'Cursor AI', 'ChatGPT', 'Git & GitHub', 'Notion'] },
      { id: 'spec-3d-games', name: '🎮 3D-моделирование и игры', defaultStack: ['Blender', 'Unity', 'Photoshop', 'Unreal Engine'] },
      { id: 'spec-graphic-brand', name: '✒️ Графический дизайн и брендинг', defaultStack: ['Adobe Illustrator', 'Photoshop', 'Figma'] },
      { id: 'spec-web-dev', name: '💻 Разработка веб и мобильных приложений', defaultStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'] },
      { id: 'spec-hotel-rest', name: '🛎️ Ресторанный и гостиничный менеджмент', defaultStack: ['Excel / Таблицы', 'Service Design', 'Notion'] },
      { id: 'spec-business-marketing', name: '📈 Управление бизнесом и интернет-маркетинг', defaultStack: ['Яндекс.Метрика', 'VK Ads', 'Notion', 'Miro'] },
      { id: 'spec-interior', name: '🏛️ Дизайн среды и интерьера', defaultStack: ['AutoCAD', '3ds Max', 'Photoshop', 'Revit'] },
      { id: 'spec-fashion', name: '👗 Дизайн одежды и фэшн-бизнес', defaultStack: ['CLO 3D', 'Adobe Illustrator', 'Photoshop'] },
      { id: 'spec-linguistics', name: '🌐 Международные бизнес-коммуникации (EN/CN)', defaultStack: ['Trados', 'DeepL Pro', 'Notion'] }
    ],
    college: [
      { id: 'col-web-dev', name: '🎨 Веб-дизайн и разработка приложений (Колледж)', defaultStack: ['Figma', 'HTML/CSS', 'JavaScript', 'Tilda'] },
      { id: 'col-3d-gamedev', name: '🎮 3D-моделирование и игровая графика (Колледж)', defaultStack: ['Blender', 'Photoshop', 'Unity'] },
      { id: 'col-graphic', name: '✒️ Графический дизайн (Колледж)', defaultStack: ['Adobe Photoshop', 'Illustrator', 'Figma'] },
      { id: 'col-it-dev', name: '💻 Разработка и администрирование ПО (Колледж)', defaultStack: ['Python', 'C#', 'SQL', 'Git & GitHub'] },
      { id: 'col-tourism', name: '✈️ Туризм и индустрия гостеприимства (Колледж)', defaultStack: ['Excel / Таблицы', 'Системы бронирования'] },
      { id: 'col-trade', name: '📦 Торговое дело и e-commerce (Колледж)', defaultStack: ['Маркетплейсы', 'SMM', 'Excel / Таблицы'] }
    ],
    master: [
      { id: 'mast-creative', name: '👑 Креативное лидерство и арт-дирекшн (Магистратура)', defaultStack: ['Design Systems', 'Notion', 'Miro', 'Agile/Scrum', 'AI-workflow'] },
      { id: 'mast-ai-biz', name: '🧠 Интеллектуальные информационные системы в бизнесе', defaultStack: ['Python', 'ML-pipelines', 'BigData', 'Enterprise Architecture'] }
    ]
  },

  popularStacks: [
    'Figma', 'React', 'HTML/CSS', 'Python', 'Cursor AI', 'ChatGPT', 'Claude',
    'DeepSeek', 'Midjourney', 'Blender', 'Adobe Photoshop', 'Adobe Illustrator',
    'Unity', 'TypeScript', 'Node.js', 'Notion', 'PostgreSQL'
  ],

  popularHobbies: [
    'Видеоигры и геймдев', 'Киберспорт', 'Музыка и саунд-дизайн', 'Фотография и стрит-арт',
    'Уличная мода и кастом', 'Урбанистика', 'Кофе и гастрономия', 'Фитнес и плавание в МИДиС',
    'Психология и коучинг', 'Кинематограф', 'Настольные игры'
  ]
};

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

const state = {
  currentStep: 1,
  totalSteps: 6,
  
  // Selections
  scenarioId: 'iot-roadmap',
  educationLevel: 'bachelor',
  specializationName: 'Веб-дизайн и цифровые продукты (FDE)',
  course: '1',
  skillLevel: 'beginner',
  perceptionFormat: 'structured-lists',
  
  selectedSkills: ['Figma', 'HTML/CSS', 'Notion'],
  selectedHobbies: ['Видеоигры и геймдев', 'Кофе и гастрономия'],
  
  taskInput: '',
  fearsInput: '',
  deadlineInput: '',
  
  resources: {
    partnerProjects: true,
    paidInternships: true,
    oupLeadership: true,
    aiMastery: true,
    newSpecialistWellness: true,
    hackathonsAndEvents: true
  }
};

// ==========================================
// 3. WIZARD STEP CONTROLLER
// ==========================================

function goToStep(targetStep) {
  if (targetStep < 1 || targetStep > state.totalSteps) return;
  state.currentStep = targetStep;

  // Update step panes visibility
  document.querySelectorAll('.wizard-step-pane').forEach((pane, idx) => {
    pane.classList.toggle('active', idx + 1 === targetStep);
  });

  // Update progress bar fill & step navigation items
  const progressPercent = ((targetStep - 1) / (state.totalSteps - 1)) * 100;
  document.getElementById('progress-bar-fill').style.width = `${Math.max(5, progressPercent)}%`;

  document.querySelectorAll('.step-nav-item').forEach(item => {
    const s = parseInt(item.dataset.step, 10);
    item.classList.toggle('active', s === targetStep);
    item.classList.toggle('completed', s < targetStep);
  });

  // Smooth scroll to top of wizard
  window.scrollTo({ top: 70, behavior: 'smooth' });

  // If reaching final step (Step 6), trigger JARVIS Synthesis animation!
  if (targetStep === 6) {
    runJarvisSynthesis();
  }
}

// ==========================================
// 4. RENDERING & UI GENERATION
// ==========================================

// Render Step 1 Scenarios
function renderScenarios(filterCat = 'all') {
  const container = document.getElementById('scenarios-hud-container');
  container.innerHTML = '';

  const list = filterCat === 'all' 
    ? MIDIS_DB.scenarios 
    : MIDIS_DB.scenarios.filter(s => s.category === filterCat);

  list.forEach(sc => {
    const card = document.createElement('div');
    card.className = `scenario-hud-card ${state.scenarioId === sc.id ? 'active' : ''}`;
    card.innerHTML = `
      <div class="sc-top">
        <span class="sc-icon">${sc.icon}</span>
        <span class="sc-badge">${sc.badge}</span>
      </div>
      <h3 class="sc-title">${sc.title}</h3>
      <p class="sc-desc">${sc.desc}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.scenario-hud-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.scenarioId = sc.id;
      document.getElementById('hud-task-label').textContent = sc.taskLabel;
    });

    container.appendChild(card);
  });
}

// Populate Specializations select based on education level
function updateSpecializationsDropdown() {
  const select = document.getElementById('select-spec-hud');
  select.innerHTML = '';

  const specs = MIDIS_DB.specializations[state.educationLevel] || MIDIS_DB.specializations.bachelor;
  specs.forEach(spec => {
    const opt = document.createElement('option');
    opt.value = spec.name;
    opt.textContent = spec.name;
    select.appendChild(opt);
  });

  state.specializationName = specs[0].name;
  select.value = state.specializationName;

  // Auto-sync default stacks
  if (specs[0].defaultStack) {
    specs[0].defaultStack.forEach(s => {
      if (!state.selectedSkills.includes(s)) state.selectedSkills.push(s);
    });
    renderChips();
  }
}

// Render Interactive Chips for Stack and Hobbies
function renderChips() {
  // Stacks
  const stackBox = document.getElementById('hud-stack-chips');
  stackBox.innerHTML = '';
  const allStacks = Array.from(new Set([...MIDIS_DB.popularStacks, ...state.selectedSkills]));

  allStacks.forEach(tag => {
    const chip = document.createElement('div');
    const isSelected = state.selectedSkills.includes(tag);
    chip.className = `hud-chip ${isSelected ? 'active' : ''}`;
    chip.textContent = tag;
    chip.addEventListener('click', () => {
      if (state.selectedSkills.includes(tag)) {
        state.selectedSkills = state.selectedSkills.filter(t => t !== tag);
        chip.classList.remove('active');
      } else {
        state.selectedSkills.push(tag);
        chip.classList.add('active');
      }
      document.getElementById('hud-stack-count').textContent = `${state.selectedSkills.length} выбрано`;
    });
    stackBox.appendChild(chip);
  });
  document.getElementById('hud-stack-count').textContent = `${state.selectedSkills.length} выбрано`;

  // Hobbies
  const hobbyBox = document.getElementById('hud-hobby-chips');
  hobbyBox.innerHTML = '';
  const allHobbies = Array.from(new Set([...MIDIS_DB.popularHobbies, ...state.selectedHobbies]));

  allHobbies.forEach(tag => {
    const chip = document.createElement('div');
    const isSelected = state.selectedHobbies.includes(tag);
    chip.className = `hud-chip ${isSelected ? 'active' : ''}`;
    chip.textContent = tag;
    chip.addEventListener('click', () => {
      if (state.selectedHobbies.includes(tag)) {
        state.selectedHobbies = state.selectedHobbies.filter(t => t !== tag);
        chip.classList.remove('active');
      } else {
        state.selectedHobbies.push(tag);
        chip.classList.add('active');
      }
      document.getElementById('hud-hobby-count').textContent = `${state.selectedHobbies.length} выбрано`;
    });
    hobbyBox.appendChild(chip);
  });
  document.getElementById('hud-hobby-count').textContent = `${state.selectedHobbies.length} выбрано`;
}

// ==========================================
// 5. PROMPT GENERATION ENGINE
// ==========================================

function compileMidisPrompt() {
  const sc = MIDIS_DB.scenarios.find(s => s.id === state.scenarioId) || MIDIS_DB.scenarios[0];

  const levelLabels = {
    bachelor: 'Высшее образование (Бакалавриат МИДиС)',
    college: 'СПО (Колледж МИДиС)',
    master: 'Высшее образование (Магистратура МИДиС)'
  };

  const skillLevelLabels = {
    beginner: 'Новичок (1 курс / погружение в специальность)',
    junior: 'Junior (знаю базовую теорию, создаю первые учебные проекты)',
    'junior-plus': 'Junior+ / Pre-Middle (уверенно владею инструментами)',
    freelancer: 'Практик / Фрилансер (совмещаю учебу с реальными заказами)'
  };

  const perceptionFormatDescriptions = {
    'structured-lists': 'Структурированные чек-листы: без длинных вводных и канцелярита, четкие короткие буллеты, готовые к внедрению.',
    'step-by-step': 'Пошаговый гайд (1-2-3): последовательный четкий алгоритм действий с контрольными точками готовности каждого этапа.',
    'analogies': 'Объяснение через аналогии: проводи параллели с видеоиграми, поп-культурой или бытовыми ситуациями для наглядности.',
    'strict-code': 'Инженерный строгий стиль: упор на стандарты индустрии, паттерны проектирования, чистые термины и код.',
    'mentor-dialogue': 'Тон заботливого наставника: общайся со мной на равных, подбадривай, задавай открытые развивающие вопросы.'
  };

  const yearsTotal = state.educationLevel === 'college' ? 4 : state.educationLevel === 'master' ? 2 : 4;
  const currentCourse = parseInt(state.course, 10) || 1;
  const yearsLeft = Math.max(1, yearsTotal - currentCourse + 1);

  // Collect active MIDIS institutional resources
  const activeResources = [];
  if (state.resources.partnerProjects) {
    activeResources.push('- Проектное обучение с реальными компаниями-партнерами с 1-2 курса (портфолио кейсов)');
  }
  if (state.resources.paidInternships) {
    activeResources.push('- Оплачиваемые профильные стажировки в индустрии');
  }
  if (state.resources.oupLeadership) {
    activeResources.push('- Дисциплина «Общая управленческая подготовка» (ОУП): системное мышление, проектно-аналитические сессии');
  }
  if (state.resources.aiMastery) {
    activeResources.push('- Обучение работе с ИИ и нейросетями по профилю (промпт-инжиниринг, ИИ-агенты) как базовый предмет программы');
  }
  if (state.resources.newSpecialistWellness) {
    activeResources.push('- Блок развития «Специалиста нового типа»: бассейн и спортклуб МИДиС, управление физической энергией');
  }
  if (state.resources.hackathonsAndEvents) {
    activeResources.push('- Участие в хакатонах, профессиональных конкурсах, выставках и стартап-питчах');
  }

  let prompt = `### РОЛЬ
${sc.systemRole}

---

### КОНТЕКСТ ОБО МНЕ (СТУДЕНТ МИДиС)
- Учебное заведение: Международный институт дизайна и сервиса (МИДиС, г. Челябинск)
- Уровень образования: ${levelLabels[state.educationLevel]}
- Направление: ${state.specializationName}
- Курс: ${state.course} курс (впереди обучения: примерно ${yearsLeft} ${yearsLeft === 1 ? 'год' : yearsLeft < 5 ? 'года' : 'лет'})
- Текущий уровень практических навыков: ${skillLevelLabels[state.skillLevel]}
${state.selectedSkills.length > 0 ? `- Мой стек и инструменты: ${state.selectedSkills.join(', ')}` : ''}
${state.selectedHobbies.length > 0 ? `- Мои увлечения и сильные стороны: ${state.selectedHobbies.join(', ')}` : ''}
${state.fearsInput.trim() ? `- Мои сомнения и сложности (честно): "${state.fearsInput.trim()}"` : ''}

---

### РЕСУРСЫ МОЕГО ИНСТИТУТА (МИДиС)
${activeResources.length > 0 ? activeResources.join('\n') : '- Проектные мастерские и академические ресурсы института'}

---

### ЗАДАЧА
${sc.goalSummary}
${state.taskInput.trim() ? `\nМой персональный запрос / контекст:\n«${state.taskInput.trim()}»` : ''}
${state.deadlineInput.trim() ? `\nДедлайн / рамки: ${state.deadlineInput.trim()}` : ''}

---

### ФОРМАТ ВОСПРИЯТИЯ И СТИЛЬ ОТВЕТА
${perceptionFormatDescriptions[state.perceptionFormat]}

---

### СТРУКТУРА ОТВЕТА:
`;

  switch (state.scenarioId) {
    case 'iot-roadmap':
      prompt += `1. Разбей ориентировочный план по оставшимся годам обучения ([${yearsLeft} года/лет]).
2. Для каждого года обучения укажи:
   - 2-3 профессиональные цели по направлению (${state.specializationName});
   - 1-2 надпрофессиональные цели (ИИ, управление проектами, физическая энергия, софт-скиллы);
   - конкретные действия внутри института МИДиС (партнерские проекты, элективы, хакатоны);
   - 1 «точку сверки» — контрольный вопрос самому себе, чтобы проверить, туда ли я иду.
3. В конце сформируй список из 5–7 конкретных первых шагов на ближайший месяц.
4. Если в моих ответах есть сомнения — включи безопасные «пробы пера» (разговор с практиком, мини-проект).`;
      break;

    case 'portfolio-pet-projects':
      prompt += `1. Предложи 3–4 уникальные концепции проектов на стыке моей специальности (${state.specializationName}) и моих увлечений (${state.selectedHobbies.join(', ') || 'технологии и творчество'}).
2. Для каждой идеи распиши:
   - Проблему пользователей и формулировку ценности;
   - Целевую аудиторию (ЦА);
   - Минимальный функционал (MVP) и рекомендуемый стек (${state.selectedSkills.join(', ') || 'базовый софт'});
   - Главную "фичу-крючок" (Wow-effect), которая зацепит арт-директора или тимлида в портфолио;
   - План реализации на 3-4 недели.`;
      break;

    case 'exam-defense-prep':
      prompt += `1. Объясни ключевую суть темы максимально доходчиво (методом Фейнмана).
2. Составь список из 8–10 самых вероятных и каверзных вопросов экзаменационной комиссии МИДиС на защите.
3. Для каждого вопроса дай:
   - В чем истинный подвох вопроса комиссии;
   - Идеальную формулу уверенного ответа на 40–60 секунд с опорой на терминологию.
4. Добавь 3 экспресс-совета по ораторской подаче и борьбе с волнением.`;
      break;

    case 'case-presentation':
      prompt += `1. Сформируй каркас презентации / кейса (для Behance/Dprofile/GitHub):
   - Заголовок и цепляющий подзаголовок с цифрами/пользой;
   - Контекст задачи и вводные ограничения;
   - Этап исследования и поиск ключевых инсайтов;
   - Процесс проектирования (черновики, неудачные итерации и почему они отброшены);
   - Финальное решение (демонстрация экранов/ассетов/кода);
   - Результаты, бизнес-метрики и выводы автора.
2. Напиши текст для ключевых слайдов на русском и емкие фразы на английском.`;
      break;

    case 'internship-cover-letter':
      prompt += `1. Сформулируй мое емкое позиционирование (Elevator Pitch на 3 предложения), выгодно подающее учебный бэкграунд в МИДиС.
2. Напиши персональное, живое сопроводительное письмо (Cover Letter) без штампов ("я коммуникабельный и стрессоустойчивый"), делающее акцент на практических кейсах.
3. Составь список из 3–5 вопросов работодателю на интервью, чтобы показать высокую зрелость.`;
      break;

    case 'troubleshooting-review':
      prompt += `1. Проведи объективный экспертный разбор предложенного решения.
2. Выдели 3 главных достоинства.
3. Укажи 3–5 критических проблем или узких мест (UX, чистота архитектуры, читаемость или логика).
4. Дай четкие рекомендации "Как исправить прямо сейчас" с конкретными примерами макета/кода.`;
      break;

    case 'time-management-balance':
      prompt += `1. Составь недельный спринт-график с учетом пар, блоков глубокой работы (Deep Work), отдыха и бассейна/спорта.
2. Внедри технику преодоления прокрастинации, подходящую под мой профиль.
3. Сформулируй 3 правила защиты личных границ и предотвращения студенческого выгорания.`;
      break;

    case 'design-concept-brainstorm':
      prompt += `1. Предложи 3 принципиально разных концептуальных направления.
2. Для каждого направления опиши:
   - Смысловую метафору и настроение;
   - Цветовую палитру (HEX-коды и роль каждого цвета);
   - Типографическую пару (акцидентный + наборный шрифт);
   - 3 конкретных референса из мирового искусства, кино или архитектуры.`;
      break;

    case 'research-coursework-helper':
      prompt += `1. Сформулируй академический аппарат исследования:
   - Актуальность темы в современных реалиях;
   - Объект и предмет исследования;
   - Цель и 4–5 конкретных задач;
   - Рабочую гипотезу.
2. Составь развернутый план-оглавление работы (Введение, Глава 1 Теория, Глава 2 Практика в МИДиС, Заключение).
3. Порекомендуй 3 направления для сбора эмпирических данных или проведения CustDev.`;
      break;

    case 'interview-simulator':
      prompt += `ВАЖНОЕ ПРАВИЛО РЕЖИМА СИМУЛЯЦИИ:
Сейчас НЕ отвечай за меня и НЕ выдавай весь список вопросов сразу!
1. Начни с короткого приветствия в роли нанимающего менеджера и задай мне ПЕРВЫЙ вопрос.
2. После моего ответа:
   - Оцени мой ответ по 10-балльной шкале;
   - Отметь, что было отлично, а где не хватило конкретики;
   - Задай следующий вопрос с постепенным повышением сложности.`;
      break;

    default:
      prompt += `Дай структурированный, детальный ответ с практическими рекомендациями, готовыми к применению.`;
  }

  prompt += `\n\n---
### ВАЖНО:
- Пиши на русском языке, живо, авторитетно, без шаблонного канцелярита.
- Не выдумывай названия сторонних курсов или партнеров, которых я не указывал — используй только ресурсы МИДиС и логику профессионального роста.`;

  return prompt;
}

// ==========================================
// 6. JARVIS SYNTHESIS ANIMATION
// ==========================================

function runJarvisSynthesis() {
  const loader = document.getElementById('synthesis-loader');
  const resultPanel = document.getElementById('terminal-result-panel');
  const statusText = document.getElementById('synthesis-status-text');
  const logLine = document.getElementById('synthesis-log-line');

  loader.style.display = 'flex';
  resultPanel.style.display = 'none';

  const sequence = [
    { delay: 100, status: 'СКАНИРОВАНИЕ ПРОФИЛЯ СТУДЕНТА МИДиС...', log: '[0.10s] Анализ курса, формы обучения и специальности...' },
    { delay: 500, status: 'ИНТЕГРАЦИЯ ИНСТИТУТСКИХ ВОЗМОЖНОСТЕЙ...', log: '[0.45s] Подключение проектного обучения, ОУП и ИИ-модулей...' },
    { delay: 900, status: 'КАЛИБРОВКА СИСТЕМНОЙ РОЛИ И ОГРАНИЧЕНИЙ...', log: '[0.85s] Оптимизация структуры под LLM (ChatGPT / Claude / DeepSeek)...' },
    { delay: 1300, status: 'СИНТЕЗ ЗАВЕРШЕН // РЕЗУЛЬТАТ ГОТОВ', log: '[1.25s] Вывод скомпилированного промпта в терминал...' }
  ];

  sequence.forEach(step => {
    setTimeout(() => {
      statusText.textContent = step.status;
      logLine.textContent = step.log;
    }, step.delay);
  });

  setTimeout(() => {
    loader.style.display = 'none';
    resultPanel.style.display = 'block';

    const promptText = compileMidisPrompt();
    document.getElementById('terminal-prompt-output').textContent = promptText;

    // Stats
    const words = promptText.trim().split(/\s+/).length;
    const tokens = Math.round(promptText.length / 3.4);
    document.getElementById('term-stat-words').textContent = `${words} слов`;
    document.getElementById('term-stat-tokens').textContent = `~${tokens} токенов`;

    // Direct Links
    const encoded = encodeURIComponent(promptText);
    document.getElementById('term-link-chatgpt').href = `https://chatgpt.com/?q=${encoded}`;
    document.getElementById('term-link-claude').href = `https://claude.ai/new?q=${encoded}`;
    document.getElementById('term-link-deepseek').href = `https://chat.deepseek.com/`;

    showToast('⚡ Промпт успешно синтезирован!');
  }, 1600);
}

// ==========================================
// 7. EVENT LISTENERS
// ==========================================

function attachEvents() {
  // Step Navigation Top Bar clicks
  document.querySelectorAll('.step-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step, 10);
      goToStep(step);
    });
  });

  // Next / Prev button triggers
  document.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(parseInt(btn.dataset.next, 10));
    });
  });

  document.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(parseInt(btn.dataset.prev, 10));
    });
  });

  // Category filter tabs in Step 1
  document.querySelectorAll('#scenario-category-tabs .cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#scenario-category-tabs .cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderScenarios(tab.dataset.cat);
    });
  });

  // Level Options (Bachelor, College, Master) in Step 2
  document.querySelectorAll('#level-options-grid .big-option-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#level-options-grid .big-option-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.educationLevel = card.dataset.level;
      updateSpecializationsDropdown();
    });
  });

  // Specialization dropdown
  document.getElementById('select-spec-hud').addEventListener('change', (e) => {
    state.specializationName = e.target.value;
  });

  // Course Pills
  document.querySelectorAll('#course-selector .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#course-selector .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.course = btn.dataset.val;
    });
  });

  // Skill Level Pills
  document.querySelectorAll('#skill-level-selector .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#skill-level-selector .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.skillLevel = btn.dataset.val;
    });
  });

  // Format of Perception Cards in Step 3
  document.querySelectorAll('#formats-hud-container .format-hud-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#formats-hud-container .format-hud-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.perceptionFormat = card.dataset.format;
    });
  });

  // Add Custom Stack Tag in Step 4
  const addCustomStack = () => {
    const input = document.getElementById('hud-custom-stack-input');
    const val = input.value.trim();
    if (val && !state.selectedSkills.includes(val)) {
      state.selectedSkills.push(val);
      input.value = '';
      renderChips();
    }
  };
  document.getElementById('hud-btn-add-stack').addEventListener('click', addCustomStack);
  document.getElementById('hud-custom-stack-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomStack(); }
  });

  // Add Custom Hobby Tag in Step 4
  const addCustomHobby = () => {
    const input = document.getElementById('hud-custom-hobby-input');
    const val = input.value.trim();
    if (val && !state.selectedHobbies.includes(val)) {
      state.selectedHobbies.push(val);
      input.value = '';
      renderChips();
    }
  };
  document.getElementById('hud-btn-add-hobby').addEventListener('click', addCustomHobby);
  document.getElementById('hud-custom-hobby-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomHobby(); }
  });

  // Resources Checkboxes
  ['partnerProjects', 'paidInternships', 'oupLeadership', 'aiMastery', 'newSpecialistWellness', 'hackathonsAndEvents'].forEach(resKey => {
    const el = document.getElementById(`chk-${resKey}`);
    if (el) {
      el.addEventListener('change', () => {
        state.resources[resKey] = el.checked;
      });
    }
  });

  // Step 5 Quick Templates
  document.getElementById('btn-qt-portfolio').addEventListener('click', () => {
    document.getElementById('hud-task-input').value = 'Идея пет-проекта: сервис на стыке моей специальности и локальной городской культуры с геймификацией.';
    state.taskInput = document.getElementById('hud-task-input').value;
  });
  document.getElementById('btn-qt-defense').addEventListener('click', () => {
    document.getElementById('hud-task-input').value = 'Подготовка к защите курсового проекта: объясни ключевую суть простыми словами и выдели 8 главных вопросов комиссии.';
    state.taskInput = document.getElementById('hud-task-input').value;
  });
  document.getElementById('btn-qt-roadmap').addEventListener('click', () => {
    document.getElementById('hud-task-input').value = 'Построить ориентировочный план развития на 4 года: как совместить проектную практику в МИДиС, хакатоны и отдых.';
    state.taskInput = document.getElementById('hud-task-input').value;
  });
  document.getElementById('btn-qt-internship').addEventListener('click', () => {
    document.getElementById('hud-task-input').value = 'Составить позиционирование и сильное сопроводительное письмо для отклика на стажировку по моей специальности.';
    state.taskInput = document.getElementById('hud-task-input').value;
  });

  // Text inputs
  document.getElementById('hud-task-input').addEventListener('input', (e) => state.taskInput = e.target.value);
  document.getElementById('hud-fears-input').addEventListener('input', (e) => state.fearsInput = e.target.value);
  document.getElementById('hud-deadline-input').addEventListener('input', (e) => state.deadlineInput = e.target.value);

  // Synthesize Button
  document.getElementById('btn-start-synthesize').addEventListener('click', () => {
    goToStep(6);
  });

  // Terminal Copy Button
  document.getElementById('btn-terminal-copy').addEventListener('click', () => {
    const text = document.getElementById('terminal-prompt-output').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const label = document.getElementById('copy-btn-label');
      label.textContent = 'СКОПИРОВАНО В БУФЕР ОБМЕНА!';
      document.getElementById('btn-terminal-copy').style.background = '#10B981';
      showToast('✅ Промпт скопирован! Вставьте его в ChatGPT / Claude / DeepSeek');
      setTimeout(() => {
        label.textContent = 'СКОПИРОВАТЬ ПРОМПТ В БУФЕР';
        document.getElementById('btn-terminal-copy').style.background = '';
      }, 2500);
    });
  });

  // Download .md file
  document.getElementById('btn-term-download').addEventListener('click', () => {
    const content = document.getElementById('terminal-prompt-output').textContent;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `midis_prompt_${state.scenarioId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Файл .md сохранен на устройство');
  });

  // Restart wizard
  document.getElementById('btn-term-restart').addEventListener('click', () => {
    goToStep(1);
    showToast('Переход к началу конструктора');
  });

  // Guide Modal
  const modal = document.getElementById('guide-modal');
  const openModal = () => modal.classList.add('open');
  const closeModal = () => modal.classList.remove('open');

  document.getElementById('btn-open-guide').addEventListener('click', openModal);
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);
  document.getElementById('btn-modal-ok').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// Toast Notifications
function showToast(msg) {
  const box = document.getElementById('hud-toast-box');
  const t = document.createElement('div');
  t.className = 'hud-toast';
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => {
    if (t.parentNode) t.parentNode.removeChild(t);
  }, 3000);
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  renderScenarios('all');
  updateSpecializationsDropdown();
  renderChips();
  attachEvents();
  goToStep(1);
});
