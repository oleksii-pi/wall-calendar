const STORAGE_KEY = "wallCalendarDataV1";
const MEMBER_KEY = "wallCalendarMembersV1";
const SETTINGS_KEY = "wallCalendarSettingsV1";

const calendar = document.querySelector("#calendar");
const talkButton = document.querySelector("#talkButton");
const appMenu = document.querySelector("#appMenu");
const monthViewButton = document.querySelector("#monthViewButton");
const settingsButton = document.querySelector("#settingsButton");
const addEventButton = document.querySelector("#addEventButton");
const eventDialog = document.querySelector("#eventDialog");
const settingsDialog = document.querySelector("#settingsDialog");
const confirmDialog = document.querySelector("#confirmDialog");
const eventForm = document.querySelector("#eventForm");
const settingsForm = document.querySelector("#settingsForm");
const confirmForm = document.querySelector("#confirmForm");
const eventId = document.querySelector("#eventId");
const speechText = document.querySelector("#speechText");
const eventDate = document.querySelector("#eventDate");
const eventTime = document.querySelector("#eventTime");
const eventEndTime = document.querySelector("#eventEndTime");
const eventAllDay = document.querySelector("#eventAllDay");
const timeGrid = document.querySelector(".time-grid");
const memberChoices = document.querySelector("#memberChoices");

const HOUR_START = 8;
const HOUR_END = 22;
const HOUR_LABEL_STEP = 2;
const EMPTY_EVENT_COLOR = "#d9d9d9";
const EVENT_COLORS = [
  "#ffd95c",
  "#ff9f24",
  "#ef4c4d",
  "#df3d50",
  "#7f962a",
  "#f9c65b",
  "#fffca8",
  "#f28beb",
  "#ed49df",
  "#dca564",
  "#e4c77f",
  "#e6ddb0",
  "#5a7d96",
  "#e5f2bc",
  "#f7de82",
  "#bdca93",
  "#f8eaa1",
  "#d8eeee",
  "#8da483",
  "#eee8b1",
  "#b05d76",
  "#f7e4c9",
  "#85d5d3",
  "#6dca91",
];
const ACTIVE_PANEL_INDEX = 2;
const membersInput = document.querySelector("#membersInput");
const memberColorSettings = document.querySelector("#memberColorSettings");
const languageSelect = document.querySelector("#languageSelect");
const deleteEvent = document.querySelector("#deleteEvent");

const i18n = {
  de: {
    htmlLang: "de",
    speechLang: "de-DE",
    months: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    standaloneMonths: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    types: {
      family: "Familie",
      school: "Schule",
      "no-school": "Keine Schule",
      work: "Arbeit",
      wfh: "Homeoffice",
    },
    labels: {
      add: "Hinzufügen",
      cancel: "Abbrechen",
      confirmDelete: "Löschen",
      delete: "Löschen",
      deleteHint: "Diese Aktion kann nicht rückgängig gemacht werden.",
      deleteTitle: "Termin löschen?",
      editEvent: "Termin bearbeiten",
      eventText: "Text",
      language: "Sprache",
      members: "Personen",
      membersEmpty: "Personen werden in den Einstellungen verwaltet.",
      membersInput: "Namen, durch Komma getrennt",
      menuMonth: "Monat",
      menuWeek: "Wochen",
      menuSettings: "Einstellungen",
      newEvent: "Neuer Termin",
      push: "",
      save: "Speichern",
      settings: "Einstellungen",
      settingsHint: "Daten bleiben nur in diesem Browser.",
      title: "Titel",
      date: "Datum",
      time: "Beginn",
      end: "Ende",
      allDay: "Ganztägig",
      type: "Typ",
      untitled: "Neuer Termin",
    },
    holidayNames: {
      newYear: "Neujahr",
      labor: "Tag der Arbeit",
      unity: "Tag der Deutschen Einheit",
      christmas1: "Weihnachten",
      christmas2: "Weihnachten",
      goodFriday: "Karfreitag",
      easterMonday: "Ostermontag",
      ascension: "Christi Himmelfahrt",
      pentecost: "Pfingstmontag",
    },
  },
  en: {
    htmlLang: "en",
    speechLang: "en-US",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    standaloneMonths: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    types: {
      family: "Family",
      school: "School",
      "no-school": "No school",
      work: "Work",
      wfh: "Work from home",
    },
    labels: {
      add: "Add",
      cancel: "Cancel",
      confirmDelete: "Delete",
      delete: "Delete",
      deleteHint: "This cannot be undone.",
      deleteTitle: "Delete event?",
      editEvent: "Edit event",
      eventText: "Text",
      language: "Language",
      members: "People",
      membersEmpty: "People are managed in settings.",
      membersInput: "Names, separated by comma",
      menuMonth: "Month",
      menuWeek: "Week",
      menuSettings: "Settings",
      newEvent: "New event",
      push: "",
      save: "Save",
      settings: "Settings",
      settingsHint: "Data stays in this browser.",
      title: "Title",
      date: "Date",
      time: "Start",
      end: "End",
      allDay: "Full day",
      type: "Type",
      untitled: "New event",
    },
    holidayNames: {
      newYear: "New Year",
      labor: "Labor Day",
      unity: "Unity Day",
      christmas1: "Christmas",
      christmas2: "Christmas",
      goodFriday: "Good Friday",
      easterMonday: "Easter Monday",
      ascension: "Ascension Day",
      pentecost: "Whit Monday",
    },
  },
  uk: {
    htmlLang: "uk",
    speechLang: "uk-UA",
    months: [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ],
    standaloneMonths: [
      "січень",
      "лютий",
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
      "листопад",
      "грудень",
    ],
    weekdays: ["нд", "пн", "вт", "ср", "чт", "пт", "сб"],
    types: {
      family: "Сім'я",
      school: "Школа",
      "no-school": "Немає школи",
      work: "Робота",
      wfh: "З дому",
    },
    labels: {
      add: "Додати",
      cancel: "Скасувати",
      confirmDelete: "Видалити",
      delete: "Видалити",
      deleteHint: "Цю дію не можна скасувати.",
      deleteTitle: "Видалити подію?",
      editEvent: "Редагувати подію",
      eventText: "Текст",
      language: "Мова",
      members: "Люди",
      membersEmpty: "Люди налаштовуються в параметрах.",
      membersInput: "Імена через кому",
      menuMonth: "Місяць",
      menuWeek: "Тиждень",
      menuSettings: "Налаштування",
      newEvent: "Нова подія",
      push: "",
      save: "Зберегти",
      settings: "Налаштування",
      settingsHint: "Дані залишаються тільки в цьому браузері.",
      title: "Назва",
      date: "Дата",
      time: "Початок",
      end: "Кінець",
      allDay: "Цілий день",
      type: "Тип",
      untitled: "Нова подія",
    },
    holidayNames: {
      newYear: "Новий рік",
      labor: "День праці",
      unity: "День єдності",
      christmas1: "Різдво",
      christmas2: "Різдво",
      goodFriday: "Страсна п'ятниця",
      easterMonday: "Великодній понеділок",
      ascension: "Вознесіння",
      pentecost: "Трійця",
    },
  },
};

