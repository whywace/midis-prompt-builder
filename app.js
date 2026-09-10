/**
 * MIDIS JARVIS AI PROMPT ENGINE v3.0
 * Complete Database of all MIDIS Majors, Sub-profiles and 14 Scenarios
 * Author: Melnikov Semen
 * Official Website: midis.ru
 */

// ==========================================================================
// 1. DATA DICTIONARIES (ALL MIDIS MAJORS & SUB-PROFILES)
// ==========================================================================

const MIDIS_DATA = {
  // 14 Specialized Scenarios
  scenarios: [
    {
      id: 'iot-roadmap',
      category: 'study',
      icon: '🧭',
      badge: 'МЕТОДИКА МИДиС',
      title: 'Индивидуальный трек обучения (ИОТ)',
      desc: 'Пошаговый план развития по семестрам с учетом проектного обучения, ОУП и баланса жизни.',
      systemRole: 'Ты — опытный карьерный наставник и коуч по личностному развитию, эксперт по методике индивидуальных образовательных траекторий (ИОТ) Международного института дизайна и сервиса (МИДиС).',
      goalSummary: 'Составить глубокий и честный ориентировочный индивидуальный план развития на весь оставшийся срок обучения по курсам/семестрам (профессиональные навыки, надпрофессиональные софт-скиллы, проверка правильности выбора профессии, конкретные первые шаги).',
      taskLabel: 'Твои текущие сомнения, приоритеты или цели на семестр:',
      quickTemplates: [
        'Как с 1 курса совместить учебу, хакатоны и проектную работу с бизнесом в FDE Lab?',
        'Хочу сфокусироваться на профильных навыках, но боюсь перегрузки и первой сессии.',
        'Сомневаюсь, правильно ли выбрал специальность — как безопасно протестировать профессию?'
      ]
    },
    {
      id: 'portfolio-pet-projects',
      category: 'creation',
      icon: '✨',
      badge: 'ХИТ ДЛЯ ПОРТФОЛИО',
      title: 'Идеи для пет-проектов и портфолио',
      desc: 'Поиск нестандартных тем на стыке специальности и личных хобби с Wow-эффектом.',
      systemRole: 'Ты — креативный директор и лид продуктовой разработки с опытом отбора сильных джуниор-портфолио на Behance, Dprofile и GitHub.',
      goalSummary: 'Сгенерировать 3–4 проработанные концепции пет-проектов с четким описанием проблемы, ЦА, необходимого стека инструментов и wow-эффекта для работодателей.',
      taskLabel: 'Какую тему, проблему или хобби хочется раскрыть в проекте?',
      quickTemplates: [
        'Идея пет-проекта на стыке моей специальности и локальной уральской культуры / стритфуда.',
        'Концепт интерактивного мобильного сервиса с геймификацией отзывов и комьюнити.',
        'Проект на стыке 3D-графики, генеративного AI и моушн-дизайна.'
      ]
    },
    {
      id: 'exam-defense-prep',
      category: 'study',
      icon: '🛡️',
      badge: 'АНТИСТРЕСС',
      title: 'Подготовка к защите и сессии',
      desc: 'Разбор сложной темы методом Фейнмана + 8-10 каверзных вопросов экзаменационной комиссии МИДиС.',
      systemRole: 'Ты — академический наставник и строгий, но справедливый член государственной экзаменационной комиссии (ГЭК) МИДиС.',
      goalSummary: 'Разложить сложную тему или курсовой проект на понятные смысловые блоки и подготовить чек-лист уверенных ответов на каверзные вопросы комиссии на защите.',
      taskLabel: 'Тема проекта, сложный вопрос к защите или дисциплина:',
      quickTemplates: [
        'Защита курсового проекта по проектированию дизайн-системы сервиса доставки.',
        'Разбор сложного теоретического вопроса простыми словами методом Фейнмана.',
        'Подготовка к 7-минутной защите проекта перед заказчиком из бизнеса.'
      ]
    },
    {
      id: 'case-presentation',
      category: 'creation',
      icon: '📐',
      badge: 'BEHANCE / GITHUB',
      title: 'Оформление кейса и презентации',
      desc: 'Покадровый сторителлинг: от исследований до визуала, бизнес-метрик и выводов автора.',
      systemRole: 'Ты — арт-директор и специалист по сторителлингу продуктовых и дизайнерских кейсов для топовых агентств и международных площадок.',
      goalSummary: 'Сформировать покадровый сценарий оформления кейса: структура экранов, акценты на трудностях и их преодолении, формулировка результатов.',
      taskLabel: 'О каком проекте пишем кейс и для какой площадки?',
      quickTemplates: [
        'Лонгрид на Behance: айдентика, упаковка и мобильное приложение для бренда одежды.',
        'Кейс разработки веб-сервиса на GitHub: архитектура, трудности и бенчмарки.',
        'Структура финальной презентации дипломного проекта для комиссии МИДиС.'
      ]
    },
    {
      id: 'internship-cover-letter',
      category: 'career',
      icon: '💼',
      badge: 'ТРУДОУСТРОЙСТВО',
      title: 'Поиск стажировок и фриланс-старт',
      desc: 'Составление продающего сопроводительного письма и позиционирования студента без клише.',
      systemRole: 'Ты — IT/Creative HR-директор и карьерный консультант, отбирающий стажеров и джунов в прогрессивные компании и дизайн-агентства.',
      goalSummary: 'Сформулировать яркое позиционирование (Elevator Pitch), структуру резюме и убедительное персонализированное сопроводительное письмо под вакансию или фриланс.',
      taskLabel: 'Желаемая позиция, компания или сфера для фриланса:',
      quickTemplates: [
        'Отклик на оплачиваемую стажировку Junior-дизайнера без коммерческого опыта в штате.',
        'Позиционирование фрилансера: как студенту находить первые реальные заказы.',
        'Сопроводительное письмо на стажировку в IT-отдел банка или ритейлера.'
      ]
    },
    {
      id: 'troubleshooting-review',
      category: 'skills',
      icon: '🔍',
      badge: 'ЭКСПЕРТИЗА',
      title: 'Код-ревью и дизайн-критика',
      desc: 'Объективный аудит решения: 3 достоинства, 3-5 критических ошибок и пошаговые исправления.',
      systemRole: 'Ты — Senior-эксперт (Lead Architect & Principal Designer), проводящий детальное, конструктивное и развивающее код-ревью и дизайн-критику.',
      goalSummary: 'Проанализировать представленный макет или кусок кода, выделить критические ошибки по UX, архитектуре и типографике, дать пошаговый план оптимизации.',
      taskLabel: 'Что именно нужно отрецензировать? (опишите макет или логику кода):',
      quickTemplates: [
        'Аудит UX/UI мобильного чекаута интернет-магазина, где пользователи бросают корзину.',
        'Ревью фронтенд-компонента на React: читаемость, доступность (a11y) и оптимизация.',
        'Критика типографики и иерархии в многостраничном интерфейсе веб-сервиса.'
      ]
    },
    {
      id: 'time-management-balance',
      category: 'study',
      icon: '⏳',
      badge: 'БЕЗ ВЫГОРАНИЯ',
      title: 'Тайм-менеджмент и баланс жизни',
      desc: 'Недельный спринт совмещения пар в МИДиС, дедлайнов, спорта в бассейне и отдыха.',
      systemRole: 'Ты — ментор по продуктивности и коуч здорового тайм-менеджмента для студентов креативных и IT-профессий.',
      goalSummary: 'Разработать сбалансированный недельный спринт без перегрузок с учетом расписания пар, тренировок в бассейне МИДиС, дедлайнов и качественного отдыха.',
      taskLabel: 'В чем главная сложность с расписанием и концентрацией?',
      quickTemplates: [
        'Навалилось 3 проекта к сессии, прокрастинирую в рилсах и сплю по 5 часов.',
        'Как совмещать очную учебу в институте и 15 часов коммерческого фриланса в неделю?',
        'План внедрения блоков глубокой работы (Deep Work) без студенческого выгорания.'
      ]
    },
    {
      id: 'design-concept-brainstorm',
      category: 'creation',
      icon: '💡',
      badge: 'КРЕАТИВНЫЙ РЫВОК',
      title: 'Дизайн-концепты и брейншторм',
      desc: '3 контрастных стилистических направления: метафоры, палитры, шрифты и референсы.',
      systemRole: 'Ты — визионерский концепт-дизайнер и креативный фасилитатор, мастер генерации неожиданных визуальных ассоциаций и нестандартных стилей.',
      goalSummary: 'Предложить 3 принципиально разных концептуальных направления проекта (смысловая метафора, палитра с HEX, типографическая пара, референсы из мирового искусства).',
      taskLabel: 'Тема проекта, продукт или настроение, которое нужно передать:',
      quickTemplates: [
        'Концепция молодежного фестиваля уральской идентичности и цифрового медиа-арта.',
        'Брендинг и интерфейс для кофейни третьей волны с крафтовым минимализмом.',
        'Визуальный стиль финтех-сервиса нового поколения для зумеров.'
      ]
    },
    {
      id: 'research-coursework-helper',
      category: 'study',
      icon: '📚',
      badge: 'ГОСТ & НАУКА',
      title: 'Курсовая и дипломная работа (ВКР)',
      desc: 'Формулирование актуальности, объекта, предмета, гипотез и структуры на базе МИДиС.',
      systemRole: 'Ты — научный руководитель и эксперт по академическим исследованиям в сфере дизайна, IT и сервисной экономики.',
      goalSummary: 'Сформулировать научный аппарат исследования (актуальность, объект, предмет, цель, гипотеза) и составить развернутое оглавление практической части работы.',
      taskLabel: 'Предварительная тема курсовой работы или диплома:',
      quickTemplates: [
        'Применение генеративных нейросетей в процессе проектирования интерфейсов UX/UI.',
        'Особенности продвижения региональных брендов гостеприимства в цифровой среде.',
        'Разработка архитектуры масштабируемого веб-сервиса на современных фреймворках.'
      ]
    },
    {
      id: 'interview-simulator',
      category: 'career',
      icon: '🎯',
      badge: 'ИНТЕРАКТИВ',
      title: 'Симулятор собеседования (Mock Interview)',
      desc: 'Режим живого диалога с тимлидом: задает по 1 вопросу, оценивает ответ по 10 баллам и тренирует.',
      systemRole: 'Ты — ведущий тимлид и нанимающий менеджер в технологической компании. Ты проводишь реалистичное интерактивное собеседование на позицию Junior-специалиста.',
      goalSummary: 'Провести интерактивное тренировочное собеседование в режиме живого диалога (задавать ровно по одному вопросу за раз, оценивать глубину ответа и давать фидбек).',
      taskLabel: 'На какую позицию и уровень тренируем собеседование?',
      quickTemplates: [
        'Собеседование на позицию Junior UI/UX Designer в продуктовую IT-компанию.',
        'Интервью на позицию Junior Frontend Developer (React / JavaScript).',
        'Собеседование на должность ассистента управляющего отелем / продюсера событий.'
      ]
    },
    {
      id: 'hackathon-pitch',
      category: 'creation',
      icon: '🚀',
      badge: 'СТАРТАП-ПИТЧ',
      title: 'Хакатоны и стартап-питч перед жюри',
      desc: 'Упаковка идеи за 48 часов: ценностное предложение, MVP, питч-дек на 3 минуты и каверзные вопросы инвесторов.',
      systemRole: 'Ты — стартап-трекер, венчурный ментор и опытный победитель федеральных хакатонов (Цифровой прорыв, Хакатоны ВКонтакте и Яндекса).',
      goalSummary: 'Сформировать структуру победного 3-минутного питча проекта (проблема, решение, рынок, MVP, стек МИДиС, юнит-экономика и ответы на каверзные вопросы жюри).',
      taskLabel: 'Тема хакатона, идея сервиса или прототипа:',
      quickTemplates: [
        'Питч сервиса на основе AI-агентов для автоматизации локального челябинского бизнеса.',
        'Мобильное приложение для студентов МИДиС с геймификацией внеучебной активности.',
        'Упаковка хакатон-проекта за 48 часов: структура 10 слайдов презентации.'
      ]
    },
    {
      id: 'ai-prompt-engineer',
      category: 'skills',
      icon: '🤖',
      badge: 'AI-ИНЖИНИРИНГ',
      title: 'Промпт-инженер для Midjourney, Flux & LLM',
      desc: 'Генерация профессиональных промптов для создания арт-концептов, текстур, UI и 3D-ассетов.',
      systemRole: 'Ты — сеньор-промпт-инженер и арт-директор генеративного ИИ, эксперт по параметрам Midjourney v6, Flux, Stable Diffusion и Claude 3.5 Sonnet.',
      goalSummary: 'Сгенерировать серию точных, стилистически выверенных промптов на английском языке с правильными весами, модификаторами освещения, камер и стилистики.',
      taskLabel: 'Какой визуальный ассет, сцену или концепт нужно сгенерировать?',
      quickTemplates: [
        'Промпты для генерации изометрической 3D-комнаты в стиле киберпанк / лоу-поли.',
        'Генерация фотореалистичных мудбордов интерьера кофейни в теплом минимализме.',
        'Серия промптов для генерации современных UI-экранов мобильного приложения.'
      ]
    },
    {
      id: 'team-conflict-resolver',
      category: 'skills',
      icon: '🤝',
      badge: 'СОФТ-СКИЛЛЫ',
      title: 'Командная работа и фасилитация в проекте',
      desc: 'Решение разногласий с тиммейтами, распределение ролей в FDE Lab и защита дедлайнов.',
      systemRole: 'Ты — эмпатичный аджайл-коуч, фасилитатор проектных команд и эксперт по софт-скиллам проектного обучения МИДиС.',
      goalSummary: 'Дать практический алгоритм разрешения конфликта в студенческой команде, перераспределения задач и экологичной коммуникации без срыва сроков.',
      taskLabel: 'Какая конфликтная ситуация или сложность возникла в команде?',
      quickTemplates: [
        'Тиммейт пропадает и не сдает свою часть дизайна / кода за 3 дня до сдачи проекта.',
        'В команде спорят о концепции проекта и никто не готов идти на компромисс.',
        'Как экологично распределить роли и зафиксировать договоренности в FDE Lab?'
      ]
    },
    {
      id: 'english-pro',
      category: 'career',
      icon: '🌐',
      badge: 'АНГЛИЙСКИЙ',
      title: 'Профессиональный английский для специальности',
      desc: 'Индустриальный вокабуляр, разбор дизайн-систем, термины IT и международный нетворкинг.',
      systemRole: 'Ты — преподаватель делового и профессионального английского языка (ESP) для специалистов в сфере дизайна, IT, гостеприимства и бизнеса.',
      goalSummary: 'Составить подборку из 20 ключевых профильных терминов и фраз на английском с примерами из реальной практики и сценарием диалога с зарубежным клиентом.',
      taskLabel: 'Какая тема в английском для специальности сейчас актуальна?',
      quickTemplates: [
        'Английский для продуктового дизайнера: термины UI/UX, проведение дизайн-критики.',
        'IT-английский: формулировки задач в Jira, пулреквесты и стендапы с разработчиками.',
        'Деловой английский для отельного и ресторанного менеджмента: решение жалоб гостей.'
      ]
    }
  ],

  // CLUSTERS (Кафедры / Отрасли)
  clusters: [
    { id: 'all', name: 'Все отрасли' },
    { id: 'design', name: '🎨 Дизайн и Мультимедиа' },
    { id: 'it', name: '💻 IT и Программирование' },
    { id: 'service', name: '🛎️ Сервис, Отели и Туризм' },
    { id: 'business', name: '📊 Бизнес, Банки и Маркетинг' },
    { id: 'law-ling', name: '⚖️ Право и Лингвистика' }
  ],

  // ALL OFFICIAL MIDIS MAJORS & SUB-PROFILES (WITH REAL CODES)
  allSpecializations: [
    // ================= КОЛЛЕДЖ (СПО) =================
    // Дизайн СПО (54.02.01)
    {
      id: 'col-web-dev',
      code: '54.02.01',
      level: 'college',
      cluster: 'design',
      name: 'Веб-дизайн и разработка приложений (Колледж)',
      desc: 'Интерфейсы, сайты, лендинги, Figma, фронтенд на HTML/CSS/JS',
      defaultStack: ['Figma', 'HTML/CSS', 'JavaScript', 'Tilda', 'Notion']
    },
    {
      id: 'col-3d-games',
      code: '54.02.01',
      level: 'college',
      cluster: 'design',
      name: '3Д-моделирование и игровая графика (Колледж)',
      desc: 'Моделирование низко- и высокополигональных моделей, текстурирование, Unity',
      defaultStack: ['Blender', 'Photoshop', 'Unity', 'ZBrush', 'Substance Painter']
    },
    {
      id: 'col-graphic',
      code: '54.02.01',
      level: 'college',
      cluster: 'design',
      name: 'Графический дизайн (Колледж)',
      desc: 'Айдентика, полиграфия, брендинг, логотипы, фирменный стиль',
      defaultStack: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'InDesign']
    },
    {
      id: 'col-fashion',
      code: '54.02.01',
      level: 'college',
      cluster: 'design',
      name: 'Дизайн и моделирование одежды (Колледж)',
      desc: 'Конструирование одежды, эскизы, fashion-иллюстрация, лекала',
      defaultStack: ['CLO 3D', 'Adobe Illustrator', 'Photoshop', 'Moodboard']
    },
    {
      id: 'col-anim',
      code: '54.02.01',
      level: 'college',
      cluster: 'design',
      name: 'Цифровая анимация и компьютерная графика (Колледж)',
      desc: '2D/3D анимация, видеомонтаж, эффекты, анимационные ролики',
      defaultStack: ['After Effects', 'Blender', 'Premiere Pro', 'Photoshop']
    },
    {
      id: 'col-interior',
      code: '54.02.01',
      level: 'college',
      cluster: 'design',
      name: 'Дизайн интерьера (Колледж)',
      desc: 'Планировки, чертежи, 3D-визуализация жилых и общественных пространств',
      defaultStack: ['AutoCAD', '3ds Max', 'Photoshop', 'SketchUp']
    },
    // IT СПО (09.02.11)
    {
      id: 'col-it-web-mob',
      code: '09.02.11',
      level: 'college',
      cluster: 'it',
      name: 'Разработка веб и мобильных приложений (Колледж)',
      desc: 'Frontend/Backend, базы данных, клиент-серверные сервисы',
      defaultStack: ['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'PostgreSQL', 'Git']
    },
    {
      id: 'col-it-software',
      code: '09.02.11',
      level: 'college',
      cluster: 'it',
      name: 'Разработка и управление ПО (Колледж)',
      desc: 'Алгоритмы, прикладное программирование на Python и C#, базы данных',
      defaultStack: ['Python', 'C#', 'SQL', 'Git & GitHub', 'Visual Studio']
    },
    // Торговое дело СПО (38.02.08)
    {
      id: 'col-trade-marketing',
      code: '38.02.08',
      level: 'college',
      cluster: 'business',
      name: 'Предпринимательство и интернет-маркетинг (Колледж)',
      desc: 'E-commerce, воронки продаж, SMM, маркетплейсы, таргет',
      defaultStack: ['Маркетплейсы', 'VK Ads', 'Excel / Таблицы', 'Tilda', 'Notion']
    },
    // Туризм и гостеприимство СПО (43.02.16)
    {
      id: 'col-tourism-hotel',
      code: '43.02.16',
      level: 'college',
      cluster: 'service',
      name: 'Гостиничный сервис и туризм (Колледж)',
      desc: 'Управление номерным фондом, стандарты гостеприимства, сервис',
      defaultStack: ['Excel / Таблицы', 'Системы бронирования', 'Service Design', 'Деловой этикет']
    },
    {
      id: 'col-hotel-admin',
      code: '43.02.16',
      level: 'college',
      cluster: 'service',
      name: 'Администрирование отеля и экскурсионные услуги (Колледж)',
      desc: 'Организация туров, экскурсионные маршруты, прием гостей',
      defaultStack: ['Excel / Таблицы', 'Opera PMS', 'CRM', 'Презентации']
    },
    // Банковское дело СПО (38.02.07)
    {
      id: 'col-bank-products',
      code: '38.02.07',
      level: 'college',
      cluster: 'business',
      name: 'Управление банковскими продуктами и сервисами (Колледж)',
      desc: 'Финансовые сервисы, кредитование, финтех, клиентские операции',
      defaultStack: ['Excel / Таблицы', '1С:Предприятие', 'Финтех', 'Power BI']
    },
    // Право СПО (40.02.01)
    {
      id: 'col-law',
      code: '40.02.01',
      level: 'college',
      cluster: 'law-ling',
      name: 'Юриспруденция и цифровое право (Колледж)',
      desc: 'Правовое обеспечение бизнеса, договорная работа, защита прав',
      defaultStack: ['КонсультантПлюс', 'Гарант', 'Word / Документы', 'Деловая переписка']
    },

    // ================= БАКАЛАВРИАТ =================
    // Дизайн ВО (54.03.01)
    {
      id: 'bac-fde-web',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: 'Веб-дизайн и проектирование цифровых продуктов (FDE)',
      desc: 'Флагманская программа МИДиС: UI/UX, продуктовое мышление, дизайн-системы и фронтенд',
      defaultStack: ['Figma', 'React', 'HTML/CSS', 'Midjourney', 'Design Systems', 'Notion']
    },
    {
      id: 'bac-3d-games',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: '3Д-моделирование и проектирование игр и приложений',
      desc: 'Игровые локации, персонажи, шейдеры, Unreal Engine и Unity',
      defaultStack: ['Blender', 'Substance Painter', 'Unreal Engine', 'Unity', 'ZBrush']
    },
    {
      id: 'bac-graphic-brand',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: 'Графический дизайн и брендинг',
      desc: 'Визуальные коммуникации, брендинг, типографика, гайдлайны',
      defaultStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign']
    },
    {
      id: 'bac-interior-env',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: 'Дизайн интерьера и городской среды',
      desc: 'Урбанистика, общественные и жилые пространства, эргономика',
      defaultStack: ['AutoCAD', '3ds Max', 'Revit', 'Photoshop', 'SketchUp']
    },
    {
      id: 'bac-fashion-mgmt',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: 'Дизайн одежды и управление модным брендом',
      desc: 'Дропы коллекций, 3D-примерка, апсайклинг, fashion-маркетинг',
      defaultStack: ['CLO 3D', 'Adobe Illustrator', 'Photoshop', 'Moodboard']
    },
    {
      id: 'bac-motion-anim',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: 'Цифровая анимация и моушн-дизайн',
      desc: 'Кинетическая типографика, 3D моушн, заставки, спецэффекты',
      defaultStack: ['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro']
    },
    {
      id: 'bac-industrial-design',
      code: '54.03.01',
      level: 'bachelor',
      cluster: 'design',
      name: 'Промышленный дизайн',
      desc: 'Проектирование материальных объектов, эргономика, прототипирование',
      defaultStack: ['SolidWorks', 'Rhinoceros', 'Keyshot', 'Photoshop']
    },
    // Прикладная информатика ВО (09.03.03)
    {
      id: 'bac-ai-pm',
      code: '09.03.03',
      level: 'bachelor',
      cluster: 'it',
      name: 'Управление ИТ-проектами и искусственный интеллект (FDE)',
      desc: 'Внедрение ИИ-агентов, системный анализ, Agile/Scrum, продуктовый менеджмент',
      defaultStack: ['Python', 'Cursor AI', 'ChatGPT', 'Git & GitHub', 'Notion', 'Agile/Scrum']
    },
    {
      id: 'bac-web-mobile-dev',
      code: '09.03.03',
      level: 'bachelor',
      cluster: 'it',
      name: 'Проектирование и разработка веб и мобильных приложений',
      desc: 'Fullstack-разработка, современные архитектуры, микросервисы',
      defaultStack: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker']
    },
    {
      id: 'bac-gamedev-vr',
      code: '09.03.03',
      level: 'bachelor',
      cluster: 'it',
      name: 'Разработка игр и виртуальные технологии (VR/AR)',
      desc: 'Игровая механика, C#, шейдеры, физика, виртуальная реальность',
      defaultStack: ['C#', 'Unity', 'C++', 'Unreal Engine', 'Git & GitHub']
    },
    // Менеджмент ВО (38.03.02)
    {
      id: 'bac-biz-marketing',
      code: '38.03.02',
      level: 'bachelor',
      cluster: 'business',
      name: 'Управление бизнесом и интернет-маркетинг',
      desc: 'Стратегический маркетинг, запуск стартапов, сквозная аналитика',
      defaultStack: ['Яндекс.Метрика', 'VK Ads', 'Notion', 'Unit-экономика', 'Miro']
    },
    {
      id: 'bac-hotel-rest-mgmt',
      code: '38.03.02',
      level: 'bachelor',
      cluster: 'service',
      name: 'Ресторанный и гостиничный менеджмент',
      desc: 'Операционное управление ресторанами и отелями, HoReCa, сервисный аудит',
      defaultStack: ['iiko / R-Keeper', 'Opera PMS', 'Excel / Таблицы', 'Service Design']
    },
    // Гостиничное дело ВО (43.03.03)
    {
      id: 'bac-intl-hospitality',
      code: '43.03.03',
      level: 'bachelor',
      cluster: 'service',
      name: 'Управление в международном гостиничном бизнесе',
      desc: 'Международные стандарты, revenue management, сервисное лидерство',
      defaultStack: ['Opera PMS', 'Excel / Таблицы', 'Revenue Management', 'English Business']
    },
    // Туризм ВО (43.03.02)
    {
      id: 'bac-tourism-digital',
      code: '43.03.02',
      level: 'bachelor',
      cluster: 'service',
      name: 'Управление цифровыми проектами и бизнес-аналитика в туризме',
      desc: 'Цифровые экосистемы, гео-аналитика, разработка инновационных турмаршрутов',
      defaultStack: ['Power BI', 'Google Analytics', 'Notion', 'CRM']
    },
    {
      id: 'bac-tourism-prod',
      code: '43.03.02',
      level: 'bachelor',
      cluster: 'service',
      name: 'Продюсирование мероприятий и маркетинг в туризме',
      desc: 'Создание масштабных турсобытий, продвижение территорий',
      defaultStack: ['Miro', 'Notion', 'VK Ads', 'Excel / Таблицы']
    },
    // Сервис ВО (43.03.01)
    {
      id: 'bac-event-service',
      code: '43.03.01',
      level: 'bachelor',
      cluster: 'service',
      name: 'Ивент-менеджмент и продюсирование событий',
      desc: 'Организация фестивалей, выставок, форумов, конференций, продюсирование',
      defaultStack: ['Notion', 'Miro', 'Excel / Таблицы', 'Trello', 'Telegram Ads']
    },
    // Лингвистика ВО (45.03.02)
    {
      id: 'bac-linguistics',
      code: '45.03.02',
      level: 'bachelor',
      cluster: 'law-ling',
      name: 'Перевод и международные бизнес-коммуникации (EN / CN)',
      desc: 'Деловой перевод, локализация, ВЭД с Китаем и Азией',
      defaultStack: ['Trados', 'DeepL Pro', 'CAT-tools', 'Notion']
    },

    // ================= МАГИСТРАТУРА =================
    {
      id: 'mast-creative-art',
      code: '54.04.01',
      level: 'master',
      cluster: 'design',
      name: 'Креативное лидерство и арт-дирекшн (Магистратура)',
      desc: 'Управление дизайн-студиями, стратегический дизайн, арт-дирекшн',
      defaultStack: ['Design Systems', 'Notion', 'Miro', 'Agile/Scrum', 'AI-workflow']
    },
    {
      id: 'mast-ai-business',
      code: '09.04.03',
      level: 'master',
      cluster: 'it',
      name: 'Интеллектуальные информационные системы и AI в бизнесе',
      desc: 'Прикладной ML, проектирование больших корпоративных систем',
      defaultStack: ['Python', 'ML-pipelines', 'BigData', 'Enterprise Architecture']
    },
    {
      id: 'mast-strategy-mgmt',
      code: '38.04.02',
      level: 'master',
      cluster: 'business',
      name: 'Стратегическое управление и международное предпринимательство',
      desc: 'Масштабирование бизнеса, управление инновациями, венчур',
      defaultStack: ['Financial Modeling', 'Agile/Scrum', 'Notion', 'Unit-экономика']
    }
  ],

  // Popular stack tools
  popularStacks: [
    'Figma', 'React', 'HTML/CSS', 'Python', 'Cursor AI', 'ChatGPT', 'Claude',
    'DeepSeek', 'Midjourney', 'Blender', 'Adobe Photoshop', 'Adobe Illustrator',
    'Unity', 'TypeScript', 'Node.js', 'Notion', 'PostgreSQL', 'Excel / Таблицы',
    'AutoCAD', '3ds Max', 'After Effects', 'CLO 3D', 'Miro'
  ],

  // Popular hobbies
  popularHobbies: [
    'Видеоигры и геймдев', 'Киберспорт', 'Музыка и саунд-дизайн', 'Фотография и стрит-арт',
    'Уличная мода и кастом', 'Урбанистика', 'Кофе и гастрономия', 'Фитнес и плавание в МИДиС',
    'Психология и коучинг', 'Кинематограф', 'Настольные игры', 'Путешествия и хайкинг'
  ]
};

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================

