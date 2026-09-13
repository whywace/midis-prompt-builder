/**
 * verify_prompt_logic.js
 * Автоматизированный тестовый набор для проверки логики промптирования MIDIS Prompt Builder.
 * Проверяет матрицу согласованности (курсы, уровни, горизонты, ресурсы),
 * а также защиту от ложных срабатываний (false positives) на провокационных формулировках.
 * 
 * Запуск:
 *   node verify_prompt_logic.js
 */

const assert = require('assert');
const path = require('path');
const {
  compileMidisPrompt,
  getCourseStageContext,
  resolveSkillLevelDescription,
  MIDIS_DATA,
  state: defaultState
} = require(path.resolve(__dirname, 'app.js'));

console.log('====================================================');
console.log('   MIDIS PROMPT BUILDER — ТЕСТЫ ЛОГИКИ ПРОМПТОВ     ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✓ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ [FAIL] ${name}`);
    console.error(`         Ошибка: ${err.message}\n`);
  }
}

// --------------------------------------------------------------------------
// БАЗОВАЯ МАТРИЦА СОГЛАСОВАННОСТИ (КЕЙСЫ 1–4)
// --------------------------------------------------------------------------

runTest('Кейс 1: 4 курс + «с нуля» -> Нет противоречия с 1 курсом, горизонт 1 год (ВКР/диплом)', () => {
  const customState = {
    ...defaultState,
    course: 4,
    taskInput: 'хочу с нуля освоить веб-дизайн',
    fearsInput: 'боюсь не успеть к диплому',
    scenarioId: 'iot-roadmap'
  };

  const prompt = compileMidisPrompt(customState);

  // 1. Не должно быть старого бага с подстановкой 1 курса
  assert.ok(
    !prompt.includes('Новичок (1 курс'),
    'Найдено противоречие: в промпте присутствует "Новичок (1 курс" для 4 курса!'
  );

  // 2. Должен быть выпускной этап
  assert.ok(
    prompt.includes('4 курс') && (prompt.includes('выпускной') || prompt.includes('финальный')),
    'Промпт должен идентифицировать 4 курс как выпускной'
  );

  // 3. Динамический статус признаёт изучение с нуля в сжатые сроки
  const skillDesc = resolveSkillLevelDescription(4, customState.taskInput, customState.fearsInput);
  assert.ok(
    skillDesc.includes('с нуля в сжатые сроки 4 курса') || skillDesc.includes('с нуля'),
    `Статус навыков должен учитывать "с нуля" для 4 курса. Получено: "${skillDesc}"`
  );

  // 4. Горизонт указывает 1 год до выпуска, а не 4 года
  const courseCtx = getCourseStageContext(4);
  assert.ok(
    courseCtx.defaultHorizon.includes('1 год') && courseCtx.defaultHorizon.includes('выпускной'),
    'Контекст курса должен задавать 1 год горизонта для 4 курса'
  );
  assert.ok(
    prompt.includes('выпускной 4 курс') || prompt.includes('1 год'),
    'В промпте должен фигурировать оставшийся 1 год горизонта'
  );
});

runTest('Кейс 2: 1 курс + фриланс -> Признание коммерческого опыта, без даунгрейда до школьника', () => {
  const customState = {
    ...defaultState,
    course: 1,
    taskInput: 'уже беру заказы на фрилансе, хочу систематизировать знания',
    fearsInput: '',
    scenarioId: 'iot-roadmap'
  };

  const prompt = compileMidisPrompt(customState);

  const skillDesc = resolveSkillLevelDescription(1, customState.taskInput, customState.fearsInput);
  assert.ok(
    skillDesc.includes('опыт прикладных/коммерческих задач') || skillDesc.includes('Практикующий'),
    `Ожидалось признание опыта фриланса. Получено: "${skillDesc}"`
  );

  assert.ok(
    !prompt.includes('Новичок (1 курс / погружение в специальность)'),
    'Промпт не должен клеймить студента с фрилансом как полного новичка'
  );

  assert.ok(
    prompt.includes(skillDesc),
    'Промпт должен содержать динамически вычисленный статус навыков'
  );
});

runTest('Кейс 3: 3 курс заочная форма -> Адаптация под рабочий график, без предположений о дневных парах', () => {
  const customState = {
    ...defaultState,
    course: 3,
    studyForm: 'extramural',
    taskInput: 'совмещаю с работой, нужен баланс',
    scenarioId: 'time-management-balance'
  };

  const prompt = compileMidisPrompt(customState);

  assert.ok(
    prompt.includes('Заочная форма'),
    'Промпт должен указывать заочную форму'
  );

  assert.ok(
    prompt.includes('графика основной работы') && prompt.includes('самостоятельного изучения'),
    'Промпт должен калибровать тайм-менеджмент под работу и самостоятельное изучение'
  );

  assert.ok(
    prompt.includes('без привязки к ежедневному расписанию дневных пар'),
    'Для заочников должно быть явно исключено дневное расписание пар'
  );
});