const monthWords = {
  de: new Map([
    ["januar", 0],
    ["jan", 0],
    ["februar", 1],
    ["feb", 1],
    ["marz", 2],
    ["maerz", 2],
    ["märz", 2],
    ["april", 3],
    ["mai", 4],
    ["juni", 5],
    ["juli", 6],
    ["august", 7],
    ["aug", 7],
    ["september", 8],
    ["sep", 8],
    ["oktober", 9],
    ["okt", 9],
    ["november", 10],
    ["nov", 10],
    ["dezember", 11],
    ["dez", 11],
  ]),
  en: new Map([
    ["january", 0],
    ["jan", 0],
    ["february", 1],
    ["feb", 1],
    ["march", 2],
    ["mar", 2],
    ["april", 3],
    ["apr", 3],
    ["may", 4],
    ["june", 5],
    ["jun", 5],
    ["july", 6],
    ["jul", 6],
    ["august", 7],
    ["aug", 7],
    ["september", 8],
    ["sep", 8],
    ["october", 9],
    ["oct", 9],
    ["november", 10],
    ["nov", 10],
    ["december", 11],
    ["dec", 11],
  ]),
  uk: new Map([
    ["січня", 0],
    ["січень", 0],
    ["лютого", 1],
    ["лютий", 1],
    ["березня", 2],
    ["березень", 2],
    ["квітня", 3],
    ["квітень", 3],
    ["травня", 4],
    ["травень", 4],
    ["червня", 5],
    ["червень", 5],
    ["липня", 6],
    ["липень", 6],
    ["серпня", 7],
    ["серпень", 7],
    ["вересня", 8],
    ["вересень", 8],
    ["жовтня", 9],
    ["жовтень", 9],
    ["листопада", 10],
    ["листопад", 10],
    ["грудня", 11],
    ["грудень", 11],
  ]),
};

const weekdayWords = {
  de: [
    ["montag", 1],
    ["dienstag", 2],
    ["mittwoch", 3],
    ["donnerstag", 4],
    ["freitag", 5],
    ["samstag", 6],
    ["sonntag", 0],
  ],
  en: [
    ["monday", 1],
    ["tuesday", 2],
    ["wednesday", 3],
    ["thursday", 4],
    ["friday", 5],
    ["saturday", 6],
    ["sunday", 0],
  ],
  uk: [
    ["понеділ", 1],
    ["вівтор", 2],
    ["серед", 3],
    ["четвер", 4],
    ["п'ят", 5],
    ["пят", 5],
    ["субот", 6],
    ["неділ", 0],
  ],
};

let events = loadJson(STORAGE_KEY, []);
let members = loadJson(MEMBER_KEY, []);
let settings = loadJson(SETTINGS_KEY, {});
let memberColors = normalizeMemberColors(settings.memberColors, members);
let language = supportedLanguage(settings.language || navigator.language);
let viewMode = settings.viewMode === "month" ? "month" : "week";
let anchorDate = settings.anchorDate
  ? parseDateKey(settings.anchorDate)
  : startOfWeek(new Date());
let draftMembers = [];
let draftMemberColors = {};
let openDraftColorMember = "";
let pressTimer = null;
let pressStartedAt = 0;
let recording = null;
let drag = null;
let pendingDeleteId = "";

applyLanguage();
render();

talkButton.addEventListener("pointerdown", startButtonPress);
talkButton.addEventListener("pointerup", finishButtonPress);
talkButton.addEventListener("pointercancel", cancelButtonPress);

