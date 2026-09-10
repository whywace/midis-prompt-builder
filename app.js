/**
 * MIDIS Prompt Builder
 * Pure Vanilla JavaScript (No React, No dependencies)
 * Author: Melnikov Semen
 * Brand: International Institute of Design and Service (MIDIS)
 */

// ==========================================
// 1. DATA DICTIONARIES & SCENARIOS
// ==========================================

const MIDIS_DATA = {
  departments: [
    // Bachelor
    { id: 'bachelor-design', name: 'Высшая школа дизайна и технологий', level: 'bachelor' },
    { id: 'bachelor-it', name: 'Институт информационных технологий', level: 'bachelor' },
    { id: 'bachelor-service', name: 'Высшая школа сервиса и туризма', level: 'bachelor' },
    { id: 'bachelor-management', name: 'Высшая школа экономики и управления', level: 'bachelor' },
    { id: 'bachelor-linguistics', name: 'Кафедра лингвистики и коммуникаций', level: 'bachelor' },

    // College (СПО)
    { id: 'college-design', name: 'Колледж: Дизайн и арт', level: 'college' },
    { id: 'college-it', name: 'Колледж: Информационные технологии', level: 'college' },
    { id: 'college-service', name: 'Колледж: Сервис, туризм и коммерция', level: 'college' },

    // Master
    { id: 'master-all', name: 'Магистратура МИДиС', level: 'master' }
  ],

  specializations: [
    // Bachelor - Design
    { id: 'spec-fde-web', name: 'Веб-дизайн и проектирование цифровых продуктов (FDE)', deptId: 'bachelor-design', level: 'bachelor', defaultStack: ['Figma', 'React', 'HTML/CSS', 'Design Systems', 'Midjourney'] },
    { id: 'spec-3d-games', name: '3D-моделирование и проектирование игр и приложений', deptId: 'bachelor-design', level: 'bachelor', defaultStack: ['Blender', 'Substance Painter', 'Unreal Engine', 'Unity', 'ZBrush'] },
    { id: 'spec-graphic-brand', name: 'Графический дизайн и брендинг', deptId: 'bachelor-design', level: 'bachelor', defaultStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'] },
    { id: 'spec-interior-env', name: 'Дизайн интерьера и городской среды', deptId: 'bachelor-design', level: 'bachelor', defaultStack: ['AutoCAD', '3ds Max', 'Revit', 'Photoshop', 'SketchUp'] },
    { id: 'spec-motion-anim', name: 'Цифровая анимация и моушн-дизайн', deptId: 'bachelor-design', level: 'bachelor', defaultStack: ['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro'] },
    { id: 'spec-fashion', name: 'Дизайн одежды и управление модным брендом', deptId: 'bachelor-design', level: 'bachelor', defaultStack: ['CLO 3D', 'Adobe Illustrator', 'Photoshop', 'Moodboarding'] },

    // Bachelor - IT
    { id: 'spec-ai-pm', name: 'Управление ИТ-проектами и искусственный интеллект (FDE)', deptId: 'bachelor-it', level: 'bachelor', defaultStack: ['Python', 'Cursor AI', 'ChatGPT', 'Git & GitHub', 'Notion', 'Agile/Scrum'] },
    { id: 'spec-web-mobile-dev', name: 'Проектирование и разработка веб и мобильных приложений', deptId: 'bachelor-it', level: 'bachelor', defaultStack: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker'] },
    { id: 'spec-gamedev', name: 'Разработка игр и виртуальные технологии', deptId: 'bachelor-it', level: 'bachelor', defaultStack: ['C#', 'Unity', 'C++', 'Unreal Engine', 'Git & GitHub'] },

    // Bachelor - Service & Management
    { id: 'spec-event-service', name: 'Ивент-менеджмент и продюсирование событий', deptId: 'bachelor-service', level: 'bachelor', defaultStack: ['Notion', 'Miro', 'Excel / Таблицы', 'Trello', 'Telegram Ads'] },
    { id: 'spec-tourism-digital', name: 'Управление цифровыми проектами и аналитика в туризме', deptId: 'bachelor-service', level: 'bachelor', defaultStack: ['Power BI', 'Google Analytics', 'CRM', 'Notion'] },
    { id: 'spec-hotel-rest', name: 'Ресторанный и международный гостиничный менеджмент', deptId: 'bachelor-service', level: 'bachelor', defaultStack: ['iiko / R-Keeper', 'Opera PMS', 'Excel / Таблицы', 'Service Design'] },
    { id: 'spec-business-marketing', name: 'Управление бизнесом и интернет-маркетинг', deptId: 'bachelor-management', level: 'bachelor', defaultStack: ['Яндекс.Метрика', 'VK Ads', 'Notion', 'Miro', 'Unit-экономика'] },
    { id: 'spec-linguistics', name: 'Перевод и международные бизнес-коммуникации (EN / CN)', deptId: 'bachelor-linguistics', level: 'bachelor', defaultStack: ['Trados', 'DeepL Pro', 'CAT-tools', 'Notion'] },

    // College (СПО)
    { id: 'spec-col-design', name: 'Графический дизайн (Колледж)', deptId: 'college-design', level: 'college', defaultStack: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma'] },
    { id: 'spec-col-web-dev', name: 'Веб-дизайн и разработка приложений (Колледж)', deptId: 'college-design', level: 'college', defaultStack: ['Figma', 'HTML/CSS', 'JavaScript', 'Tilda'] },
    { id: 'spec-col-3d-gamedev', name: '3D-моделирование и игровая графика (Колледж)', deptId: 'college-design', level: 'college', defaultStack: ['Blender', 'Photoshop', 'Unity'] },
    { id: 'spec-col-dev-software', name: 'Разработка и администрирование ПО (Колледж)', deptId: 'college-it', level: 'college', defaultStack: ['Python', 'SQL', 'Git & GitHub', 'C#'] },
    { id: 'spec-col-tourism', name: 'Туризм и индустрия гостеприимства (Колледж)', deptId: 'college-service', level: 'college', defaultStack: ['Excel / Таблицы', 'Системы бронирования', 'Деловой этикет'] },
    { id: 'spec-col-trade-marketing', name: 'Торговое дело: предпринимательство и e-commerce (Колледж)', deptId: 'college-service', level: 'college', defaultStack: ['Маркетплейсы', 'SMM', 'Excel / Таблицы', 'Tilda'] },

    // Master
    { id: 'spec-master-creative', name: 'Креативное лидерство и управление дизайн-проектами', deptId: 'master-all', level: 'master', defaultStack: ['Design Systems', 'Notion', 'Miro', 'Agile/Scrum', 'AI-workflow'] },
    { id: 'spec-master-ai-biz', name: 'Интеллектуальные информационные системы в бизнесе', deptId: 'master-all', level: 'master', defaultStack: ['Python', 'ML-pipelines', 'BigData', 'Enterprise Architecture'] }
  ],

  scenarios: [
    {
      id: 'iot-roadmap',
      order: 1,
      title: 'Индивидуальный трек (ИОТ)',
      badge: 'Методика МИДиС',
      icon: '🧭',
      desc: 'Построение роадмапа прокачки скиллов под специальность с учетом проектов и жизни.',
      systemRole: 'Ты — опытный карьерный наставник и коуч по личностному развитию, который специализируется на построении индивидуальных образовательных траекторий (ИОТ) для студентов института и колледжа МИДиС творческих, цифровых и сервисных профессий.',
      goalSummary: 'Составить для меня ориентировочный индивидуальный план развития на весь оставшийся срок обучения по курсам/семестрам (профессиональные навыки, надпрофессиональные софт-скиллы, проверка правильности выбора профессии).',
      taskLabel: 'Текущие сомнения, цели или приоритеты на семестр',
      taskPlaceholder: 'Например: хочу сфокусироваться на создании интерфейсов мобильных сервисов, но боюсь, что не справлюсь с кодом и защитой проектов перед комиссией.',
      constraintsPlaceholder: 'Например: могу уделять учебе до 6-8 часов в неделю; важно не выгореть.'
    },
    {
      id: 'portfolio-pet-projects',
      order: 2,
      title: 'Идеи пет-проектов и портфолио',
      badge: 'Хит для Behance',
      icon: '✨',
      desc: 'Поиск нестандартных тем на стыке специальности и личных интересов.',
      systemRole: 'Ты — креативный директор и лид продуктовой разработки с опытом отбора сильных джуниор-портфолио, умеющий находить свежие гипотезы на стыке технологий и хобби.',
      goalSummary: 'Сгенерировать 3–4 проработанные концепции пет-проектов с четким описанием проблемы, ЦА, необходимого стека инструментов и wow-эффекта для работодателей.',
      taskLabel: 'Какую сферу или проблему хочется исследовать в проекте?',
      taskPlaceholder: 'Например: хочу сделать пет-проект на стыке веб-дизайна и локального уральского стритфуда / настольных игр.',
      constraintsPlaceholder: 'Например: проект должен быть реализуем за 3-4 недели силами одного студента.'
    },
    {
      id: 'exam-defense-prep',
      order: 3,
      title: 'Подготовка к защите и сессии',
      badge: 'Антистресс',
      icon: '🛡️',
      desc: 'Разбор сложных тем простыми словами + симуляция каверзных вопросов комиссии МИДиС.',
      systemRole: 'Ты — академический наставник и строгий, но доброжелательный член государственной экзаменационной комиссии (ГЭК) МИДиС, умеющий объяснять сложнейшие концепции на пальцах.',
      goalSummary: 'Разложить сложную тему курсового/дипломного проекта на понятные смысловые блоки и подготовить чек-лист ответов на 7-10 критических вопросов комиссии на защите.',
      taskLabel: 'Тема проекта, дисциплина или сложный билет',
      taskPlaceholder: 'Например: защита проекта по теме «Редизайн интерфейса сервиса доставки с адаптивной дизайн-системой».',
      constraintsPlaceholder: 'Например: защита длится всего 7 минут, нужно сфокусироваться на бизнес-пользе.'
    },
    {
      id: 'case-presentation',
      order: 4,
      title: 'Оформление кейса и презентации',
      badge: 'Behance / GitHub',
      icon: '📐',
      desc: 'Структура описания проекта: от исследований до финального визуала и выводов.',
      systemRole: 'Ты — арт-директор и специалист по сторителлингу продуктовых и дизайнерских кейсов для топовых студий и платформ (Behance, Dprofile, GitHub).',
      goalSummary: 'Сформировать покадровый сценарий оформления кейса: структура экранов, акценты на трудностях и их преодолении, формулировка бизнес-результатов и выводы.',
      taskLabel: 'О каком проекте пишем кейс и для какой площадки?',
      taskPlaceholder: 'Например: учебный проект брендинга и приложения для локального челябинского бренда молодежной одежды.',
      constraintsPlaceholder: 'Например: формат длинного лонгрида на Behance с акцентом на дизайн-систему.'
    },
    {
      id: 'internship-cover-letter',
      order: 5,
      title: 'Стажировки и фриланс-старт',
      badge: 'Трудоустройство',
      icon: '💼',
      desc: 'Составление продающего сопроводительного письма и позиционирования студента.',
      systemRole: 'Ты — IT/Creative HR-директор и карьерный консультант, отбирающий стажеров и джунов в прогрессивные компании и дизайн-агентства.',
      goalSummary: 'Сформулировать яркое позиционирование (Elevator Pitch), структуру резюме и убедительное персонализированное сопроводительное письмо под вакансию или фриланс.',
      taskLabel: 'Желаемая позиция, компания или сфера для заказов',
      taskPlaceholder: 'Например: отклик на оплачиваемую стажировку Junior UI/UX Designer в продуктовую компанию или IT-отдел ритейлера.',
      constraintsPlaceholder: 'Например: нет опыта работы в штате, но есть 3 сильных учебных проекта в МИДиС и участие в хакатоне.'
    },
    {
      id: 'troubleshooting-review',
      order: 6,
      title: 'Код-ревью и дизайн-критика',
      badge: 'Экспертная оценка',
      icon: '🔍',
      desc: 'Объективная оценка и поиск ошибок в UX/UI, типографике, архитектуре кода.',
      systemRole: 'Ты — Senior-эксперт (Lead Architect & Principal Designer), проводящий детальное, конструктивное и развивающее код-ревью и дизайн-критику.',
      goalSummary: 'Проанализировать представленный макет, кусок кода или архитектурное решение по стандартам индустрии, выделить 3 критические ошибки и дать пошаговый план исправлений.',
      taskLabel: 'Что именно нужно отрецензировать? (опишите макет или логику кода)',
      taskPlaceholder: 'Например: макет оформления заказа в мобильном приложении, где пользователи путаются при выборе доставки.',
      constraintsPlaceholder: 'Например: важно сохранить доступность (a11y) и удобство для пользователей со слабым интернетом.'
    },
    {
      id: 'time-management-balance',
      order: 7,
      title: 'Тайм-менеджмент и баланс',
      badge: 'Без выгорания',
      icon: '⏳',
      desc: 'План совмещения пар в МИДиС, пет-проектов, спорта в бассейне и отдыха.',
      systemRole: 'Ты — ментор по продуктивности и коуч здорового тайм-менеджмента для студентов творческих и цифровых специальностей.',
      goalSummary: 'Разработать сбалансированный недельный спринт без перегрузок, с гибкими блоками фокусировки, учетом пар, бассейна/спорта и техниками преодоления прокрастинации.',
      taskLabel: 'В чем главная сложность с расписанием и концентрацией?',
      taskPlaceholder: 'Например: 3 дедлайна по проектам через 2 недели, а я прокрастинирую в шортсах и сплю по 5 часов.',
      constraintsPlaceholder: 'Например: пары до 15:00, вечером нужно 2 раза в неделю ходить в бассейн МИДиС.'
    },
    {
      id: 'design-concept-brainstorm',
      order: 8,
      title: 'Дизайн-концепты и брейншторм',
      badge: 'Креативный рывок',
      icon: '💡',
      desc: 'Разработка свежих визуальных мудбордов, метафор, колористики и пайплайнов.',
      systemRole: 'Ты — визионерский концепт-дизайнер и креативный фасилитатор, мастер генерации неожиданных визуальных ассоциаций и нестандартных стилей.',
      goalSummary: 'Предложить 3 контрастных стилистических направления проекта (метафора, пластика форм, типографика, колористика, референсы из мирового дизайна и искусства).',
      taskLabel: 'Тема проекта, продукт или настроение',
      taskPlaceholder: 'Например: концепция бренда и приложения для молодежного фестиваля уральской идентичности и медиаискусства.',
      constraintsPlaceholder: 'Например: стиль должен одинаково мощно смотреться и на смартфонах, и на мерче/худи.'
    },
    {
      id: 'research-coursework-helper',
      order: 9,
      title: 'Курсовая и исследовательская работа',
      badge: 'ГОСТ & Наука',
      icon: '📚',
      desc: 'Формулировка актуальности, объекта, предмета, гипотез и структуры ВКР/курсовой.',
      systemRole: 'Ты — научный руководитель и эксперт по академическим исследованиям в области дизайна, информационных технологий и сервисной экономики.',
      goalSummary: 'Сформулировать академический аппарат исследования (актуальность, объект, предмет, цель, задачи, гипотеза) и составить подробное оглавление практической главы проекта.',
      taskLabel: 'Предварительная тема курсовой/диплома',
      taskPlaceholder: 'Например: курсовая работа на тему «Применение генеративных нейросетей в процессе проектирования интерфейсов пользовательского опыта».',
      constraintsPlaceholder: 'Например: практическая часть должна базироваться на реальном кейсе проекта в Челябинске или в МИДиС.'
    },
    {
      id: 'interview-simulator',
      order: 10,
      title: 'Симулятор собеседования',
      badge: 'Интерактив',
      icon: '🎯',
      desc: 'Перевод нейросети в режим тимлида: задает вопросы по одному, дает фидбек и тренирует.',
      systemRole: 'Ты — ведущий тимлид и нанимающий менеджер в крупной компании. Ты проводишь реалистичное тренировочное собеседование на позицию Junior-специалиста.',
      goalSummary: 'Провести интерактивное собеседование в режиме живого диалога (задавать ровно по одному вопросу за раз, оценивать глубину моего ответа и давать развивающую обратную связь).',
      taskLabel: 'На какую позицию и уровень тренируемся?',
      taskPlaceholder: 'Например: собеседование на позицию Junior Frontend Developer / Junior UI/UX Designer в аккредитованную IT-компанию.',
      constraintsPlaceholder: 'Например: сделай упор на вопросы по реальным кейсам и проверку софт-скиллов, а не просто сухое знание терминов.'
    }
  ],

  clubs: [
    { id: 'club-fde-lab', name: 'Мастерская FDE Lab', desc: 'Реальные коммерческие заказы от бизнеса' },
    { id: 'club-it-hack', name: 'IT-клуб и хакатоны', desc: 'Участие в Цифровом прорыве и челленджах' },
    { id: 'club-media', name: 'Медиацентр MIDIS Media', desc: 'Съемка видео, подкасты, дизайн контента' },
    { id: 'club-fashion', name: 'Студия моды и кастома', desc: 'Показы коллекций, апсайклинг, недели моды' },
    { id: 'club-esports', name: 'Киберспортивная лига', desc: 'Турниры по Dota 2, CS2, Valorant' },
    { id: 'club-pool-sport', name: 'Бассейн и спортклуб МИДиС', desc: 'Плавание, тренажерка, управление энергией' },
    { id: 'club-psychology', name: 'Клуб психологии и софт-скиллов', desc: 'Эмоциональный интеллект, тренинги общения' }
  ],

  defaultStacks: [
    'Figma', 'React', 'HTML/CSS', 'TypeScript', 'Node.js', 'Python', 'Cursor AI',
    'ChatGPT', 'Claude', 'DeepSeek', 'Midjourney', 'Blender', 'Adobe Photoshop',
    'Adobe Illustrator', 'Unity', 'C#', 'Notion', 'Miro', 'PostgreSQL', 'Docker'
  ],

  defaultHobbies: [
    'Видеоигры и геймдев', 'Киберспорт', 'Музыка и саунд-дизайн', 'Фотография и стрит-арт',
    'Уличная мода и кастом', 'Урбанистика и архитектура', 'Кофе и гастрономия', 'Фитнес и плавание',
    'Психология и коучинг', 'Литература и сторителлинг', 'Кинематограф и видеомонтаж'
  ],

  presets: [
    {
      id: 'fde-designer',
      name: '🎨 Веб-дизайнер FDE',
      badge: '2 курс',
      scenarioId: 'portfolio-pet-projects',
      level: 'bachelor',
      deptId: 'bachelor-design',
      specId: 'spec-fde-web',
      course: '2',
      studyForm: 'full-time',
      skillLevel: 'junior',
      skills: ['Figma', 'HTML/CSS', 'React', 'Midjourney', 'Notion'],
      hobbies: ['Видеоигры и геймдев', 'Урбанистика и архитектура', 'Кофе и гастрономия'],
      format: 'step-by-step',
      task: 'Идея пет-проекта: мобильное приложение или интерактивный гид по кофейням и общественным пространствам с геймификацией отзывов.',
      fears: 'Боюсь не собрать сильное портфолио до поиска стажировки и не до конца уверен в чистоте своего кода.',
      deadline: 'Сдать прототип через 3 недели',
      constraints: 'Делаю один в Figma, прототип на React',
      clubs: ['club-fde-lab', 'club-media']
    },
    {
      id: 'ai-pm-it',
      name: '⚡ IT-проджект & AI',
      badge: '1 курс ИОТ',
      scenarioId: 'iot-roadmap',
      level: 'bachelor',
      deptId: 'bachelor-it',
      specId: 'spec-ai-pm',
      course: '1',
      studyForm: 'full-time',
      skillLevel: 'beginner',
      skills: ['Python', 'Cursor AI', 'ChatGPT', 'Git & GitHub', 'Notion'],
      hobbies: ['Киберспорт', 'Психология и коучинг', 'Литература и сторителлинг'],
      format: 'structured-lists',
      task: 'Построить индивидуальный трек обучения: как с 1 курса войти в проектную работу с партнерами института и хакатоны.',
      fears: 'Сомневаюсь, хватит ли технического бэкграунда для управления разработчиками, и боюсь завалить первую сессию.',
      deadline: 'План на семестр и 4 года вперед',
      constraints: 'Учеба очная, важно выделить время на сон и спорт',
      clubs: ['club-it-hack', 'club-esports']
    },
    {
      id: '3d-college',
      name: '🎮 3D-моделер игр',
      badge: 'Колледж 3 курс',
      scenarioId: 'case-presentation',
      level: 'college',
      deptId: 'college-design',
      specId: 'spec-col-3d-gamedev',
      course: '3',
      studyForm: 'full-time',
      skillLevel: 'junior-plus',
      skills: ['Blender', 'Adobe Photoshop', 'Unity'],
      hobbies: ['Видеоигры и геймдев', 'Музыка и саунд-дизайн'],
      format: 'analogies',
      task: 'Оформить кейс игровой 3D-локации для Behance/Artstation: показать пайплайн от блокаута до финального рендера в движке.',
      fears: 'Не умею красиво и продающе описывать процесс работы в тексте кейса.',
      deadline: '2 недели',
      constraints: 'Кейс на русском с английскими подписями экранов',
      clubs: ['club-fde-lab']
    },
    {
      id: 'hotel-service',
      name: '🛎️ Ресторанный менеджмент',
      badge: 'Выпускник 4 курс',
      scenarioId: 'internship-cover-letter',
      level: 'bachelor',
      deptId: 'bachelor-service',
      specId: 'spec-hotel-rest',
      course: '4',
      studyForm: 'full-time',
      skillLevel: 'freelancer',
      skills: ['Excel / Таблицы', 'Service Design', 'Notion'],
      hobbies: ['Кофе и гастрономия', 'Путешествия и хайкинг', 'Психология и коучинг'],
      format: 'mentor-dialogue',
      task: 'Составить позиционирование и сопроводительное письмо для отклика на должность управляющего рестораном / ивент-директора.',
      fears: 'Боюсь показаться слишком молодым кандидатом без 10-летнего опыта.',
      deadline: 'Нужно отправить завтра',
      constraints: 'Сделать упор на практику в МИДиС и управленческие навыки ОУП',
      clubs: ['club-pool-sport']
    }
  ]
};

// ==========================================
// 2. APPLICATION STATE
// ==========================================

const state = {
  scenarioId: 'iot-roadmap',
  educationLevel: 'bachelor',
  departmentId: 'bachelor-design',
  specializationId: 'spec-fde-web',
  course: '1',
  studyForm: 'full-time',
  skillLevel: 'beginner',
  selectedSkills: ['Figma', 'HTML/CSS', 'Notion'],
  selectedHobbies: ['Видеоигры и геймдев', 'Кофе и гастрономия'],
  perceptionFormat: 'structured-lists',
  taskInput: '',
  fearsInput: '',
  deadlineInput: '',
  constraintsInput: '',
  resources: {
    partnerProjects: true,
    paidInternships: true,
    oupLeadership: true,
    aiMastery: true,
    newSpecialistWellness: true,
    secondDiploma: false,
    hackathonsAndEvents: true
  },
  selectedClubs: ['club-fde-lab']
};

// ==========================================
// 3. DOM ELEMENTS
// ==========================================

const DOM = {
  presetsContainer: document.getElementById('presets-container'),
  scenariosList: document.getElementById('scenarios-list'),
  levelSelector: document.getElementById('level-selector'),
  selectDept: document.getElementById('select-department'),
  selectSpec: document.getElementById('select-specialization'),
  selectCourse: document.getElementById('select-course'),
  selectStudyForm: document.getElementById('select-study-form'),
  selectSkillLevel: document.getElementById('select-skill-level'),
  stackChipsContainer: document.getElementById('stack-chips-container'),
  stackCounter: document.getElementById('stack-counter'),
  inputCustomStack: document.getElementById('input-custom-stack'),
  btnAddStack: document.getElementById('btn-add-stack'),
  hobbiesChipsContainer: document.getElementById('hobbies-chips-container'),
  hobbiesCounter: document.getElementById('hobbies-counter'),
  inputCustomHobby: document.getElementById('input-custom-hobby'),
  btnAddHobby: document.getElementById('btn-add-hobby'),
  formatSelector: document.getElementById('format-selector'),
  taskInput: document.getElementById('task-input'),
  taskInputLabel: document.getElementById('task-input-label'),
  fearsInput: document.getElementById('fears-input'),
  deadlineInput: document.getElementById('deadline-input'),
  constraintsInput: document.getElementById('constraints-input'),
  resourcesContainer: document.getElementById('resources-container'),
  clubsContainer: document.getElementById('clubs-container'),
  promptOutput: document.getElementById('prompt-output'),
  statWords: document.getElementById('stat-words'),
  statTokens: document.getElementById('stat-tokens'),
  btnCopyPrompt: document.getElementById('btn-copy-prompt'),
  copyBtnText: document.getElementById('copy-btn-text'),
  linkChatgpt: document.getElementById('link-chatgpt'),
  linkClaude: document.getElementById('link-claude'),
  linkDeepseek: document.getElementById('link-deepseek'),
  btnDownloadMd: document.getElementById('btn-download-md'),
  btnResetForm: document.getElementById('btn-reset-form'),
  mobileStatWords: document.getElementById('mobile-stat-words'),
  btnMobileViewPrompt: document.getElementById('btn-mobile-view-prompt'),
  btnMobileCopyPrompt: document.getElementById('btn-mobile-copy-prompt'),
  btnOpenGuide: document.getElementById('btn-open-guide'),
  btnCloseGuide: document.getElementById('btn-close-guide'),
  btnGuideOk: document.getElementById('btn-guide-ok'),
  guideModal: document.getElementById('guide-modal'),
  toastBox: document.getElementById('toast-box')
};

// ==========================================
// 4. INITIALIZATION & RENDERING
// ==========================================

function init() {
  renderPresets();
  renderScenarios();
  renderDepartments();
  renderSpecializations();
  renderChipsCloud(DOM.stackChipsContainer, MIDIS_DATA.defaultStacks, state.selectedSkills, 'skill');
  renderChipsCloud(DOM.hobbiesChipsContainer, MIDIS_DATA.defaultHobbies, state.selectedHobbies, 'hobby');
  renderClubs();
  updateCounters();
  attachEventListeners();
  updateLivePrompt();
}

// Render Presets
function renderPresets() {
  DOM.presetsContainer.innerHTML = '';
  MIDIS_DATA.presets.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-chip-btn';
    btn.innerHTML = `<span>${p.name}</span> <span class="preset-tag-badge">${p.badge}</span>`;
    btn.addEventListener('click', () => applyPreset(p));
    DOM.presetsContainer.appendChild(btn);
  });
}

// Render Scenarios
function renderScenarios() {
  DOM.scenariosList.innerHTML = '';
  MIDIS_DATA.scenarios.forEach(sc => {
    const card = document.createElement('div');
    card.className = `scenario-card ${state.scenarioId === sc.id ? 'active' : ''}`;
    card.dataset.id = sc.id;
    card.innerHTML = `
      <div>
        <div class="scenario-top">
          <span class="scenario-icon">${sc.icon}</span>
          <span class="scenario-badge">${sc.badge}</span>
        </div>
        <h3 class="scenario-title">${sc.title}</h3>
      </div>
      <p class="scenario-desc">${sc.desc}</p>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.scenarioId = sc.id;
      updateScenarioLabels(sc);
      updateLivePrompt();
    });
    DOM.scenariosList.appendChild(card);
  });
}

function updateScenarioLabels(scenario) {
  DOM.taskInputLabel.textContent = scenario.taskLabel;
  DOM.taskInput.placeholder = scenario.taskPlaceholder;
  DOM.constraintsInput.placeholder = scenario.constraintsPlaceholder;
}

// Render Departments filtered by level
function renderDepartments() {
  DOM.selectDept.innerHTML = '';
  const filtered = MIDIS_DATA.departments.filter(d => d.level === state.educationLevel);
  filtered.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.name;
    if (d.id === state.departmentId) opt.selected = true;
    DOM.selectDept.appendChild(opt);
  });

  if (!filtered.some(d => d.id === state.departmentId) && filtered.length > 0) {
    state.departmentId = filtered[0].id;
    DOM.selectDept.value = state.departmentId;
  }
}

// Render Specializations filtered by department
function renderSpecializations() {
  DOM.selectSpec.innerHTML = '';
  const filtered = MIDIS_DATA.specializations.filter(s => s.deptId === state.departmentId);
  filtered.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    if (s.id === state.specializationId) opt.selected = true;
    DOM.selectSpec.appendChild(opt);
  });

  if (!filtered.some(s => s.id === state.specializationId) && filtered.length > 0) {
    state.specializationId = filtered[0].id;
    DOM.selectSpec.value = state.specializationId;
  }
}

// Render Chips Cloud
function renderChipsCloud(container, items, selectedList, type) {
  container.innerHTML = '';
  items.forEach(item => {
    const isSelected = selectedList.includes(item);
    const chip = document.createElement('div');
    chip.className = `chip ${isSelected ? 'active' : ''}`;
    chip.textContent = item;
    chip.addEventListener('click', () => {
      toggleChip(item, selectedList, chip, type);
    });
    container.appendChild(chip);
  });
}

function toggleChip(item, list, element, type) {
  const idx = list.indexOf(item);
  if (idx > -1) {
    list.splice(idx, 1);
    element.classList.remove('active');
  } else {
    list.push(item);
    element.classList.add('active');
  }
  updateCounters();
  updateLivePrompt();
}

function updateCounters() {
  DOM.stackCounter.textContent = `${state.selectedSkills.length} выбрано`;
  DOM.hobbiesCounter.textContent = `${state.selectedHobbies.length} выбрано`;
}

// Render Clubs Checkboxes
function renderClubs() {
  DOM.clubsContainer.innerHTML = '';
  MIDIS_DATA.clubs.forEach(club => {
    const label = document.createElement('label');
    label.className = 'toggle-card';
    const isChecked = state.selectedClubs.includes(club.id);
    label.innerHTML = `
      <input type="checkbox" data-club="${club.id}" ${isChecked ? 'checked' : ''}>
      <span class="toggle-custom"></span>
      <span class="toggle-content">
        <strong>${club.name}</strong>
        <small>${club.desc}</small>
      </span>
    `;
    const input = label.querySelector('input');
    input.addEventListener('change', () => {
      if (input.checked) {
        if (!state.selectedClubs.includes(club.id)) state.selectedClubs.push(club.id);
      } else {
        state.selectedClubs = state.selectedClubs.filter(id => id !== club.id);
      }
      updateLivePrompt();
    });
    DOM.clubsContainer.appendChild(label);
  });
}

// Apply Preset
function applyPreset(preset) {
  state.scenarioId = preset.scenarioId;
  state.educationLevel = preset.level;
  state.departmentId = preset.deptId;
  state.specializationId = preset.specId;
  state.course = preset.course;
  state.studyForm = preset.studyForm;
  state.skillLevel = preset.skillLevel;
  state.selectedSkills = [...preset.skills];
  state.selectedHobbies = [...preset.hobbies];
  state.perceptionFormat = preset.format;
  state.taskInput = preset.task;
  state.fearsInput = preset.fears;
  state.deadlineInput = preset.deadline;
  state.constraintsInput = preset.constraints;
  state.selectedClubs = [...preset.clubs];

  // Update DOM UI elements
  // Level
  document.querySelectorAll('#level-selector .segment-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.level === state.educationLevel);
  });
  renderDepartments();
  renderSpecializations();

  // Scenarios
  document.querySelectorAll('.scenario-card').forEach(c => {
    c.classList.toggle('active', c.dataset.id === state.scenarioId);
  });
  const currentSc = MIDIS_DATA.scenarios.find(s => s.id === state.scenarioId);
  if (currentSc) updateScenarioLabels(currentSc);

  // Form selects
  DOM.selectCourse.value = state.course;
  DOM.selectStudyForm.value = state.studyForm;
  DOM.selectSkillLevel.value = state.skillLevel;

  // Format cards
  document.querySelectorAll('.format-card').forEach(f => {
    f.classList.toggle('active', f.dataset.format === state.perceptionFormat);
  });

  // Inputs
  DOM.taskInput.value = state.taskInput;
  DOM.fearsInput.value = state.fearsInput;
  DOM.deadlineInput.value = state.deadlineInput;
  DOM.constraintsInput.value = state.constraintsInput;

  // Re-render chips & clubs
  renderChipsCloud(DOM.stackChipsContainer, Array.from(new Set([...MIDIS_DATA.defaultStacks, ...state.selectedSkills])), state.selectedSkills, 'skill');
  renderChipsCloud(DOM.hobbiesChipsContainer, Array.from(new Set([...MIDIS_DATA.defaultHobbies, ...state.selectedHobbies])), state.selectedHobbies, 'hobby');
  renderClubs();
  updateCounters();

  // Active preset chip highlight
  document.querySelectorAll('.preset-chip-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.includes(preset.name));
  });

  updateLivePrompt();
  showToast(`Загружен пресет: ${preset.name}`);
}

// ==========================================
// 5. PROMPT GENERATOR LOGIC
// ==========================================

function generatePromptText() {
  const scenario = MIDIS_DATA.scenarios.find(s => s.id === state.scenarioId) || MIDIS_DATA.scenarios[0];
  const spec = MIDIS_DATA.specializations.find(s => s.id === state.specializationId);
  const specName = spec ? spec.name : 'Специальность МИДиС';

  const levelLabels = {
    college: 'СПО (Колледж МИДиС)',
    bachelor: 'Высшее образование (Бакалавриат МИДиС)',
    master: 'Высшее образование (Магистратура МИДиС)'
  };

  const studyFormLabels = {
    'full-time': 'Очная форма',
    'part-time': 'Очно-заочная форма',
    'extramural': 'Заочная форма'
  };

  const skillLevelLabels = {
    beginner: 'Новичок (1 курс / погружение в специальность)',
    junior: 'Junior (знаю базу, делаю первые практические проекты)',
    'junior-plus': 'Junior+ / Pre-Middle (уверенно владею инструментами)',
    freelancer: 'Практик / Фрилансер (совмещаю учебу с коммерческими заказами)'
  };

  const perceptionFormatDescriptions = {
    'structured-lists': 'Структурированные чек-листы: без длинных предисловий и канцелярита, емкие буллеты, готовые к внедрению.',
    'step-by-step': 'Пошаговый алгоритм: четкая последовательность 1-2-3 с контрольными точками и критериями готовности каждого этапа.',
    'analogies': 'Объяснение через яркие аналогии: проводи параллели с видеоиграми, поп-культурой или бытом для наглядности.',
    'strict-code': 'Строгий инженерный стиль: акцент на индустриальные стандарты, паттерны проектирования, чистую терминологию и код.',
    'mentor-dialogue': 'Тон эмпатичного наставника: общайся со мной на равных, подбадривай, задавай развивающие вопросы.'
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
    activeResources.push('- Обучение работе с ИИ и нейросетями по профилю (промпт-инжиниринг, ИИ-агенты) как базовый предмет');
  }
  if (state.resources.newSpecialistWellness) {
    activeResources.push('- Блок развития «Специалиста нового типа»: бассейн/спорт МИДиС, управление физической энергией, эмоциональный интеллект');
  }
  if (state.resources.secondDiploma) {
    activeResources.push('- Бесплатные элективные курсы и возможность получить второй диплом о профпереподготовке к выпуску');
  }
  if (state.resources.hackathonsAndEvents) {
    activeResources.push('- Участие в хакатонах, профессиональных конкурсах, выставках и стартап-питчах');
  }

  // Clubs
  const clubNames = state.selectedClubs
    .map(cId => MIDIS_DATA.clubs.find(c => c.id === cId)?.name)
    .filter(Boolean);

  let prompt = `### РОЛЬ
${scenario.systemRole}

---

### КОНТЕКСТ ОБО МНЕ (СТУДЕНТ МИДиС)
- Учебное заведение: Международный институт дизайна и сервиса (МИДиС, г. Челябинск)
- Уровень образования: ${levelLabels[state.educationLevel]}
- Направление / Специальность: ${specName}
- Курс: ${state.course} курс (впереди обучения: примерно ${yearsLeft} ${yearsLeft === 1 ? 'год' : yearsLeft < 5 ? 'года' : 'лет'})
- Форма обучения: ${studyFormLabels[state.studyForm]}
- Текущий уровень практических навыков: ${skillLevelLabels[state.skillLevel]}
${state.selectedSkills.length > 0 ? `- Мой стек и используемый софт: ${state.selectedSkills.join(', ')}` : ''}
${state.selectedHobbies.length > 0 ? `- Мои увлечения и личные сильные стороны: ${state.selectedHobbies.join(', ')}` : ''}
${clubNames.length > 0 ? `- Внеучебная активность в МИДиС: ${clubNames.join(', ')}` : ''}
${state.fearsInput.trim() ? `- Мои сомнения, сложности и страхи (честно): "${state.fearsInput.trim()}"` : ''}

---

### РЕСУРСЫ И ВОЗМОЖНОСТИ МОЕГО ИНСТИТУТА (МИДиС)
${activeResources.length > 0 ? activeResources.join('\n') : '- Стандартные академические ресурсы института'}

---

### ЗАДАЧА
${scenario.goalSummary}
${state.taskInput.trim() ? `\nМой персональный запрос / вводные:\n«${state.taskInput.trim()}»` : ''}
${state.deadlineInput.trim() ? `\nДедлайн / временные рамки: ${state.deadlineInput.trim()}` : ''}
${state.constraintsInput.trim() ? `\nДополнительные ограничения: ${state.constraintsInput.trim()}` : ''}

---

### ФОРМАТ ВОСПРИЯТИЯ И СТИЛЬ
${perceptionFormatDescriptions[state.perceptionFormat]}

---

### ТРЕБОВАНИЯ К СТРУКТУРЕ ОТВЕТА
`;

  // Scenario specific instructions
  switch (state.scenarioId) {
    case 'iot-roadmap':
      prompt += `1. Разбей ориентировочный план по оставшимся годам/семестрам обучения ([${yearsLeft} года/лет]).
2. По каждому году обучения укажи:
   - 2-3 конкретные профессиональные цели по специальности (${specName}) с нарастающей сложностью;
   - 1-2 надпрофессиональные цели (ИИ, управление проектами, физическая энергия, софт-скиллы);
   - конкретные действия внутри института МИДиС (в каких партнерских проектах, элективах, хакатонах или стажировках участвовать);
   - 1 «точку сверки» — контрольный вопрос самому себе, чтобы проверить, туда ли я иду.
3. В конце добавь список из 5–7 конкретных первых шагов на ближайший месяц.
4. Если в моих ответах есть сомнения — включи безопасные «пробы пера» (разговор с практиком, мини-проект).`;
      break;

    case 'portfolio-pet-projects':
      prompt += `1. Предложи 3–4 уникальные концепции проектов на стыке моей специальности (${specName}) и моих увлечений (${state.selectedHobbies.join(', ') || 'креатив и технологии'}).
2. Для каждой идеи распиши:
   - Проблему пользователей/бизнеса и формулировку ценности;
   - Целевую аудиторию (ЦА);
   - Минимальный функционал (MVP) и рекомендуемый стек (${state.selectedSkills.join(', ') || 'базовый софт'});
   - Главную "фичу-крючок" (Wow-effect), которая зацепит арт-директора или тимлида в портфолио;
   - План реализации на 3-4 недели.`;
      break;

    case 'exam-defense-prep':
      prompt += `1. Объясни ключевую суть темы максимально доходчиво (методом Фейнмана), связав теорию с практикой.
2. Составь список из 8–10 самых вероятных и каверзных вопросов экзаменационной комиссии МИДиС на защите.
3. Для каждого вопроса дай:
   - В чем истинный подвох вопроса комиссии;
   - Идеальную формулу уверенного ответа на 40–60 секунд с опорой на термины.
4. Добавь 3 экспресс-совета по ораторской подаче и борьбе с волнением.`;
      break;

    case 'case-presentation':
      prompt += `1. Сформируй каркас презентации / кейса (для Behance/Dprofile/GitHub):
   - Заголовок и цепляющий подзаголовок с пользой или цифрами;
   - Контекст задачи и вводные ограничения;
   - Этап исследования и поиск ключевых инсайтов;
   - Процесс проектирования (черновики, неудачные итерации и почему они отброшены);
   - Финальное решение (демонстрация экранов/ассетов/кода);
   - Результаты, метрики и выводы автора.
2. Напиши текст для ключевых слайдов на русском и краткие емкие фразы на английском.`;
      break;

    case 'internship-cover-letter':
      prompt += `1. Сформулируй мое емкое позиционирование (Elevator Pitch на 3 предложения), выгодно подающее мой учебный бэкграунд в МИДиС.
2. Напиши персональное, живое сопроводительное письмо (Cover Letter) без штампов ("я коммуникабельный и стрессоустойчивый"), делающее акцент на практических кейсах и желании расти.
3. Составь список из 3–5 вопросов работодателю на интервью, чтобы показать зрелость.`;
      break;

    case 'troubleshooting-review':
      prompt += `1. Проведи объективный экспертный разбор предложенного решения.
2. Выдели 3 главных достоинства.
3. Укажи 3–5 критических проблем или узких мест (по UX, архитектуре кода, читаемости, визуальному шуму или логике).
4. Дай четкие рекомендации "Как исправить прямо сейчас" с конкретными примерами макета/кода.`;
      break;

    case 'time-management-balance':
      prompt += `1. Составь недельный спринт-график (понедельник — воскресенье) с учетом пар, блоков глубокой работы (Deep Work), отдыха и бассейна/спорта.
2. Внедри технику преодоления прокрастинации, подходящую под мой профиль.
3. Сформулируй 3 правила защиты личных границ и предотвращения студенческого выгорания.`;
      break;

    case 'design-concept-brainstorm':
      prompt += `1. Предложи 3 принципиально разных концептуальных направления.
2. Для каждого направления опиши:
   - Смысловую метафору и настроение;
   - Цветовую палитру (HEX-коды и роль цветов);
   - Типографическую пару (акцидентный + наборный шрифт);
   - 3 конкретных референса из мирового искусства, кино или архитектуры.`;
      break;

    case 'research-coursework-helper':
      prompt += `1. Сформулируй научный аппарат исследования:
   - Актуальность темы в современных реалиях;
   - Объект и предмет исследования;
   - Цель и 4–5 конкретных задач;
   - Рабочую гипотезу.
2. Составь развернутый план-оглавление работы (Введение, Глава 1 Теория, Глава 2 Практическая часть на базе МИДиС, Заключение).
3. Порекомендуй 3 направления для сбора эмпирических данных или проведения CustDev/опроса.`;
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
- Пиши простым живым языком, без канцелярита и воды.
- Не выдумывай названия сторонних курсов или партнеров, которых я не указал — используй только ресурсы МИДиС и логику профессионального роста.`;

  return prompt;
}

// Update Live Preview
function updateLivePrompt() {
  const promptText = generatePromptText();
  DOM.promptOutput.textContent = promptText;

  // Stats
  const words = promptText.trim() ? promptText.trim().split(/\s+/).length : 0;
  const tokens = Math.round(promptText.length / 3.4);
  DOM.statWords.textContent = `${words} слов`;
  DOM.statTokens.textContent = `~${tokens} токенов`;
  DOM.mobileStatWords.textContent = `${words} слов`;

  // Update Direct Launch Links
  const encoded = encodeURIComponent(promptText);
  DOM.linkChatgpt.href = `https://chatgpt.com/?q=${encoded}`;
  DOM.linkClaude.href = `https://claude.ai/new?q=${encoded}`;
  DOM.linkDeepseek.href = `https://chat.deepseek.com/`;
}

// ==========================================
// 6. EVENT LISTENERS
// ==========================================

function attachEventListeners() {
  // Education Level Segments
  DOM.levelSelector.querySelectorAll('.segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.levelSelector.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.educationLevel = btn.dataset.level;
      renderDepartments();
      renderSpecializations();
      updateLivePrompt();
    });
  });

  // Department Select
  DOM.selectDept.addEventListener('change', (e) => {
    state.departmentId = e.target.value;
    renderSpecializations();
    updateLivePrompt();
  });

  // Specialization Select
  DOM.selectSpec.addEventListener('change', (e) => {
    state.specializationId = e.target.value;
    // Auto-suggest stack for chosen spec
    const spec = MIDIS_DATA.specializations.find(s => s.id === state.specializationId);
    if (spec && spec.defaultStack) {
      spec.defaultStack.forEach(s => {
        if (!state.selectedSkills.includes(s)) state.selectedSkills.push(s);
      });
      renderChipsCloud(DOM.stackChipsContainer, Array.from(new Set([...MIDIS_DATA.defaultStacks, ...state.selectedSkills])), state.selectedSkills, 'skill');
      updateCounters();
    }
    updateLivePrompt();
  });

  // Course, Form, Skill Level
  DOM.selectCourse.addEventListener('change', (e) => { state.course = e.target.value; updateLivePrompt(); });
  DOM.selectStudyForm.addEventListener('change', (e) => { state.studyForm = e.target.value; updateLivePrompt(); });
  DOM.selectSkillLevel.addEventListener('change', (e) => { state.skillLevel = e.target.value; updateLivePrompt(); });

  // Format of perception
  DOM.formatSelector.querySelectorAll('.format-card').forEach(card => {
    card.addEventListener('click', () => {
      DOM.formatSelector.querySelectorAll('.format-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.perceptionFormat = card.dataset.format;
      updateLivePrompt();
    });
  });

  // Inputs
  DOM.taskInput.addEventListener('input', (e) => { state.taskInput = e.target.value; updateLivePrompt(); });
  DOM.fearsInput.addEventListener('input', (e) => { state.fearsInput = e.target.value; updateLivePrompt(); });
  DOM.deadlineInput.addEventListener('input', (e) => { state.deadlineInput = e.target.value; updateLivePrompt(); });
  DOM.constraintsInput.addEventListener('input', (e) => { state.constraintsInput = e.target.value; updateLivePrompt(); });

  // Add custom stack tag
  const addCustomStack = () => {
    const val = DOM.inputCustomStack.value.trim();
    if (val && !state.selectedSkills.includes(val)) {
      state.selectedSkills.push(val);
      renderChipsCloud(DOM.stackChipsContainer, Array.from(new Set([...MIDIS_DATA.defaultStacks, ...state.selectedSkills])), state.selectedSkills, 'skill');
      DOM.inputCustomStack.value = '';
      updateCounters();
      updateLivePrompt();
    }
  };
  DOM.btnAddStack.addEventListener('click', addCustomStack);
  DOM.inputCustomStack.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomStack(); } });

  // Add custom hobby tag
  const addCustomHobby = () => {
    const val = DOM.inputCustomHobby.value.trim();
    if (val && !state.selectedHobbies.includes(val)) {
      state.selectedHobbies.push(val);
      renderChipsCloud(DOM.hobbiesChipsContainer, Array.from(new Set([...MIDIS_DATA.defaultHobbies, ...state.selectedHobbies])), state.selectedHobbies, 'hobby');
      DOM.inputCustomHobby.value = '';
      updateCounters();
      updateLivePrompt();
    }
  };
  DOM.btnAddHobby.addEventListener('click', addCustomHobby);
  DOM.inputCustomHobby.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomHobby(); } });

  // Resources checkboxes
  DOM.resourcesContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.id.replace('res-', '');
      if (key in state.resources) {
        state.resources[key] = cb.checked;
        updateLivePrompt();
      }
    });
  });

  // Copy Prompt
  const handleCopy = () => {
    const text = DOM.promptOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      DOM.copyBtnText.textContent = 'Скопировано в буфер!';
      DOM.btnCopyPrompt.style.backgroundColor = '#16a34a';
      showToast('✅ Промпт успешно скопирован в буфер обмена!');
      setTimeout(() => {
        DOM.copyBtnText.textContent = 'Скопировать промпт';
        DOM.btnCopyPrompt.style.backgroundColor = '';
      }, 2500);
    }).catch(() => {
      showToast('Не удалось скопировать. Пожалуйста, выделите текст вручную.');
    });
  };

  DOM.btnCopyPrompt.addEventListener('click', handleCopy);
  DOM.btnMobileCopyPrompt.addEventListener('click', handleCopy);

  // Mobile scroll to preview
  DOM.btnMobileViewPrompt.addEventListener('click', () => {
    DOM.promptOutput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    DOM.promptOutput.focus();
  });

  // Download Markdown file
  DOM.btnDownloadMd.addEventListener('click', () => {
    const content = DOM.promptOutput.textContent;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `midis_prompt_${state.scenarioId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Файл midis_prompt.md сохранен!');
  });

  // Reset form
  DOM.btnResetForm.addEventListener('click', () => {
    if (confirm('Сбросить все поля конструктора к значениям по умолчанию?')) {
      applyPreset(MIDIS_DATA.presets[0]);
      showToast('Поля сброшены к начальным');
    }
  });

  // Guide Modal
  const openModal = () => DOM.guideModal.classList.add('open');
  const closeModal = () => DOM.guideModal.classList.remove('open');

  DOM.btnOpenGuide.addEventListener('click', openModal);
  DOM.btnCloseGuide.addEventListener('click', closeModal);
  DOM.btnGuideOk.addEventListener('click', closeModal);
  DOM.guideModal.addEventListener('click', (e) => {
    if (e.target === DOM.guideModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.guideModal.classList.contains('open')) closeModal();
  });
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">✓</span> <span>${message}</span>`;
  DOM.toastBox.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