runTest('Кейс 4: 4 курс ИОТ Roadmap -> 500-750 слов, 1-2 ресурса на период, ВКР, 5-7 шагов с часами', () => {
  const customState = {
    ...defaultState,
    course: 4,
    selectedSkills: [],
    scenarioId: 'iot-roadmap'
  };

  const prompt = compileMidisPrompt(customState);

  assert.ok(
    prompt.includes('500–750 слов'),
    'Промпт должен содержать ограничение объёма 500–750 слов'
  );

  assert.ok(
    prompt.includes('1–2 профильных ресурса МИДиС'),
    'Промпт должен ограничивать институциональные ресурсы до 1-2 на период'
  );

  assert.ok(
    !prompt.includes('Мой рабочий стек'),
    'При пустых чипах пункт со стеком должен полностью опускаться без выдумывания инструментов'
  );

  // Дополнительно проверяем, что при явно выбранных чипах стек добавляется корректно
  const stateWithSkills = {
    ...customState,
    selectedSkills: ['Figma', 'HTML/CSS']
  };
  const promptWithSkills = compileMidisPrompt(stateWithSkills);
  assert.ok(
    promptWithSkills.includes('Мой рабочий стек и используемый софт: Figma, HTML/CSS'),
    'При выбранных чипах стек должен явно указываться в контексте'
  );

  assert.ok(
    prompt.includes('5–7 конкретных первых шагов') && (prompt.includes('в часах') || prompt.includes('оценкой трудозатрат')),
    'Промпт должен требовать 5-7 шагов с оценкой времени'
  );

  assert.ok(
    prompt.includes('преддипломная практика') || prompt.includes('ВКР') || prompt.includes('диплом'),
    'Для 4 курса должна упоминаться преддипломная практика или диплом'
  );

  assert.ok(
    prompt.includes('ANTI-HALLUCINATION') && prompt.includes('FDE Lab'),
    'Промпт должен содержать правила защиты от галлюцинаций'
  );
});

// --------------------------------------------------------------------------
// ПРОВОКАЦИОННЫЕ ТЕСТЫ НА FALSE POSITIVES (КЕЙСЫ 5–9)
// --------------------------------------------------------------------------