calendar.addEventListener("pointerdown", startDrag);
calendar.addEventListener("pointermove", moveDrag);
calendar.addEventListener("pointerup", finishDrag);
calendar.addEventListener("pointercancel", cancelDrag);

monthViewButton.addEventListener("click", () => {
  viewMode = viewMode === "month" ? "week" : "month";
  appMenu.hidden = true;
  anchorDate =
    viewMode === "month"
      ? new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      : startOfWeek(new Date());
  saveSettings();
  render();
});

settingsButton.addEventListener("click", () => {
  appMenu.hidden = true;
  openSettings();
});

addEventButton.addEventListener("click", () => {
  appMenu.hidden = true;
  openEventDialog(parseSpeech(""));
});

document.addEventListener("click", (event) => {
  if (event.target === talkButton || appMenu.contains(event.target)) return;
  appMenu.hidden = true;
});

document
  .querySelector("#cancelEvent")
  .addEventListener("click", () => eventDialog.close());
document
  .querySelector("#cancelSettings")
  .addEventListener("click", () => settingsDialog.close());
document
  .querySelector("#cancelDelete")
  .addEventListener("click", () => confirmDialog.close());

deleteEvent.addEventListener("click", () => {
  if (!eventId.value) return;
  pendingDeleteId = eventId.value;
  confirmDialog.showModal();
});

confirmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!pendingDeleteId) return;
  events = events.filter((entry) => entry.id !== pendingDeleteId);
  saveJson(STORAGE_KEY, events);
  pendingDeleteId = "";
  confirmDialog.close();
  eventDialog.close();
  render();
});

eventForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedMembers = [
    ...memberChoices.querySelectorAll("input:checked"),
  ].map((input) => input.value);
  const rawTitle = speechText.value.trim();
  const allDay = eventAllDay.checked;
  const entry = {
    id: eventId.value || crypto.randomUUID(),
    date: eventDate.value,
    allDay,
    time: allDay ? "" : eventTime.value,
    endTime: allDay || !eventTime.value ? "" : eventEndTime.value,
    title: rawTitle || label("untitled"),
    members: selectedMembers,
  };

  if (eventId.value) {
    events = events.map((item) => (item.id === eventId.value ? entry : item));
  } else {
    events.push(entry);
  }

  saveJson(STORAGE_KEY, events);
  eventDialog.close();
  render();
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  language = languageSelect.value;
  members = parseMemberInput(membersInput.value);
  memberColors = normalizeMemberColors(draftMemberColors, members);
  saveJson(MEMBER_KEY, members);
  saveSettings();
  settingsDialog.close();
  applyLanguage();
  render();
});

membersInput.addEventListener("input", () => {
  draftMembers = parseMemberInput(membersInput.value);
  draftMemberColors = normalizeMemberColors(draftMemberColors, draftMembers);
  if (!draftMembers.includes(openDraftColorMember)) openDraftColorMember = "";
  renderSettingsMemberColors();
});

memberColorSettings.addEventListener("click", (event) => {
  const colorButton = event.target.closest("[data-color]");
  if (colorButton) {
    const member = colorButton.dataset.member;
    const color = colorButton.dataset.color;
    if (!colorButton.disabled && member && color) {
      draftMemberColors[member] = color;
      openDraftColorMember = "";
      renderSettingsMemberColors();
    }
    return;
  }

  const memberButton = event.target.closest("[data-member]");
  if (!memberButton) return;
  const member = memberButton.dataset.member;
  openDraftColorMember = openDraftColorMember === member ? "" : member;
  renderSettingsMemberColors();
});

speechText.addEventListener("input", () => {
  const parsed = parseSpeech(speechText.value);
  if (parsed.date) eventDate.value = parsed.date;
  if (parsed.time) {
    eventTime.value = parsed.time;
    eventEndTime.value = shiftTime(parsed.time, 60);
  }
  renderMemberChoices(parsed.members);
});

eventTime.addEventListener("change", () => {
  eventEndTime.value = eventTime.value ? shiftTime(eventTime.value, 60) : "";
});

eventAllDay.addEventListener("change", () => {
  applyAllDayState();
});

function render() {
  calendar.className = `calendar ${viewMode}-view`;
  calendar.innerHTML = "";

  const track = document.createElement("div");
  track.className = "calendar-track";

  const base =
    viewMode === "month"
      ? new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1)
      : startOfWeek(anchorDate);
  const stepDate =
    viewMode === "month"
      ? (date, n) => addMonths(date, n)
      : (date, n) => addDays(date, n * 7);
  const renderer = viewMode === "month" ? renderMonth : renderWeek;

  for (let offset = -2; offset <= 3; offset++) {
    const panel = document.createElement("div");
    panel.className =
      offset >= 0 && offset <= 1
        ? "calendar-panel"
        : "calendar-panel calendar-panel-buffer";
    panel.append(renderer(stepDate(base, offset)));
    track.append(panel);
  }

  calendar.append(track);

  monthViewButton.textContent = label(
    viewMode === "month" ? "menuWeek" : "menuMonth",
  );
  settingsButton.textContent = label("menuSettings");
}