const state = {
  currentStep: 1,
  totalSteps: 6,

  // Selections
  scenarioId: 'iot-roadmap',
  educationLevel: 'bachelor',
  activeCluster: 'all',
  specialization: null, // Full spec object
  searchQuery: '',
  course: '1',
  studyForm: 'full-time',
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

// Default specialization
state.specialization = MIDIS_DATA.allSpecializations.find(s => s.id === 'bac-fde-web');

// ==========================================================================
// 3. WIZARD STEP NAVIGATION
// ==========================================================================

function goToStep(targetStep) {
  if (targetStep < 1 || targetStep > state.totalSteps) return;
  state.currentStep = targetStep;

  // Panes
  document.querySelectorAll('.wizard-step-pane').forEach((pane, idx) => {
    pane.classList.toggle('active', idx + 1 === targetStep);
  });

  // Progress Bar
  const progressPercent = Math.round(((targetStep - 1) / (state.totalSteps - 1)) * 100);
  document.getElementById('progress-bar-fill').style.width = `${Math.max(5, progressPercent)}%`;

  // Progress meta text
  const stepTitles = [
    'ШАГ 1 ИЗ 5: ВЫБОР ЦЕЛИ НЕЙРОСЕТИ',
    'ШАГ 2 ИЗ 5: ВЫБОР СПЕЦИАЛЬНОСТИ В МИДиС',
    'ШАГ 3 ИЗ 5: КАЛИБРОВКА СТИЛЯ ВОСПРИЯТИЯ',
    'ШАГ 4 ИЗ 5: СТЕК, ХОББИ И РЕСУРСЫ ИНСТИТУТА',
    'ШАГ 5 ИЗ 5: СУТЬ ТВОЕЙ ЗАДАЧИ И ДЕДЛАЙН',
    'ШАГ 6: СИНТЕЗ И РЕЗУЛЬТАТ JARVIS'
  ];
  document.getElementById('progress-step-info').textContent = stepTitles[targetStep - 1] || '';
  document.getElementById('progress-percent-info').textContent = `${progressPercent}% ЗАВЕРШЕНО`;

  // Step dots
  document.querySelectorAll('.step-nav-item').forEach(item => {
    const s = parseInt(item.dataset.step, 10);
    item.classList.toggle('active', s === targetStep);
    item.classList.toggle('completed', s < targetStep);
  });

  // Scroll to wizard top
  window.scrollTo({ top: 60, behavior: 'smooth' });

  // Update step 5 quick templates when landing on step 5
  if (targetStep === 5) {
    renderStep5Templates();
  }

  // Synthesis on step 6
  if (targetStep === 6) {
    runJarvisSynthesis();
  }
}

// ==========================================================================
// 4. RENDERING FUNCTIONS
// ==========================================================================

// Step 1: Render 14 Scenarios
function renderScenarios(filterCat = 'all') {
  const container = document.getElementById('scenarios-hud-container');
  container.innerHTML = '';

  const list = filterCat === 'all'
    ? MIDIS_DATA.scenarios
    : MIDIS_DATA.scenarios.filter(s => s.category === filterCat);

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

// Step 2: Render Cluster Pills
function renderClusterPills() {
  const container = document.getElementById('cluster-pills-container');
  container.innerHTML = '';

  MIDIS_DATA.clusters.forEach(cl => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cluster-pill ${state.activeCluster === cl.id ? 'active' : ''}`;
    btn.textContent = cl.name;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.cluster-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCluster = cl.id;
      document.getElementById('cluster-hint').textContent = cl.name;
      renderSpecializations();
    });

    container.appendChild(btn);
  });
}

// Step 2: Render Specialization Cards (filtered by Level, Cluster & Search Query)
function renderSpecializations() {
  const container = document.getElementById('specs-cards-container');
  container.innerHTML = '';

  let list = MIDIS_DATA.allSpecializations.filter(s => s.level === state.educationLevel);

  if (state.activeCluster !== 'all') {
    list = list.filter(s => s.cluster === state.activeCluster);
  }

  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.code.includes(q) || s.desc.toLowerCase().includes(q));
  }

  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 24px; color: var(--text-muted); font-size: 13px;">Ничего не найдено по вашему запросу. Попробуйте очистить фильтр.</div>`;
    return;
  }

  // Ensure an active spec is selected
  if (!state.specialization || state.specialization.level !== state.educationLevel) {
    state.specialization = list[0];
  }

  list.forEach(spec => {
    const isSelected = state.specialization && state.specialization.id === spec.id;
    const card = document.createElement('div');
    card.className = `spec-card-item ${isSelected ? 'active' : ''}`;
    card.innerHTML = `
      <div>
        <div class="spec-item-top">
          <span class="spec-code-tag">${spec.code}</span>
        </div>
        <h4 class="spec-item-name">${spec.name}</h4>
      </div>
      <p class="spec-item-cluster">${spec.desc}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.spec-card-item').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.specialization = spec;

      // Auto-suggest stack tools for selected major
      if (spec.defaultStack) {
        spec.defaultStack.forEach(st => {
          if (!state.selectedSkills.includes(st)) state.selectedSkills.push(st);
        });
        renderChips();
      }

      showToast(`Выбрано: ${spec.name}`);
    });

    container.appendChild(card);
  });
}

// Step 4: Render Chips Cloud
function renderChips() {
  // Stacks
  const stackBox = document.getElementById('hud-stack-chips');
  stackBox.innerHTML = '';
  const allStacks = Array.from(new Set([...MIDIS_DATA.popularStacks, ...state.selectedSkills]));

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
  const allHobbies = Array.from(new Set([...MIDIS_DATA.popularHobbies, ...state.selectedHobbies]));

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

// Step 5: Render Quick Templates based on chosen scenario
function renderStep5Templates() {
  const bar = document.getElementById('quick-templates-bar');
  bar.innerHTML = '<span class="qt-title">Быстрые примеры в 1 клик:</span>';

  const sc = MIDIS_DATA.scenarios.find(s => s.id === state.scenarioId) || MIDIS_DATA.scenarios[0];
  const templates = sc.quickTemplates || [
    'Сформулируй пошаговый план прокачки с нарастающей сложностью.',
    'Выдели 3 ключевые ошибки и дай пошаговые рекомендации по исправлению.'
  ];

  templates.forEach(text => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qt-btn';
    btn.textContent = text.length > 55 ? text.substring(0, 52) + '...' : text;
    btn.title = text;
    btn.addEventListener('click', () => {
      document.getElementById('hud-task-input').value = text;
      state.taskInput = text;
      showToast('Шаблон вставлен');
    });
    bar.appendChild(btn);
  });
}

// ==========================================================================
// 5. PROMPT GENERATION ENGINE
// ==========================================================================

function compileMidisPrompt() {
  const sc = MIDIS_DATA.scenarios.find(s => s.id === state.scenarioId) || MIDIS_DATA.scenarios[0];
  const spec = state.specialization || MIDIS_DATA.allSpecializations[0];

  const levelLabels = {
    bachelor: 'Высшее образование (Бакалавриат МИДиС)',
    college: 'СПО (Колледж МИДиС)',
    master: 'Высшее образование (Магистратура МИДиС)'
  };

  const studyFormLabels = {
    'full-time': 'Очная форма',
    'part-time': 'Очно-заочная форма',
    'extramural': 'Заочная форма'
  };

  const skillLevelLabels = {
    beginner: 'Новичок (1 курс / погружение в специальность)',
    junior: 'Junior (знаю базовую теорию, создаю первые учебные проекты)',
    'junior-plus': 'Junior+ / Pre-Middle (уверенно владею инструментами)',
    freelancer: 'Практик / Фрилансер (совмещаю учебу с коммерческими заказами)'
  };

  const perceptionFormatDescriptions = {
    'structured-lists': 'Структурированные чек-листы: без длинных вводных и канцелярита, четкие короткие буллеты, готовые к внедрению.',
    'step-by-step': 'Пошаговый алгоритмический гайд (1-2-3): последовательная четкая инструкция с контрольными точками готовности каждого шага.',
    'analogies': 'Объяснение через аналогии: проводи параллели с видеоиграми, поп-культурой или бытовыми ситуациями для моментального понимания.',
    'strict-code': 'Инженерный строгий стиль: упор на стандарты индустрии, паттерны проектирования, чистые термины и код.',
    'mentor-dialogue': 'Тон заботливого наставника: общайся со мной на равных, подбадривай, задавай открытые развивающие вопросы.'
  };

  const yearsTotal = state.educationLevel === 'college' ? 4 : state.educationLevel === 'master' ? 2 : 4;
  const currentCourse = parseInt(state.course, 10) || 1;
  const yearsLeft = Math.max(1, yearsTotal - currentCourse + 1);

  // Active institutional resources
  const activeResources = [];
  if (state.resources.partnerProjects) {
    activeResources.push('- Проектное обучение с реальными компаниями-партнерами с 1-2 курса (наработка портфолио кейсов в FDE Lab)');
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
- Специальность / Профиль: [${spec.code}] ${spec.name}
- Курс: ${state.course} курс (впереди обучения: примерно ${yearsLeft} ${yearsLeft === 1 ? 'год' : yearsLeft < 5 ? 'года' : 'лет'})
- Форма обучения: ${studyFormLabels[state.studyForm]}
- Текущий уровень практических навыков: ${skillLevelLabels[state.skillLevel]}
${state.selectedSkills.length > 0 ? `- Мой стек и используемый софт: ${state.selectedSkills.join(', ')}` : ''}
${state.selectedHobbies.length > 0 ? `- Мои увлечения и сильные стороны: ${state.selectedHobbies.join(', ')}` : ''}
${state.fearsInput.trim() ? `- Мои сомнения, сложности и страхи (честно): "${state.fearsInput.trim()}"` : ''}

---

### РЕСУРСЫ МОЕГО ИНСТИТУТА (МИДиС)
${activeResources.length > 0 ? activeResources.join('\n') : '- Проектные мастерские и академические ресурсы института'}

---

### ЗАДАЧА
${sc.goalSummary}
${state.taskInput.trim() ? `\nМой персональный запрос / контекст задачи:\n«${state.taskInput.trim()}»` : ''}
${state.deadlineInput.trim() ? `\nДедлайн / рамки времени: ${state.deadlineInput.trim()}` : ''}

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
   - 2-3 профессиональные цели по направлению (${spec.name});
   - 1-2 надпрофессиональные цели (ИИ, управление проектами, физическая энергия, софт-скиллы);
   - конкретные действия внутри института МИДиС (партнерские проекты, элективы, хакатоны);
   - 1 «точку сверки» — контрольный вопрос самому себе, чтобы проверить, туда ли я иду.
3. В конце сформируй список из 5–7 конкретных первых шагов на ближайший месяц.
4. Если в моих ответах есть сомнения — прямо включи безопасные «пробы пера» (разговор с практиком, мини-проект).`;
      break;

    case 'portfolio-pet-projects':
      prompt += `1. Предложи 3–4 уникальные концепции проектов на стыке моей специальности (${spec.name}) и моих увлечений (${state.selectedHobbies.join(', ') || 'технологии и творчество'}).
2. Для каждой идеи распиши:
   - Проблему пользователей и формулировку ценности;
   - Целевую аудиторию (ЦА);
   - Минимальный функционал (MVP) и рекомендуемый стек (${state.selectedSkills.join(', ') || 'базовый софт'});
   - Главную "фичу-крючок" (Wow-effect), которая зацепит арт-директора или тимлида в портфолио;
   - План реализации на 3-4 недели.`;
      break;

    case 'exam-defense-prep':
      prompt += `1. Объясни ключевую суть темы максимально доходчиво простыми словами (методом Фейнмана).
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
      prompt += `1. Составь недельный спринт-график с учетом пар, блоков глубокой работы (Deep Work), отдыха и бассейна/спорта МИДиС.
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

    case 'hackathon-pitch':
      prompt += `1. Сформируй структуру 3-минутного питч-дека (10 слайдов) для жюри хакатона:
   - Проблема и масштабы боли пользователей;
   - Наше решение и технологическая фишка;
   - Демонстрация MVP;
   - Бизнес-модель и экономика проекта;
   - Команда и дорожная карта развития.
2. Подготовь 5 самых каверзных вопросов жюри и формулы уверенных ответов.`;
      break;

    case 'ai-prompt-engineer':
      prompt += `1. Напиши 3 детальных промпта на английском языке для Midjourney / Flux / SDXL:
   - Первый: общий атмосферный мастер-шот (Master Shot);
   - Второй: детальный макро/крупный план ключевого элемента (Close-up Detail);
   - Третий: контекстная интеграция в интерфейс / мокап реального продукта.
2. В каждом промпте укажи рекомендованные параметры (--ar, --v, --style, camera lens, lighting).`;
      break;

    case 'team-conflict-resolver':
      prompt += `1. Проанализируй ситуацию в команде с точки зрения ролей и ожиданий.
2. Предложи пошаговый сценарий 15-минутного командного созвона / встречи для решения разногласий.
3. Сформулируй 3 правила фиксации договоренностей в командном Notion/Trello.`;
      break;

    case 'english-pro':
      prompt += `1. Составь глоссарий из 20 самых актуальных терминов по моей специальности (${spec.name}) на английском языке с примерами в контексте.
2. Напиши сценарий профессионального диалога (10 реплик) для обсуждения рабочего проекта с англоязычным коллегой.`;
      break;

    default:
      prompt += `Дай структурированный, детальный ответ с практическими рекомендациями, готовыми к применению.`;
  }

  prompt += `\n\n---
### ВАЖНО:
- Пиши на русском языке, живо, авторитетно, без шаблонного канцелярита.
- Не выдумывай названия сторонних курсов или партнеров, которых я не указал — используй только ресурсы МИДиС и логику профессионального роста.`;

  return prompt;
}

// ==========================================================================
// 6. JARVIS SYNTHESIS ANIMATION SEQUENCE
// ==========================================================================

function runJarvisSynthesis() {
  const loader = document.getElementById('synthesis-loader');
  const resultPanel = document.getElementById('terminal-result-panel');
  const statusText = document.getElementById('synthesis-status-text');
  const logLine = document.getElementById('synthesis-log-line');

  loader.style.display = 'flex';
  resultPanel.style.display = 'none';

  const spec = state.specialization || MIDIS_DATA.allSpecializations[0];

  const sequence = [
    { delay: 100, status: 'СКАНИРОВАНИЕ ПРОФИЛЯ СТУДЕНТА МИДиС...', log: `[0.10s] Анализ профиля: [${spec.code}] ${spec.name}...` },
    { delay: 450, status: 'ИНТЕГРАЦИЯ ИНСТИТУТСКИХ ВОЗМОЖНОСТЕЙ...', log: '[0.45s] Подключение FDE Lab, ОУП, бассейна и ИИ-модулей МИДиС...' },
    { delay: 850, status: 'КАЛИБРОВКА СИСТЕМНОЙ РОЛИ И ОГРАНИЧЕНИЙ...', log: '[0.85s] Оптимизация структуры под LLM (ChatGPT / Claude / DeepSeek)...' },
    { delay: 1250, status: 'СИНТЕЗ ЗАВЕРШЕН // РЕЗУЛЬТАТ ГОТОВ', log: '[1.25s] Вывод скомпилированного промпта в терминал...' }
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
    document.getElementById('term-file-name').textContent = `MIDIS_${spec.code}_${state.scenarioId.toUpperCase()}.PROMPT`;

    // Summary pills
    const summaryBar = document.getElementById('terminal-summary-bar');
    summaryBar.innerHTML = `
      <span class="term-pill">🎓 ${spec.name}</span>
      <span class="term-pill">📌 Курс: ${state.course}</span>
      <span class="term-pill">⚙️ Стек: ${state.selectedSkills.slice(0, 3).join(', ')}${state.selectedSkills.length > 3 ? '...' : ''}</span>
      <span class="term-pill">🎯 Сценарий: ${state.scenarioId}</span>
    `;

    // Direct Links
    const encoded = encodeURIComponent(promptText);
    document.getElementById('term-link-chatgpt').href = `https://chatgpt.com/?q=${encoded}`;
    document.getElementById('term-link-claude').href = `https://claude.ai/new?q=${encoded}`;
    document.getElementById('term-link-deepseek').href = `https://chat.deepseek.com/`;

    showToast('⚡ Промпт успешно скомпилирован!');
  }, 1500);
}

// ==========================================================================
// 7. EVENT LISTENERS
// ==========================================================================

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
      renderSpecializations();
    });
  });

  // Specialization live search input
  const searchInput = document.getElementById('input-spec-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderSpecializations();
    });
  }

  // Course Pills
  document.querySelectorAll('#course-selector .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#course-selector .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.course = btn.dataset.val;
    });
  });

  // Form Pills (full-time, part-time, extramural)
  document.querySelectorAll('#form-selector .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#form-selector .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.studyForm = btn.dataset.val;
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
    showToast('Файл .md сохранен');
  });

  // Restart wizard
  document.getElementById('btn-term-restart').addEventListener('click', () => {
    goToStep(1);
    showToast('Переход к шагу 1');
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
  renderClusterPills();
  renderSpecializations();
  renderChips();
  attachEvents();
  goToStep(1);
});
