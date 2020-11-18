# EffectsCalc

Landing Page Калькулятор эффекта от автоматизации для проекта Максимовой

## Сбор требований по зонам ответственности

**1. АД (Мастер) Диспетчирование и контроль задач, выявление проблем - Максимова, Волков 

1.1 Для задач на [канбан-доске]() должны использоваться следующие статусы выполнения:                 
- новая 
- в процессе
- проверка
- готово

1.2 Для задач на [канбан-доске]() должны использоваться следующие метки (labels):                        
- Web-dev-team
- показывающие роли для задач

#### 2. СП (Аналитик) Сбор и управление всеми требованиями в проекте - Шульга, Овчинников

#### 2.1 Бизнес-требования

2.1.1. Должны выполняться требования [пользовательской истории]()

2.1.2. Запросить дополнительные требования у автора ( Максимова )

#### 2.2 Функциональные требования

2.2.1. Библиотека должна включать функцию получения количества форм данных по выделенным для автоматизации процессов

2.2.2. Библиотека должна содержать функцию получения набора коэффициентов для выполнения расчетов FPA IFPUG

2.2.3. Библиотека должна содержать функцию получения набора коэффициентов для выполнения расчетов COCOMO II

2.2.4. Библиотека должна содержать набор функций для редактирования исходных данных и наборов коэффициентов

2.2.5. Библиотека должна содержать функцию для сохранения результатов расчета

#### 3. ВН (Дизайнер) Удобство использования, привлекательность продукта - Максимова, Куличкина

3.1. Приложение должно иметь пользовательский интерфейс, соответствующий [макету]()

3.2. Вся пользовательская документация должна выполняться в едином стиле

3.3. Все программные модули (библиотеки) должны сопровождаться комментариями


**4. БА (Тестировщик) Выявление бизнес-проблем, способы тестирования - Волков, Кузьмина

4.1. На каждую функцию должно быть разработано не менее одного модульного теста

4.2. На каждый модульный тест должно быть разработанно не менее одного контрольного примера

4.3. Контрольный пример должны разрабатываться в формате JSON

4.4. Для модульного тестирования должна использоваться библиотека [mocha](https://learn.javascript.ru/testing-mocha#behavior-driven-development-bdd)

**5. НИ (Архитектор) Структура продукта, инструменты разработки и поставки - Шульга, Овчинников

5.1. Разработка должна быть выполнена с использованием html, css, javascript

5.2. Ведение наборов исходных данных должно обеспечиваться локальной базе данных браузера пользователя

5.3. Модульные тесты должны запускаться общим пакетом со стартовой страницы

#### 5.4. Комплект поставки должен включать в себя:

5.4.1. Программные модули:
- index.html - стартовая страница модулей проверки библиотеки
- \lib\calc_data_object.js - основной скрипт библиотеки
  - calc_data - основной объект библиотеки
  - calc_data.getFP() - метод получения данных по п. 2.2.1.
  - ???
- \tests\test1.js - тест функции по п. 2.2.1.
- \tests\test2.js - тест функции по п. 2.2.2.
- \tests\test3.js - тест функции по п. 2.2.3.
- \tests\test4.js - тест функции по п. 2.2.4.

5.4.2. Данные, включая контрольные примеры:
- \tests\test1.json - КП функции по п. 2.2.1.
- \tests\test2.json - КП функции по п. 2.2.2.
- \tests\test3.json - КП функции по п. 2.2.3.
- \tests\test4.json - КП функции по п. 2.2.4.

5.4.3. Вики-страницы с документацией и инструкциями:
- \readme.md - описание требований, ссылки на документацию
- \instruction.md - инструкция, контрольные примеры

**6. ПП (Программист) Стиль и способы разработки, используемые фреймворки - Кузьмина, Мигунов

6.1. При разработке исходных кодов должны выполняться правила [оформления](https://learn.javascript.ru/coding-style)

6.2. Для определения объектов должны использоваться стрелочные операторы

6.3. Использование фреймворков не требуется

6.4. Библиотека должна состоять из одного класса calc_data, определенного как константа 

6.5. Все прикладные функции библиотеки должны быть оформлены (реализованы) как методы класса calc_data

**7. КО (Тех.писатель) Документирование проекта и продукта - Мигунов, Куличкина

7.1. Документация к библиотеке должна быть оформленна в виде страниц .md 

7.2. Документация к библиотеке должна быть доступна с landing page

7.3. Документация к библиотеке должна содержать инструкцию по применению

7.4. Документация к библиотеке должна содержать описание контрольных примеров