function renderWeek(monday) {
  const days = Array.from({ length: 7 }, (_, index) => addDays(monday, index));
  const holidayKeys = new Set(holidayEvents(days).map((entry) => entry.date));
  const visible = new Set(days.map(toDateKey));
  const visibleEvents = events
    .filter((entry) => visible.has(entry.date))
    .sort(compareEvents);

  const week = document.createElement("section");
  week.className = "week";
  const title = document.createElement("div");
  title.className = "range-title";
  title.textContent = formatRange(days);
  week.append(title);

  days.forEach((day) => {
    const dateKey = toDateKey(day);
    const dayEvents = visibleEvents.filter((entry) => entry.date === dateKey);
    const dayEl = document.createElement("article");
    dayEl.className = [
      "day",
      sameDate(day, new Date()) ? "today" : "",
      day.getDay() === 0 || holidayKeys.has(dateKey) ? "special" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.innerHTML = `<span class="weekday">${t().weekdays[day.getDay()]}</span><span class="number">${day.getDate()}</span>`;

    dayEl.append(dateEl, renderDayBody(dayEvents, { showHours: true }));
    week.append(dayEl);
  });

  return week;
}

function renderMonth(monthDate) {
  const month = document.createElement("section");
  month.className = "month";
  const title = document.createElement("div");
  title.className = "month-title";
  title.textContent = `${standaloneMonthName(monthDate.getMonth())} ${monthDate.getFullYear()}`;
  month.append(title);

  const grid = document.createElement("div");
  grid.className = "month-grid";
  orderedWeekdays().forEach((weekday) => {
    const el = document.createElement("div");
    el.className = "month-weekday";
    el.textContent = weekday;
    grid.append(el);
  });

  const firstCell = startOfWeek(monthDate);
  const days = Array.from({ length: 42 }, (_, index) =>
    addDays(firstCell, index),
  );
  const holidayKeys = new Set(holidayEvents(days).map((entry) => entry.date));
  days.forEach((day) => {
    const dateKey = toDateKey(day);
    const dayEvents = events
      .filter((entry) => entry.date === dateKey)
      .sort(compareEvents);
    const dayEl = document.createElement("div");
    dayEl.className = [
      "month-day",
      day.getMonth() !== monthDate.getMonth() ? "outside" : "",
      sameDate(day, new Date()) ? "today" : "",
      day.getDay() === 0 || holidayKeys.has(dateKey) ? "special" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const number = document.createElement("div");
    number.className = "month-number";
    number.textContent = day.getDate();

    dayEl.append(number, renderDayBody(dayEvents, { compact: true }));
    grid.append(dayEl);
  });

  month.append(grid);
  return month;
}

function renderDayBody(dayEvents, options = {}) {
  const body = document.createElement("div");
  body.className = options.compact ? "day-body day-body-compact" : "day-body";

  const allDay = dayEvents.filter(isAllDay);
  const timed = dayEvents.filter((entry) => !isAllDay(entry));
  const hourRange = dayHourRange(timed);

  if (allDay.length > 0) {
    const row = document.createElement("div");
    row.className = "fullday-row";
    allDay.forEach((entry) =>
      row.append(
        renderEventBar(entry, {
          fullDay: true,
          compact: options.compact,
        }),
      ),
    );
    body.append(row);
  }

  const timeline = document.createElement("div");
  timeline.className = "timeline";

  if (options.showHours) {
    const labels = document.createElement("div");
    labels.className = "hour-labels";
    for (const h of hourRange.labels) {
      const label = document.createElement("span");
      label.className = "hour-label";
      label.style.left = `${hourPosition(h, hourRange)}%`;
      if (h === hourRange.startHour) label.style.transform = "none";
      if (h === hourRange.endHour) label.style.transform = "translateX(-100%)";
      label.textContent = h;
      labels.append(label);
    }
    timeline.append(labels);
  }

  const lanesEl = document.createElement("div");
  lanesEl.className = "lanes";
  if (options.showHours) {
    for (const h of hourRange.labels) {
      const tick = document.createElement("div");
      tick.className = "hour-tick";
      tick.style.left = `${hourPosition(h, hourRange)}%`;
      lanesEl.append(tick);
    }
  }

  packLanes(timed, hourRange).forEach((lane) => {
    const laneEl = document.createElement("div");
    laneEl.className = "lane";
    lane.forEach((entry) => {
      const bar = renderEventBar(entry, {
        compact: options.compact,
      });
      const s = clampedStart(entry, hourRange);
      const e = clampedEnd(entry, hourRange);
      bar.style.left = `${(s / hourRange.rangeMin) * 100}%`;
      bar.style.width = `${Math.max(1, ((e - s) / hourRange.rangeMin) * 100)}%`;
      laneEl.append(bar);
    });
    lanesEl.append(laneEl);
  });

  timeline.append(lanesEl);
  body.append(timeline);

  return body;
}

function renderEventBar(entry, options = {}) {
  const bar = document.createElement("button");
  bar.type = "button";
  bar.className = options.fullDay ? "event-bar fullday" : "event-bar";
  bar.addEventListener("click", () => openExistingEvent(entry));
  bar.style.background = eventBackground(entry);

  const timeText = formatTimeRange(entry);
  const label = options.compact ? entry.title : formatEventBarText(entry);
  bar.textContent = label;
  bar.title = timeText ? `${timeText} ${label}` : label;
  return bar;
}

function formatEventBarText(entry) {
  const names = Array.isArray(entry.members)
    ? entry.members.filter(Boolean).join(", ")
    : "";
  return names ? `${entry.title} - ${names}` : entry.title;
}

function eventBackground(entry) {
  const eventMembers = eventMemberNames(entry);
  if (eventMembers.length === 0) return EMPTY_EVENT_COLOR;
  if (eventMembers.length === 1) return memberColor(eventMembers[0]);

  const size = 100 / eventMembers.length;
  const stops = eventMembers.flatMap((name, index) => {
    const color = memberColor(name);
    const start = index * size;
    const end = (index + 1) * size;
    return [`${color} ${start}%`, `${color} ${end}%`];
  });
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

function eventMemberNames(entry) {
  if (!Array.isArray(entry.members)) return [];
  return [...new Set(entry.members.filter(Boolean))];
}

function memberColor(name) {
  if (!name) return EMPTY_EVENT_COLOR;
  if (memberColors[name]) return memberColors[name];

  const index = members.indexOf(name);
  const safeIndex = index >= 0 ? index : stableColorIndex(name);
  return EVENT_COLORS[safeIndex % EVENT_COLORS.length];
}

function normalizeMemberColors(rawColors, names) {
  const source = rawColors && typeof rawColors === "object" ? rawColors : {};
  const normalized = {};
  const used = new Set();

  names.forEach((name) => {
    const saved = source[name];
    if (isSelectableColor(saved) && !used.has(saved)) {
      normalized[name] = saved;
      used.add(saved);
      return;
    }

    const color = availableMemberColor(used, name);
    normalized[name] = color;
    used.add(color);
  });

  return normalized;
}

function availableMemberColor(used, seed) {
  const paletteColor = EVENT_COLORS.find((color) => !used.has(color));
  if (paletteColor) return paletteColor;

  let attempt = 0;
  let color = "";
  do {
    color = generatedMemberColor(seed, attempt);
    attempt += 1;
  } while (used.has(color));
  return color;
}

function generatedMemberColor(seed, offset) {
  const hue = (stableColorIndex(`${seed}${offset}`) + offset * 137) % 360;
  return `hsl(${hue} 58% 76%)`;
}

function isSelectableColor(color) {
  return typeof color === "string" && EVENT_COLORS.includes(color);
}

function stableColorIndex(value) {
  if (!value) return 0;
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function dayHourRange(entries) {
  let startMin = HOUR_START * 60;
  let endMin = HOUR_END * 60;

  entries.forEach((entry) => {
    const eventStart = eventStartMinute(entry);
    if (eventStart === null) return;
    startMin = Math.min(startMin, eventStart);
    endMin = Math.max(endMin, eventEndMinute(entry, eventStart));
  });

  const stepMin = HOUR_LABEL_STEP * 60;
  startMin = Math.max(0, Math.floor(startMin / stepMin) * stepMin);
  endMin = Math.min(24 * 60, Math.ceil(endMin / stepMin) * stepMin);
  if (endMin <= startMin) endMin = Math.min(24 * 60, startMin + stepMin);

  const labels = [];
  for (let minute = startMin; minute <= endMin; minute += stepMin) {
    labels.push(minute / 60);
  }
  if (labels[labels.length - 1] !== endMin / 60) {
    labels.push(endMin / 60);
  }

  return {
    startHour: startMin / 60,
    endHour: endMin / 60,
    startMin,
    endMin,
    rangeMin: endMin - startMin,
    labels,
  };
}

function hourPosition(hour, range) {
  return ((hour - range.startHour) / (range.endHour - range.startHour)) * 100;
}

function clampedStart(entry, range) {
  const start = eventStartMinute(entry);
  if (start === null) return 0;
  return Math.max(0, Math.min(range.rangeMin, start - range.startMin));
}

function clampedEnd(entry, range) {
  const startMinute = eventStartMinute(entry);
  const endMinute = eventEndMinute(entry, startMinute);
  const raw = endMinute - range.startMin;
  const start = clampedStart(entry, range);
  return Math.max(start + 15, Math.min(range.rangeMin, raw));
}

function eventStartMinute(entry) {
  return timeToMinutes(entry.time);
}

function eventEndMinute(entry, startMinute = eventStartMinute(entry)) {
  if (startMinute === null) return HOUR_END * 60;
  const parsedEnd = timeToMinutes(entry.endTime);
  let endMinute = parsedEnd === null ? startMinute + 60 : parsedEnd;
  if (endMinute <= startMinute) endMinute += 24 * 60;
  return Math.min(24 * 60, endMinute);
}

function timeToMinutes(time) {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function packLanes(entries, range) {
  const sorted = [...entries].sort(
    (a, b) => clampedStart(a, range) - clampedStart(b, range),
  );
  const lanes = [];
  for (const entry of sorted) {
    const start = clampedStart(entry, range);
    let placed = false;
    for (const lane of lanes) {
      if (clampedEnd(lane[lane.length - 1], range) <= start) {
        lane.push(entry);
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([entry]);
  }
  return lanes;
}

function startButtonPress(event) {
  event.preventDefault();
  talkButton.setPointerCapture(event.pointerId);
  pressStartedAt = Date.now();
  pressTimer = window.setTimeout(startRecording, 1000);
}

function finishButtonPress() {
  const wasRecording = Boolean(recording);
  window.clearTimeout(pressTimer);
  if (wasRecording) {
    stopRecording();
    return;
  }
  if (Date.now() - pressStartedAt < 1000) {
    appMenu.hidden = !appMenu.hidden;
  }
}

function cancelButtonPress() {
  window.clearTimeout(pressTimer);
  if (recording) stopRecording();
}

function startRecording() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    openEventDialog(parseSpeech(""));
    return;
  }

  const recognition = new SpeechRecognition();
  const state = { recognition, transcript: "", finished: false };
  recording = state;
  recognition.lang = t().speechLang;
  recognition.interimResults = true;
  recognition.continuous = true;
  talkButton.classList.add("listening");
  appMenu.hidden = true;

  recognition.onresult = (event) => {
    state.transcript = [...event.results]
      .map((result) => result[0].transcript)
      .join(" ")
      .trim();
  };

  recognition.onerror = () => {
    state.finished = true;
    recording = null;
    talkButton.classList.remove("listening");
    openEventDialog(parseSpeech(""));
  };

  recognition.onend = () => {
    if (state.finished) return;
    state.finished = true;
    recording = null;
    talkButton.classList.remove("listening");
    openEventDialog(parseSpeech(state.transcript));
  };

  recognition.start();
}

function stopRecording() {
  if (!recording) return;
  recording.recognition.stop();
}

function startDrag(event) {
  if (!usesSwipeTrack()) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (event.target.closest("button, input, select, textarea, dialog")) return;
  const track = calendar.querySelector(".calendar-track");
  if (!track) return;
  const panelWidth = getPanelWidth(track);
  if (!panelWidth) return;
  drag = {
    id: event.pointerId,
    startX: event.clientX,
    deltaX: 0,
    panelWidth,
    track,
  };
  calendar.setPointerCapture(event.pointerId);
  track.classList.remove("sliding");
}

function moveDrag(event) {
  if (!drag || drag.id !== event.pointerId) return;
  if (!usesSwipeTrack()) {
    resetTrack(drag.track);
    drag = null;
    return;
  }
  drag.deltaX = event.clientX - drag.startX;
  const width = getPanelWidth(drag.track) || drag.panelWidth;
  const clamped = Math.max(-width, Math.min(width, drag.deltaX));
  setTrackOffset(drag.track, clamped, width);
  if (event.cancelable) event.preventDefault();
}

function finishDrag(event) {
  if (!drag || drag.id !== event.pointerId) return;
  if (!usesSwipeTrack()) {
    resetTrack(drag.track);
    drag = null;
    return;
  }
  const deltaX = drag.deltaX;
  const track = drag.track;
  const panelWidth = getPanelWidth(track) || drag.panelWidth;
  drag = null;
  const threshold = Math.min(160, panelWidth * 0.18);
  if (Math.abs(deltaX) < threshold) {
    snapTrack(track, 0);
    return;
  }

  const direction = deltaX < 0 ? 1 : -1;
  const snapOffset = -direction * panelWidth;
  snapTrack(track, snapOffset, () => {
    anchorDate =
      viewMode === "month"
        ? addMonths(anchorDate, direction)
        : addDays(anchorDate, direction * 7);
    saveSettings();
    render();
  });
}

function cancelDrag() {
  const track = drag ? drag.track : null;
  drag = null;
  if (track) snapTrack(track, 0);
}

function usesSwipeTrack() {
  return true;
}

function resetTrack(track) {
  track.classList.remove("sliding");
  track.style.transform = "";
}

function snapTrack(track, offset, done) {
  track.classList.add("sliding");
  setTrackOffset(track, offset);
  window.setTimeout(() => {
    if (done) {
      done();
    } else {
      track.classList.remove("sliding");
      track.style.transform = "";
    }
  }, 270);
}

function getPanelWidth(track) {
  return track.querySelector(".calendar-panel")?.getBoundingClientRect().width;
}

function setTrackOffset(track, offset, panelWidth = getPanelWidth(track)) {
  const base = -(panelWidth || window.innerWidth) * ACTIVE_PANEL_INDEX;
  track.style.transform = `translate3d(${base + offset}px, 0, 0)`;
}

function openEventDialog(parsed) {
  eventId.value = "";
  deleteEvent.hidden = true;
  document.querySelector("#eventDialogTitle").textContent = label("newEvent");
  document.querySelector("#saveEvent").textContent = label("add");
  fillEventForm(parsed);
  eventDialog.showModal();
  if (!speechText.value) speechText.focus();
}

function openExistingEvent(entry) {
  eventId.value = entry.id;
  deleteEvent.hidden = false;
  document.querySelector("#eventDialogTitle").textContent = label("editEvent");
  document.querySelector("#saveEvent").textContent = label("save");
  fillEventForm({
    raw: entry.title,
    date: entry.date,
    time: entry.time,
    endTime: entry.endTime,
    title: entry.title,
    allDay: isAllDay(entry),
    members: entry.members || [],
  });
  eventDialog.showModal();
}

function fillEventForm(parsed) {
  speechText.value = parsed.raw ? parsed.title : "";
  eventDate.value = parsed.date || toDateKey(new Date());
  eventTime.value = parsed.time || "";
  eventEndTime.value = parsed.time
    ? parsed.endTime || shiftTime(parsed.time, 60)
    : "";
  eventAllDay.checked = Boolean(parsed.allDay);
  applyAllDayState();
  renderMemberChoices(parsed.members);
}

function applyAllDayState() {
  timeGrid.hidden = eventAllDay.checked;
}

function isAllDay(entry) {
  if (entry.allDay) return true;
  return !entry.time;
}

function shiftTime(time, minutes) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return "";
  const total = h * 60 + m + minutes;
  const normalized = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
}

function formatTimeRange(entry) {
  if (!entry.time) return "";
  return entry.endTime ? `${entry.time}–${entry.endTime}` : entry.time;
}

function openSettings() {
  languageSelect.value = language;
  membersInput.value = members.join(", ");
  draftMembers = [...members];
  draftMemberColors = normalizeMemberColors(memberColors, draftMembers);
  openDraftColorMember = "";
  renderSettingsMemberColors();
  settingsDialog.showModal();
  membersInput.focus();
}

function renderSettingsMemberColors() {
  memberColorSettings.innerHTML = "";
  if (draftMembers.length === 0) return;

  draftMembers.forEach((name) => {
    const row = document.createElement("div");
    row.className = "member-color-row";

    const colorButton = document.createElement("button");
    colorButton.type = "button";
    colorButton.className = "member-color-button";
    colorButton.dataset.member = name;
    colorButton.style.backgroundColor = draftMemberColors[name];
    colorButton.setAttribute("aria-label", `${label("members")} ${name}`);

    const nameEl = document.createElement("span");
    nameEl.className = "member-color-name";
    nameEl.textContent = name;

    row.append(colorButton, nameEl);

    if (openDraftColorMember === name) {
      const palette = document.createElement("div");
      palette.className = "member-color-palette";

      EVENT_COLORS.forEach((color) => {
        const swatch = document.createElement("button");
        swatch.type = "button";
        swatch.className = "member-color-option";
        swatch.dataset.member = name;
        swatch.dataset.color = color;
        swatch.style.backgroundColor = color;
        swatch.disabled = colorUsedByOtherMember(color, name, draftMemberColors);
        if (draftMemberColors[name] === color) {
          swatch.classList.add("selected");
          swatch.setAttribute("aria-current", "true");
        }
        swatch.setAttribute("aria-label", `${name} ${color}`);
        palette.append(swatch);
      });

      row.append(palette);
    }

    memberColorSettings.append(row);
  });
}

function colorUsedByOtherMember(color, member, colors) {
  return Object.entries(colors).some(
    ([name, assignedColor]) => name !== member && assignedColor === color,
  );
}

function parseMemberInput(value) {
  return [
    ...new Set(
      value
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean),
    ),
  ];
}

function renderMemberChoices(selected) {
  memberChoices.innerHTML = "";
  const legend = document.createElement("legend");
  legend.textContent = label("members");
  memberChoices.append(legend);

  if (members.length === 0) {
    const hint = document.createElement("p");
    hint.className = "hint";
    hint.textContent = label("membersEmpty");
    memberChoices.append(hint);
    return;
  }

  const row = document.createElement("div");
  row.className = "choice-row";
  members.forEach((name) => {
    const labelEl = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = name;
    input.checked = selected.includes(name);
    const swatch = document.createElement("span");
    swatch.className = "member-swatch";
    swatch.style.backgroundColor = memberColor(name);
    swatch.setAttribute("aria-hidden", "true");
    labelEl.append(input, swatch, document.createTextNode(name));
    row.append(labelEl);
  });
  memberChoices.append(row);
}

function parseSpeech(raw) {
  const text = normalize(raw);
  const parsedDate = parseDate(text);
  const parsedTime = parseTime(text);
  const parsedMembers = members.filter((member) =>
    text.includes(normalize(member)),
  );
  let title = raw.trim();

  for (const cleaner of titleCleaners()) {
    title = title.replace(cleaner, " ").replace(/\s+/g, " ").trim();
  }

  return {
    raw,
    date: parsedDate,
    time: parsedTime,
    title: title || label("untitled"),
    members: parsedMembers,
  };
}

function parseDate(text) {
  const today = startOfDay(new Date());
  const monthMatch = findMonth(text);

  if (monthMatch) {
    let date = new Date(today.getFullYear(), monthMatch.month, monthMatch.day);
    if (date < addDays(today, -1))
      date = new Date(
        today.getFullYear() + 1,
        monthMatch.month,
        monthMatch.day,
      );
    return toDateKey(date);
  }

  const weekday = weekdayWords[language].find(([word]) => text.includes(word));
  if (weekday) {
    const diff = (weekday[1] - today.getDay() + 7) % 7 || 7;
    return toDateKey(addDays(today, diff));
  }

  return "";
}

function findMonth(text) {
  const words = [...monthWords[language].keys()].join("|");
  const numberBefore = text.match(
    new RegExp(`(^|\\s)(\\d{1,2})(\\.|st|nd|rd|th)?\\s+(${words})(?=\\s|$)`),
  );
  if (numberBefore)
    return {
      day: Number(numberBefore[2]),
      month: monthWords[language].get(numberBefore[4]),
    };

  const numberAfter = text.match(
    new RegExp(`(^|\\s)(${words})\\s+(\\d{1,2})(\\.|st|nd|rd|th)?(?=\\s|$)`),
  );
  if (numberAfter)
    return {
      day: Number(numberAfter[3]),
      month: monthWords[language].get(numberAfter[2]),
    };

  return null;
}

function parseTime(text) {
  const match = text.match(
    /(^|\s)(um|at|о|об|в)\s+(\d{1,2})(?::|\.|\s+)?(\d{2})?(?=\s|$)/,
  );
  if (!match) return "";
  const hour = Math.min(Number(match[3]), 23);
  const minute = match[4] ? Math.min(Number(match[4]), 59) : 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function titleCleaners() {
  const monthNames = [...monthWords[language].keys()].join("|");
  const weekdayNames = weekdayWords[language].map(([word]) => word).join("|");
  return [
    new RegExp(`(^|\\s)(am|on|у|в)?\\s*(${weekdayNames})\\S*(?=\\s|$)`, "i"),
    new RegExp(
      `(^|\\s)\\d{1,2}(\\.|st|nd|rd|th)?\\s+(${monthNames})(?=\\s|$)`,
      "i",
    ),
    new RegExp(
      `(^|\\s)(${monthNames})\\s+\\d{1,2}(\\.|st|nd|rd|th)?(?=\\s|$)`,
      "i",
    ),
    /(^|\s)(um|at|о|об|в)\s+\d{1,2}(:|\.|\s+)?\d{0,2}(?=\s|$)/i,
  ];
}

function holidayEvents(days) {
  const years = [...new Set(days.map((day) => day.getFullYear()))];
  const names = t().holidayNames;
  const holidays = years.flatMap((year) => {
    const easter = getEasterDate(year);
    return [
      holiday(year, 0, 1, names.newYear),
      holiday(year, 4, 1, names.labor),
      holiday(year, 9, 3, names.unity),
      holiday(year, 11, 25, names.christmas1),
      holiday(year, 11, 26, names.christmas2),
      datedHoliday(addDays(easter, -2), names.goodFriday),
      datedHoliday(addDays(easter, 1), names.easterMonday),
      datedHoliday(addDays(easter, 39), names.ascension),
      datedHoliday(addDays(easter, 50), names.pentecost),
    ];
  });
  const visible = new Set(days.map(toDateKey));
  return holidays.filter((entry) => visible.has(entry.date));
}

function holiday(year, month, day, title) {
  return datedHoliday(new Date(year, month, day), title);
}

function datedHoliday(date, title) {
  return { date: toDateKey(date), title };
}

function applyLanguage() {
  document.documentElement.lang = t().htmlLang;
  talkButton.textContent = label("push");
  talkButton.setAttribute("aria-label", label("push"));
  addEventButton.textContent = label("add");
  monthViewButton.textContent = label(
    viewMode === "month" ? "menuWeek" : "menuMonth",
  );
  settingsButton.textContent = label("menuSettings");
  document.querySelector("#eventDialogTitle").textContent = label("newEvent");
  document.querySelector("#speechLabel").textContent = label("title");
  document.querySelector("#dateLabel").textContent = label("date");
  document.querySelector("#timeLabel").textContent = label("time");
  document.querySelector("#endLabel").textContent = label("end");
  document.querySelector("#allDayLabel").textContent = label("allDay");
  document.querySelector("#deleteEvent").textContent = label("delete");
  document.querySelector("#cancelEvent").textContent = label("cancel");
  document.querySelector("#saveEvent").textContent = label("add");
  document.querySelector("#settingsTitle").textContent = label("settings");
  document.querySelector("#languageLabel").textContent = label("language");
  document.querySelector("#membersInputLabel").textContent =
    label("membersInput");
  document.querySelector("#membersInput").placeholder = label("membersInput");
  document.querySelector("#settingsHint").textContent = label("settingsHint");
  document.querySelector("#cancelSettings").textContent = label("cancel");
  document.querySelector("#saveSettings").textContent = label("save");
  document.querySelector("#confirmTitle").textContent = label("deleteTitle");
  document.querySelector("#confirmHint").textContent = label("deleteHint");
  document.querySelector("#cancelDelete").textContent = label("cancel");
  document.querySelector("#confirmDelete").textContent = label("confirmDelete");
}

function supportedLanguage(value) {
  const code = String(value || "")
    .slice(0, 2)
    .toLowerCase();
  return ["de", "en", "uk"].includes(code) ? code : "en";
}

function t() {
  return i18n[language];
}

function label(key) {
  return t().labels[key];
}

function orderedWeekdays() {
  return [...t().weekdays.slice(1), t().weekdays[0]];
}

function monthName(index) {
  return t().months[index];
}

function standaloneMonthName(index) {
  return t().standaloneMonths[index];
}

function formatRange(days) {
  const first = days[0];
  const last = days[days.length - 1];
  return `${first.getDate()} ${monthName(first.getMonth())} - ${last.getDate()} ${monthName(last.getMonth())}`;
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function startOfWeek(date) {
  const result = startOfDay(date);
  const day = result.getDay() || 7;
  result.setDate(result.getDate() - day + 1);
  return result;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDate(a, b) {
  return toDateKey(a) === toDateKey(b);
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDateKey(value) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return startOfWeek(new Date());
  return new Date(year, month - 1, day);
}

function compareEvents(a, b) {
  return `${a.date} ${a.time || "00:00"} ${a.title}`.localeCompare(
    `${b.date} ${b.time || "00:00"} ${b.title}`,
  );
}

function saveSettings() {
  saveJson(SETTINGS_KEY, {
    language,
    memberColors,
    viewMode,
    anchorDate: toDateKey(anchorDate),
  });
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