runTest('Кейс 5 [Провокация]: "боюсь, что как студент без имени не возьмут в студию" -> НЕ Практикующий', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'подготовить портфолио',
    'боюсь, что как студент без имени не возьмут в студию'
  );

  // Студент боится, что его не возьмут в студию — у него нет коммерческого опыта работы!
  assert.ok(
    !skillDesc.includes('Практикующий') && !skillDesc.includes('коммерческих задач'),
    `Ложное срабатывание на словах "студент" / "в студию"! Получено: "${skillDesc}"`
  );

  // Должен остаться штатный уровень для 2 курса
  assert.ok(
    skillDesc.includes('2 курс'),
    `Должен сохраниться стандартный профиль 2 курса. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 6 [Провокация]: "первый раз защищаю диплом перед ГЭК" -> НЕ Начальный уровень с нуля', () => {
  const skillDesc = resolveSkillLevelDescription(
    4,
    'подготовка к диплому',
    'первый раз защищаю диплом перед ГЭК, очень страшно выступать перед комиссией'
  );

  // "первый раз" относится к процедуре защиты диплома, а не к навыкам с нуля!
  assert.ok(
    !skillDesc.includes('Начальный') && !skillDesc.includes('с нуля'),
    `Ложное срабатывание на "первый раз" при защите диплома! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('4 курс (выпускной этап'),
    `Должен остаться полноценный выпускной статус 4 курса. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 7 [Провокация]: "хочу научиться брать заказы на фрилансе и найти первых клиентов" -> НЕ Практикующий', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'хочу научиться брать заказы на фрилансе и найти первых клиентов',
    'боюсь общаться с реальными заказчиками'
  );

  // Студент только МЕЧТАЕТ/ХОЧЕТ брать заказы, у него их ещё нет
  assert.ok(
    !skillDesc.includes('Практикующий') && !skillDesc.includes('коммерческих задач'),
    `Ложное срабатывание на желании брать заказы! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('2 курс'),
    `Должен остаться 2 курс. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 8 [Провокация]: "боюсь, что без опыта работы в дизайн-студии никуда не возьмут" -> НЕ Практикующий', () => {
  const skillDesc = resolveSkillLevelDescription(
    3,
    'курсовая работа по UX',
    'боюсь, что без опыта работы в дизайн-студии никуда не возьмут'
  );

  // Фраза "без опыта работы" содержит "опыт работы", но это отрицание!
  assert.ok(
    !skillDesc.includes('Практикующий'),
    `Ложное срабатывание на фразе "без опыта работы"! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('3 курс'),
    `Должен остаться 3 курс. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 9 [Легитимный]: "первый раз открыл Figma и изучаю с нуля" -> Корректно определяет начальный уровень', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'первый раз открыл Figma и изучаю с нуля',
    ''
  );

  assert.ok(
    skillDesc.includes('Начальный уровень') || skillDesc.includes('с нуля'),
    `Должен распознать изучение с нуля. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 10 [Провокация отрицания]: "я не новичок, у меня коммерческий опыт есть" -> Практикующий, НЕ Начальный', () => {
  const skillDesc = resolveSkillLevelDescription(
    1,
    'я не новичок, у меня коммерческий опыт есть',
    ''
  );

  // Отрицание "не новичок" в сочетании с коммерческим опытом не должно распознаваться как новичок
  assert.ok(
    !skillDesc.includes('Начальный') && !skillDesc.includes('с нуля'),
    `Ложное срабатывание на слове "новичок" при наличии отрицания "не новичок"! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('Практикующий уровень') && skillDesc.includes('коммерческих задач'),
    `Должен определить статус практикующего специалиста. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 11 [Провокация отрицания]: "я далеко не новичок, уже делаю свои проекты на заказ" -> Практикующий', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'я далеко не новичок, уже делаю свои проекты на заказ',
    ''
  );

  assert.ok(
    !skillDesc.includes('Начальный') && !skillDesc.includes('с нуля'),
    `Сработало на новичка вопреки "далеко не новичок"! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('Практикующий уровень'),
    `Должен определить статус практикующего уровня. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 12 [Временной контраст / Temporal Contrast]: "раньше был совсем новичком, но сейчас беру заказы" -> Практикующий', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'раньше был совсем новичком, но сейчас беру заказы',
    ''
  );

  assert.ok(
    !skillDesc.includes('Начальный') && !skillDesc.includes('с нуля'),
    `Временной контраст ("раньше был X, но сейчас Y") ошибочно распознан как начальный уровень! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('Практикующий уровень') && skillDesc.includes('коммерческих задач'),
    `Текущее действие "сейчас беру заказы" должно иметь приоритет TIER 1. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 13 [Нейтральное отрицание без опыта]: "я не новичок" -> Статус курса, НЕ ложный практикующий', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'я не новичок',
    ''
  );

  assert.ok(
    !skillDesc.includes('Начальный') && !skillDesc.includes('с нуля'),
    `Ошибочно распознан как новичок вопреки "не новичок"! Получено: "${skillDesc}"`
  );

  assert.ok(
    !skillDesc.includes('Практикующий'),
    `Не должно быть ложного практикующего статуса без подтверждённого опыта/заказов! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('2 курс'),
    `Должен вернуться сбалансированный академический статус 2 курса. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 14 [Разговорное отрицание с вводными словами]: "не сказал бы что я новичок" -> 2 курс, НЕ Начальный', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'не сказал бы что я новичок',
    ''
  );

  assert.ok(
    !skillDesc.includes('Начальный') && !skillDesc.includes('с нуля'),
    `Окно отрицания не удержало вводные слова "сказал бы что"! Получено: "${skillDesc}"`
  );

  assert.ok(
    skillDesc.includes('2 курс'),
    `Должен вернуться базовый статус курса. Получено: "${skillDesc}"`
  );
});

runTest('Кейс 15 [Смена сферы: прошлый опыт vs новый стек]: "раньше брал заказы на старом стеке, а сейчас в новой сфере полный новичок" -> Начальный', () => {
  const skillDesc = resolveSkillLevelDescription(
    2,
    'раньше брал заказы на старом стеке, а сейчас в новой сфере полный новичок',
    ''
  );

  // Прошедшее время "раньше брал" не должно давать статус практикующего сейчас
  assert.ok(
    !skillDesc.includes('Практикующий'),
    `Прошедшее время "раньше брал" ошибочно активировало практикующий статус! Получено: "${skillDesc}"`
  );

  // Настоящее "сейчас в новой сфере полный новичок" должно честно отражать погружение с нуля
  assert.ok(
    skillDesc.includes('Начальный') || skillDesc.includes('с нуля'),
    `Ожидался начальный уровень для новой сферы. Получено: "${skillDesc}"`
  );
});

console.log('\n----------------------------------------------------');
console.log(`ИТОГ ТЕСТИРОВАНИЯ: ${passedTests}/${totalTests} тестов успешно пройдено.`);
console.log('----------------------------------------------------');

if (passedTests === totalTests) {
  console.log('ВСЕ ТЕСТЫ (БАЗОВЫЕ + ПРОВОКАЦИОННЫЕ) ПРОЙДЕНЫ УСПЕШНО! [OK]\n');
  process.exit(0);
} else {
  console.error('ОБНАРУЖЕНЫ ОШИБКИ В ТЕСТАХ! [ERROR]\n');
  process.exit(1);
}
