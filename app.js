const STORAGE_KEY = "wallCalendarDataV1";
const MEMBER_KEY = "wallCalendarMembersV1";
const MEMBER_COLORS_KEY = "wallCalendarMemberColorsV1";
const SETTINGS_KEY = "wallCalendarSettingsV1";
const DELETED_EVENT_IDS_KEY = "wallCalendarDeletedEventIdsV1";
const SYNC_SECRET_KEY = "wallCalendarSyncSecretV1";
const FIREBASE_SDK_VERSION = "12.13.0";
const PIN_LENGTH = 4;

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDEP9NCH4n53DKO3uBm4uZODsfBWSph4_8",
  authDomain: "wall-calendar-63a0c.firebaseapp.com",
  projectId: "wall-calendar-63a0c",
  storageBucket: "wall-calendar-63a0c.firebasestorage.app",
  messagingSenderId: "84388282623",
  appId: "1:84388282623:web:ce48fd9060132c70a2ccca",
  measurementId: "G-5NKJGSC9KM",
};

const calendar = document.querySelector("#calendar");
const talkButton = document.querySelector("#talkButton");
const appMenu = document.querySelector("#appMenu");
const dayViewButton = document.querySelector("#dayViewButton");
const weekViewButton = document.querySelector("#weekViewButton");
const monthViewButton = document.querySelector("#monthViewButton");
const settingsButton = document.querySelector("#settingsButton");
const addEventButton = document.querySelector("#addEventButton");
const eventDialog = document.querySelector("#eventDialog");
const settingsDialog = document.querySelector("#settingsDialog");
const confirmDialog = document.querySelector("#confirmDialog");
const syncDialog = document.querySelector("#syncDialog");
const eventForm = document.querySelector("#eventForm");
const settingsForm = document.querySelector("#settingsForm");
const confirmForm = document.querySelector("#confirmForm");
const syncForm = document.querySelector("#syncForm");
const eventDialogTitle = document.querySelector("#eventDialogTitle");
const settingsTitle = document.querySelector("#settingsTitle");
const syncTitle = document.querySelector("#syncTitle");
const eventId = document.querySelector("#eventId");
const speechText = document.querySelector("#speechText");
const titleDictateButton = document.querySelector("#titleDictateButton");
const eventDate = document.querySelector("#eventDate");
const eventTime = document.querySelector("#eventTime");
const eventEndTime = document.querySelector("#eventEndTime");
const eventAllDay = document.querySelector("#eventAllDay");
const timeGrid = document.querySelector(".time-grid");
const memberChoices = document.querySelector("#memberChoices");

const HOUR_START = 8;
const HOUR_END = 22;
const HOUR_LABEL_STEP = 2;
const CREATE_TIME_ROUND_STEP = 60;
const TAP_MOVE_THRESHOLD = 10;
const SWIPE_ANIMATION_MS = 180;
const WEEK_SWIPE_ANIMATION_MS = 280;
const WEEK_CURRENT_WIDTH_RATIO = 2 / 3;
const WEEK_PREVIEW_WIDTH_RATIO = 1 / 3;
const SINGLE_WEEK_MEDIA = "(max-width: 520px)";
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
const VIEW_MODES = ["day", "week", "month"];
const membersInput = document.querySelector("#membersInput");
const memberColorSettings = document.querySelector("#memberColorSettings");
const languageSelect = document.querySelector("#languageSelect");
const deleteEvent = document.querySelector("#deleteEvent");
const resetSyncButton = document.querySelector("#resetSync");
const syncSettings = document.querySelector("#syncSettings");
const syncSecretKey = document.querySelector("#syncSecretKey");
const linkSyncButton = document.querySelector("#linkSync");
const syncPin = document.querySelector("#syncPin");
const syncError = document.querySelector("#syncError");
const settingsSyncError = document.querySelector("#settingsSyncError");

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
      membersEmpty: "In den Einstellungen verwaltet.",
      membersInput: "Namen, durch Komma getrennt",
      menuDay: "Tag",
      menuMonth: "Monat",
      menuWeek: "Wochen",
      menuSettings: "Einstellungen",
      newEvent: "Neuer Termin",
      push: "",
      save: "Speichern",
      settings: "Einstellungen",
      settingsHint: "Daten bleiben in diesem Browser und in den Clouds.",
      settingsHintLocal:
        "Data stays in this browser locally until you connect to the calendar by secret key.",
      resetSync: "Sync zurücksetzen",
      resetSyncConfirm: "Zurücksetzen",
      resetSyncHint:
        "Dieses Gerät wird von der Cloud-Synchronisierung getrennt. Lokale Daten bleiben erhalten.",
      resetSyncTitle: "Sync zurücksetzen?",
      syncSecretKey: "Sync secret key",
      syncSecretLink: "Link",
      syncConnect: "Verbinden",
      syncError:
        "Verbindung fehlgeschlagen. Prüfe Link, PIN und Firebase-Regeln.",
      syncSecretError:
        "Verbindung fehlgeschlagen. Prüfe Secret Key und Firebase-Regeln.",
      syncHint: "PIN eingeben, um diesen Kalender zu verbinden.",
      syncPin: "PIN",
      syncTitle: "Synchronisierung verbinden",
      dictateTitle: "Titel diktieren",
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
      membersEmpty: "Managed in settings.",
      membersInput: "Names, separated by comma",
      menuDay: "Day",
      menuMonth: "Month",
      menuWeek: "Week",
      menuSettings: "Settings",
      newEvent: "New event",
      push: "",
      save: "Save",
      settings: "Settings",
      settingsHint: "Data stays in this browser and in the clouds.",
      settingsHintLocal:
        "Data stays in this browser locally until you connect to the calendar by secret key.",
      resetSync: "Reset sync",
      resetSyncConfirm: "Reset",
      resetSyncHint:
        "This device will disconnect from cloud sync. Local data stays here.",
      resetSyncTitle: "Reset sync?",
      syncSecretKey: "Sync secret key",
      syncSecretLink: "Link",
      syncConnect: "Connect",
      syncError: "Connection failed. Check the link, PIN, and Firebase rules.",
      syncSecretError:
        "Connection failed. Check the secret key and Firebase rules.",
      syncHint: "Enter the PIN to connect this calendar.",
      syncPin: "PIN",
      syncTitle: "Connect sync",
      dictateTitle: "Dictate title",
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
      membersEmpty: "Налаштовується в параметрах.",
      membersInput: "Імена через кому",
      menuDay: "День",
      menuMonth: "Місяць",
      menuWeek: "Тиждень",
      menuSettings: "Налаштування",
      newEvent: "Нова подія",
      push: "",
      save: "Зберегти",
      settings: "Налаштування",
      settingsHint: "Дані залишаються в цьому браузері та в хмарах.",
      settingsHintLocal:
        "Data stays in this browser locally until you connect to the calendar by secret key.",
      resetSync: "Скинути синхронізацію",
      resetSyncConfirm: "Скинути",
      resetSyncHint:
        "Цей пристрій буде відключено від хмарної синхронізації. Локальні дані залишаться тут.",
      resetSyncTitle: "Скинути синхронізацію?",
      syncSecretKey: "Секретний ключ синхронізації",
      syncSecretLink: "Зв'язати",
      syncConnect: "Підключити",
      syncError:
        "Не вдалося підключитися. Перевірте посилання, PIN і правила Firebase.",
      syncSecretError:
        "Не вдалося підключитися. Перевірте секретний ключ і правила Firebase.",
      syncHint: "Введіть PIN, щоб підключити цей календар.",
      syncPin: "PIN",
      syncTitle: "Підключити синхронізацію",
      dictateTitle: "Диктувати назву",
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
let memberColors = normalizeMemberColors(
  loadJson(MEMBER_COLORS_KEY, settings.memberColors || {}),
  members,
);
let deletedEventIds = normalizeDeletedEventIds(
  loadJson(DELETED_EVENT_IDS_KEY, {}),
);
let language = supportedLanguage(settings.language || navigator.language);
let viewMode = normalizeViewMode(settings.viewMode);
let anchorDate = new Date();
let draftMembers = [];
let draftMemberColors = {};
let openDraftColorMember = "";
let titleRecording = null;
let drag = null;
let activeSnap = null;
let snapSequence = 0;
let pendingDeleteId = "";
let pendingConfirmAction = "";
let suppressCalendarClick = false;
let firebaseServices = null;
let syncCalendarKey = localStorage.getItem(SYNC_SECRET_KEY) || "";
let syncCalendarRef = null;
let syncUnsubscribe = null;
let syncConnecting = false;
let pendingUrlSecretKey = "";

if (
  Object.prototype.hasOwnProperty.call(settings, "anchorDate") ||
  Object.prototype.hasOwnProperty.call(settings, "memberColors")
) {
  saveSettings();
}
saveSharedLocalState();

applyLanguage();
render();
startInitialSync();
window.setInterval(refreshCurrentTimeIndicators, 60 * 1000);

talkButton.addEventListener("click", (event) => {
  event.preventDefault();
  appMenu.hidden = !appMenu.hidden;
});
talkButton.addEventListener("contextmenu", (event) => event.preventDefault());
titleDictateButton.addEventListener("click", startTitleDictation);
speechText.addEventListener("pointerdown", enableTitleEditing);

calendar.addEventListener("pointerdown", startDrag);
calendar.addEventListener("pointermove", moveDrag);
calendar.addEventListener("pointerup", finishDrag);
calendar.addEventListener("pointercancel", cancelDrag);
calendar.addEventListener("click", openNewEventFromClick);
window.addEventListener("resize", refreshTrackLayout);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});

dayViewButton.addEventListener("click", () => setViewMode("day"));
weekViewButton.addEventListener("click", () => setViewMode("week"));
monthViewButton.addEventListener("click", () => setViewMode("month"));

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
document.querySelector("#cancelDelete").addEventListener("click", () => {
  pendingConfirmAction = "";
  pendingDeleteId = "";
  confirmDialog.close();
});
document.querySelector("#cancelSync").addEventListener("click", () => {
  pendingUrlSecretKey = "";
  syncDialog.close();
});

resetSyncButton.addEventListener("click", confirmResetSync);
linkSyncButton.addEventListener("click", linkSyncFromSettings);
syncSecretKey.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  linkSyncFromSettings();
});

syncForm.addEventListener("submit", (event) => {
  event.preventDefault();
  connectFromPin();
});

deleteEvent.addEventListener("click", () => {
  if (!eventId.value) return;
  pendingDeleteId = eventId.value;
  openConfirmDialog({
    action: "delete-event",
    title: label("deleteTitle"),
    hint: label("deleteHint"),
    confirm: label("confirmDelete"),
  });
});

confirmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pendingConfirmAction === "delete-event") {
    if (!pendingDeleteId) return;
    const deletedAt = Date.now();
    events = events.filter((entry) => entry.id !== pendingDeleteId);
    deletedEventIds[pendingDeleteId] = deletedAt;
    saveSharedLocalState();
    syncDeleteEvent(pendingDeleteId, deletedAt);
    pendingDeleteId = "";
    pendingConfirmAction = "";
    confirmDialog.close();
    eventDialog.close();
    render();
    return;
  }

  if (pendingConfirmAction === "reset-sync") {
    pendingConfirmAction = "";
    confirmDialog.close();
    resetSync();
  }
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
    updatedAt: Date.now(),
  };

  if (eventId.value) {
    events = events.map((item) => (item.id === eventId.value ? entry : item));
  } else {
    events.push(entry);
  }

  delete deletedEventIds[entry.id];
  saveSharedLocalState();
  syncUpsertEvent(entry);
  eventDialog.close();
  render();
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  commitSettingsFormState();
  syncSharedSettings();
  settingsDialog.close();
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
});

eventTime.addEventListener("change", () => {
  eventEndTime.value = eventTime.value ? shiftTime(eventTime.value, 60) : "";
});

eventAllDay.addEventListener("change", () => {
  applyAllDayState();
});

function setViewMode(nextMode) {
  const normalized = normalizeViewMode(nextMode);
  viewMode = normalized;
  appMenu.hidden = true;
  const today = new Date();
  if (viewMode === "month") {
    anchorDate = new Date(today.getFullYear(), today.getMonth(), 1);
  } else if (viewMode === "week") {
    anchorDate = startOfWeek(today);
  } else {
    anchorDate = startOfDay(today);
  }
  saveSettings();
  render();
}

function render() {
  calendar.className = `calendar ${viewMode}-view`;
  calendar.innerHTML = "";

  const track = document.createElement("div");
  track.className = "calendar-track";

  const base = viewBaseDate(anchorDate);
  const stepDate = viewStepDate();
  const renderer = viewRenderer();

  for (let offset = -2; offset <= 3; offset++) {
    const panel = document.createElement("div");
    panel.className =
      offset >= 0 && offset <= 1
        ? "calendar-panel"
        : "calendar-panel calendar-panel-buffer";
    panel.dataset.panelOffset = String(offset);
    panel.append(renderer(stepDate(base, offset)));
    track.append(panel);
  }

  calendar.append(track);
  refreshTrackLayout();
  refreshCurrentTimeIndicators();

  updateMenuLabels();
}

function viewBaseDate(date) {
  if (viewMode === "month") {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  if (viewMode === "week") return startOfWeek(date);

  return startOfDay(date);
}

function viewStepDate() {
  if (viewMode === "month") return (date, n) => addMonths(date, n);
  if (viewMode === "week") return (date, n) => addDays(date, n * 7);
  return (date, n) => addDays(date, n);
}

function viewRenderer() {
  if (viewMode === "month") return renderMonth;
  if (viewMode === "week") return renderWeek;
  return renderDay;
}

function updateMenuLabels() {
  addEventButton.textContent = label("add");
  dayViewButton.textContent = label("menuDay");
  weekViewButton.textContent = label("menuWeek");
  monthViewButton.textContent = label("menuMonth");
  settingsButton.textContent = label("menuSettings");
  dayViewButton.setAttribute("aria-current", viewMode === "day" ? "page" : "false");
  weekViewButton.setAttribute(
    "aria-current",
    viewMode === "week" ? "page" : "false",
  );
  monthViewButton.setAttribute(
    "aria-current",
    viewMode === "month" ? "page" : "false",
  );
}

function renderDay(day) {
  const dateKey = toDateKey(day);
  const holidayKeys = new Set(holidayEvents([day]).map((entry) => entry.date));
  const dayEvents = events
    .filter((entry) => entry.date === dateKey)
    .sort(compareEvents);

  const view = document.createElement("section");
  view.className = [
    "single-day",
    sameDate(day, new Date()) ? "today" : "",
    day.getDay() === 0 || holidayKeys.has(dateKey) ? "special" : "",
  ]
    .filter(Boolean)
    .join(" ");
  view.dataset.date = dateKey;

  const header = document.createElement("div");
  header.className = "single-day-header";

  const weekday = document.createElement("div");
  weekday.className = "single-day-weekday";
  weekday.textContent = t().weekdays[day.getDay()];

  const number = document.createElement("div");
  number.className = "single-day-number";
  number.textContent = day.getDate();

  const title = document.createElement("div");
  title.className = "single-day-title";
  title.textContent = `${standaloneMonthName(day.getMonth())} ${day.getFullYear()}`;

  header.append(weekday, number, title);
  view.append(header, renderDaySchedule(dayEvents, day));
  return view;
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
    dayEl.dataset.date = dateKey;

    const dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.innerHTML = `<span class="weekday">${t().weekdays[day.getDay()]}</span><span class="number">${day.getDate()}</span>`;

    dayEl.append(
      dateEl,
      renderDayBody(dayEvents, { date: day, showHours: true }),
    );
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
    dayEl.dataset.date = dateKey;

    const number = document.createElement("div");
    number.className = "month-number";
    number.textContent = day.getDate();

    dayEl.append(
      number,
      renderMonthEvents(dayEvents),
    );
    grid.append(dayEl);
  });

  month.append(grid);
  return month;
}

function renderMonthEvents(dayEvents) {
  const list = document.createElement("div");
  list.className = "month-events";
  dayEvents.forEach((entry) => {
    list.append(
      renderEventBar(entry, {
        fullDay: true,
        month: true,
      }),
    );
  });
  return list;
}

function renderDaySchedule(dayEvents, day) {
  const allDay = dayEvents.filter(isAllDay);
  const timed = dayEvents.filter((entry) => !isAllDay(entry));
  const currentTimeMin = dayCurrentMinute({ date: day });
  const hourRange = dayHourRange(timed, currentTimeMin);

  const body = document.createElement("div");
  body.className = "single-day-body";
  body.dataset.date = toDateKey(day);
  body.dataset.startMin = String(hourRange.startMin);
  body.dataset.endMin = String(hourRange.endMin);

  if (allDay.length > 0) {
    const allDayRow = document.createElement("div");
    allDayRow.className = "single-day-all-day";
    allDay.forEach((entry) => {
      allDayRow.append(renderEventBar(entry, { fullDay: true }));
    });
    body.append(allDayRow);
  }

  const timeline = document.createElement("div");
  timeline.className = "single-day-timeline";

  const labels = document.createElement("div");
  labels.className = "single-day-hour-labels";

  const grid = document.createElement("div");
  grid.className = "single-day-grid";

  hourRange.labels.forEach((hour) => {
    const top = `${currentTimePosition(hour * 60, hourRange)}%`;
    const labelEl = document.createElement("span");
    labelEl.className = "single-day-hour-label";
    labelEl.style.top = top;
    labelEl.textContent = hour;
    labels.append(labelEl);

    const tick = document.createElement("div");
    tick.className = "single-day-hour-tick";
    tick.style.top = top;
    grid.append(tick);
  });

  const eventLayer = document.createElement("div");
  eventLayer.className = "single-day-events";
  packDayColumns(timed, hourRange).forEach(({ entry, column, columns }) => {
    const start = clampedStart(entry, hourRange);
    const end = clampedEnd(entry, hourRange);
    const bar = renderEventBar(entry, { vertical: true });
    bar.classList.add("event-bar-vertical");
    bar.style.top = `${(start / hourRange.rangeMin) * 100}%`;
    bar.style.height = `${Math.max(1.5, ((end - start) / hourRange.rangeMin) * 100)}%`;
    bar.style.left = `${(column / columns) * 100}%`;
    bar.style.width = `calc(${100 / columns}% - 4px)`;
    eventLayer.append(bar);
  });

  if (currentTimeMin !== null) {
    const line = renderCurrentTimeMarker(currentTimeMin, hourRange);
    if (line) eventLayer.append(line);
  }

  grid.append(eventLayer);
  timeline.append(labels, grid);
  body.append(timeline);
  return body;
}

function renderDayBody(dayEvents, options = {}) {
  const body = document.createElement("div");
  body.className = options.compact ? "day-body day-body-compact" : "day-body";

  const allDay = dayEvents.filter(isAllDay);
  const timed = dayEvents.filter((entry) => !isAllDay(entry));
  const currentTimeMin = dayCurrentMinute(options);
  const hourRange = dayHourRange(timed, currentTimeMin);
  if (options.date) body.dataset.date = toDateKey(options.date);
  body.dataset.startMin = String(hourRange.startMin);
  body.dataset.endMin = String(hourRange.endMin);

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

  if (currentTimeMin !== null) {
    const line = renderCurrentTimeLine(currentTimeMin, hourRange);
    if (line) lanesEl.append(line);
  }

  timeline.append(lanesEl);
  body.append(timeline);

  return body;
}

function dayCurrentMinute(options) {
  if (!options.date || options.showCurrentTime === false) return null;
  const now = new Date();
  if (!sameDate(options.date, now)) return null;
  return now.getHours() * 60 + now.getMinutes();
}

function renderCurrentTimeLine(minute, hourRange) {
  if (minute < hourRange.startMin || minute > hourRange.endMin) return null;
  const line = document.createElement("div");
  line.className = "current-time-line";
  line.style.left = `${currentTimePosition(minute, hourRange)}%`;
  line.setAttribute("aria-hidden", "true");
  return line;
}

function renderCurrentTimeMarker(minute, hourRange) {
  if (minute < hourRange.startMin || minute > hourRange.endMin) return null;
  const line = document.createElement("div");
  line.className = "current-time-marker";
  line.style.top = `${currentTimePosition(minute, hourRange)}%`;
  line.setAttribute("aria-hidden", "true");
  return line;
}

function currentTimePosition(minute, hourRange) {
  return ((minute - hourRange.startMin) / hourRange.rangeMin) * 100;
}

function refreshCurrentTimeIndicators() {
  const now = new Date();
  const todayKey = toDateKey(now);
  const minute = now.getHours() * 60 + now.getMinutes();
  let needsRender = false;

  calendar.querySelectorAll(".current-time-line").forEach((line) => {
    const body = line.closest(".day-body");
    if (body?.dataset.date !== todayKey) {
      line.remove();
    }
  });
  calendar.querySelectorAll(".current-time-marker").forEach((line) => {
    const body = line.closest(".single-day-body");
    if (body?.dataset.date !== todayKey) {
      line.remove();
    }
  });

  const todayBodies = calendar.querySelectorAll(
    ".day.today .day-body, .month-day.today:not(.outside) .day-body, .single-day.today .single-day-body",
  );

  todayBodies.forEach((body) => {
    const lanes = body.querySelector(".lanes, .single-day-events");
    const line = body.querySelector(
      ".current-time-line, .current-time-marker",
    );
    const startMin = Number(body.dataset.startMin);
    const endMin = Number(body.dataset.endMin);
    if (
      !lanes ||
      !Number.isFinite(startMin) ||
      !Number.isFinite(endMin) ||
      endMin <= startMin
    ) {
      return;
    }

    if (minute < startMin || minute > endMin) {
      needsRender = true;
      return;
    }

    const position = ((minute - startMin) / (endMin - startMin)) * 100;
    if (line) {
      if (line.classList.contains("current-time-marker")) {
        line.style.top = `${position}%`;
      } else {
        line.style.left = `${position}%`;
      }
      return;
    }

    needsRender = true;
  });

  if (needsRender && !drag) render();
}

function renderEventBar(entry, options = {}) {
  const bar = document.createElement("button");
  bar.type = "button";
  bar.className = options.fullDay ? "event-bar fullday" : "event-bar";
  if (options.month) bar.classList.add("month-event-bar");
  bar.addEventListener("click", () => openExistingEvent(entry));
  bar.style.background = eventBackground(entry);

  const timeText = formatTimeRange(entry);
  const eventText = formatEventBarText(entry);
  const label = options.compact
    ? entry.title
    : options.month && timeText
      ? `${timeText} ${eventText}`
    : options.vertical && timeText
      ? `${timeText} ${eventText}`
      : eventText;
  bar.textContent = label;
  bar.title = options.vertical || !timeText ? label : `${timeText} ${label}`;
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

function dayHourRange(entries, currentTimeMin = null) {
  let startMin = HOUR_START * 60;
  let endMin = HOUR_END * 60;

  entries.forEach((entry) => {
    const eventStart = eventStartMinute(entry);
    if (eventStart === null) return;
    startMin = Math.min(startMin, eventStart);
    endMin = Math.max(endMin, eventEndMinute(entry, eventStart));
  });

  if (Number.isFinite(currentTimeMin)) {
    startMin = Math.min(startMin, currentTimeMin);
    endMin = Math.max(endMin, currentTimeMin);
  }

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
  const match = String(time || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const h = Number(match[1]);
  const m = Number(match[2]);
  if (
    !Number.isInteger(h) ||
    !Number.isInteger(m) ||
    h < 0 ||
    h > 23 ||
    m < 0 ||
    m > 59
  ) {
    return null;
  }

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

function packDayColumns(entries, range) {
  const sorted = [...entries].sort((a, b) => {
    const startDiff = clampedStart(a, range) - clampedStart(b, range);
    if (startDiff) return startDiff;
    return clampedEnd(b, range) - clampedEnd(a, range);
  });
  const columns = [];
  const packed = [];

  sorted.forEach((entry) => {
    const start = clampedStart(entry, range);
    let column = columns.findIndex((lastEnd) => lastEnd <= start);
    if (column === -1) {
      column = columns.length;
      columns.push(0);
    }
    columns[column] = clampedEnd(entry, range);
    packed.push({ entry, column });
  });

  const columnCount = Math.max(1, columns.length);
  return packed.map((item) => ({ ...item, columns: columnCount }));
}

function startTitleDictation() {
  if (titleRecording) {
    titleRecording.stop();
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    enableTitleEditing();
    return;
  }

  const recognition = new SpeechRecognition();
  let transcript = "";
  titleRecording = recognition;
  recognition.lang = t().speechLang;
  recognition.interimResults = true;
  recognition.continuous = false;
  titleDictateButton.classList.add("listening");
  speechText.readOnly = true;

  recognition.onresult = (event) => {
    transcript = [...event.results]
      .map((result) => result[0].transcript)
      .join(" ")
      .trim();
    if (transcript) {
      speechText.value = transcript;
    }
  };

  recognition.onerror = stopTitleDictation;
  recognition.onend = stopTitleDictation;

  recognition.start();
}

function stopTitleDictation() {
  titleRecording = null;
  titleDictateButton.classList.remove("listening");
}

function enableTitleEditing() {
  speechText.readOnly = false;
  speechText.focus({ preventScroll: true });
  speechText.setSelectionRange(
    speechText.value.length,
    speechText.value.length,
  );
}

function startDrag(event) {
  if (!usesSwipeTrack()) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (event.target.closest("button, input, select, textarea, dialog")) return;
  completeActiveSnap();
  const track = calendar.querySelector(".calendar-track");
  if (!track) return;
  const panelWidth = getPanelWidth(track);
  if (!panelWidth) return;
  drag = {
    id: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    deltaX: 0,
    deltaY: 0,
    panelWidth,
    track,
    newEvent: newEventFromPointer(event),
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
  drag.deltaY = event.clientY - drag.startY;
  if (viewMode === "week" && !usesSingleWeekPanels()) {
    const progress = weekProgressFromDelta(drag.deltaX);
    setWeekTrackProgress(drag.track, progress);
    if (event.cancelable) event.preventDefault();
    return;
  }
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
  const deltaY = drag.deltaY;
  const track = drag.track;
  const panelWidth = getPanelWidth(track) || drag.panelWidth;
  const newEvent = drag.newEvent;
  drag = null;
  const movement = Math.hypot(deltaX, deltaY);
  if (newEvent && movement < TAP_MOVE_THRESHOLD) {
    resetTrack(track);
    suppressNextCalendarClick();
    openEventDialog(newEvent);
    return;
  }

  suppressNextCalendarClick();
  if (viewMode === "week") {
    const singleWeekPanels = usesSingleWeekPanels();
    const thresholdWidth = singleWeekPanels
      ? panelWidth
      : getCalendarViewportWidth();
    const threshold = Math.min(160, thresholdWidth * 0.18);
    if (Math.abs(deltaX) < threshold) {
      if (singleWeekPanels) {
        snapSingleWeekTrack(track, 0);
      } else {
        snapWeekTrack(track, 0);
      }
      return;
    }

    const direction = deltaX < 0 ? 1 : -1;
    if (singleWeekPanels) {
      snapSingleWeekTrack(track, -direction * panelWidth, () => {
        anchorDate = addDays(anchorDate, direction * 7);
        saveSettings();
        render();
      });
      return;
    }

    snapWeekTrack(track, direction, () => {
      anchorDate = addDays(anchorDate, direction * 7);
      saveSettings();
      render();
    });
    return;
  }

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
        : addDays(anchorDate, direction);
    saveSettings();
    render();
  });
}

function cancelDrag() {
  const track = drag ? drag.track : null;
  drag = null;
  if (track) {
    if (viewMode === "week" && usesSingleWeekPanels()) {
      snapSingleWeekTrack(track, 0);
    } else if (viewMode === "week") {
      snapWeekTrack(track, 0);
    } else {
      snapTrack(track, 0);
    }
  }
}

function usesSwipeTrack() {
  return true;
}

function resetTrack(track) {
  track.classList.remove("sliding");
  if (viewMode === "week" && usesSingleWeekPanels()) {
    clearWeekTrackProgress(track);
  } else if (viewMode === "week") {
    setWeekTrackProgress(track, 0);
  } else {
    track.style.transform = "";
  }
}

function snapTrack(track, offset, done) {
  track.classList.add("sliding");
  setTrackOffset(track, offset);
  scheduleSnapCompletion(track, SWIPE_ANIMATION_MS, () => {
    if (done) {
      done();
    } else {
      track.classList.remove("sliding");
      track.style.transform = "";
    }
  });
}

function snapWeekTrack(track, progress, done) {
  track.classList.add("sliding");
  setWeekTrackProgress(track, progress);
  scheduleSnapCompletion(track, WEEK_SWIPE_ANIMATION_MS, () => {
    if (done) {
      done();
    } else {
      track.classList.remove("sliding");
      setWeekTrackProgress(track, 0);
    }
  });
}

function snapSingleWeekTrack(track, offset, done) {
  track.classList.add("sliding");
  setTrackOffset(track, offset);
  scheduleSnapCompletion(track, WEEK_SWIPE_ANIMATION_MS, () => {
    if (done) {
      done();
    } else {
      track.classList.remove("sliding");
      clearWeekTrackProgress(track);
    }
  });
}

function scheduleSnapCompletion(track, duration, complete) {
  const token = ++snapSequence;
  if (activeSnap) completeActiveSnap();

  const timeoutId = window.setTimeout(() => {
    if (!activeSnap || activeSnap.token !== token) return;
    activeSnap = null;
    complete();
  }, duration + 20);

  activeSnap = {
    token,
    track,
    timeoutId,
    complete,
  };
}

function completeActiveSnap() {
  if (!activeSnap) return;
  const snap = activeSnap;
  activeSnap = null;
  window.clearTimeout(snap.timeoutId);
  snap.complete();
}

function getPanelWidth(track) {
  return track.querySelector(".calendar-panel")?.getBoundingClientRect().width;
}

function usesSingleWeekPanels() {
  return viewMode === "week" && window.matchMedia?.(SINGLE_WEEK_MEDIA).matches;
}

function setTrackOffset(track, offset, panelWidth = getPanelWidth(track)) {
  const base = -(panelWidth || window.innerWidth) * ACTIVE_PANEL_INDEX;
  track.style.transform = `translate3d(${base + offset}px, 0, 0)`;
}

function weekProgressFromDelta(deltaX) {
  const width = getCalendarViewportWidth();
  const travel = width * WEEK_CURRENT_WIDTH_RATIO;
  if (!travel) return 0;
  return Math.max(-1, Math.min(1, -deltaX / travel));
}

function setWeekTrackProgress(track, rawProgress) {
  const progress = Math.max(-1, Math.min(1, rawProgress));
  const width = getCalendarViewportWidth();
  const panels = [...track.querySelectorAll(".calendar-panel")];
  const panelWidths = new Map();
  const currentWidth = width * WEEK_CURRENT_WIDTH_RATIO;
  const previewWidth = width * WEEK_PREVIEW_WIDTH_RATIO;
  const widthDelta = currentWidth - previewWidth;

  panels.forEach((panel) => {
    const offset = Number(panel.dataset.panelOffset);
    let panelWidth = previewWidth;
    if (progress >= 0) {
      if (offset === 0) panelWidth = currentWidth - widthDelta * progress;
      if (offset === 1) panelWidth = previewWidth + widthDelta * progress;
    } else {
      const backProgress = -progress;
      if (offset === -1) panelWidth = previewWidth + widthDelta * backProgress;
      if (offset === 0) panelWidth = currentWidth - widthDelta * backProgress;
    }

    panel.style.flexBasis = `${panelWidth}px`;
    panel.style.width = `${panelWidth}px`;
    panel.classList.toggle("calendar-panel-current", panelWidth > previewWidth);
    panel.classList.toggle(
      "calendar-panel-preview",
      panelWidth <= previewWidth,
    );
    panelWidths.set(offset, panelWidth);
  });

  const activeLeft = panels.reduce((sum, panel) => {
    const offset = Number(panel.dataset.panelOffset);
    return offset < 0 ? sum + (panelWidths.get(offset) || 0) : sum;
  }, 0);

  let translate;
  if (progress >= 0) {
    const activeWidth = panelWidths.get(0) || previewWidth;
    const nextLeft = activeLeft + activeWidth;
    const targetNextLeft = (1 - progress) * currentWidth;
    translate = targetNextLeft - nextLeft;
  } else {
    const backProgress = -progress;
    const previousWidth = panelWidths.get(-1) || previewWidth;
    translate = -activeLeft + previousWidth * backProgress;
  }

  track.style.transform = `translate3d(${translate}px, 0, 0)`;
}

function clearWeekTrackProgress(track) {
  track.style.transform = "";
  track.querySelectorAll(".calendar-panel").forEach((panel) => {
    panel.style.flexBasis = "";
    panel.style.width = "";
    panel.classList.remove("calendar-panel-current", "calendar-panel-preview");
  });
}

function getCalendarViewportWidth() {
  return calendar.getBoundingClientRect().width || window.innerWidth;
}

function refreshTrackLayout() {
  if (viewMode !== "week" || drag) return;
  const track = calendar.querySelector(".calendar-track");
  if (!track) return;
  if (usesSingleWeekPanels()) {
    clearWeekTrackProgress(track);
  } else {
    setWeekTrackProgress(track, 0);
  }
}

function openNewEventFromClick(event) {
  if (suppressCalendarClick) return;
  if (event.target.closest("button, input, select, textarea, dialog")) return;
  const parsed = newEventFromPoint(event.clientX, event.clientY, event.target);
  if (!parsed) return;
  event.preventDefault();
  appMenu.hidden = true;
  openEventDialog(parsed);
}

function suppressNextCalendarClick() {
  suppressCalendarClick = true;
  window.setTimeout(() => {
    suppressCalendarClick = false;
  }, 400);
}

function newEventFromPointer(event) {
  return newEventFromPoint(event.clientX, event.clientY, event.target);
}

function newEventFromPoint(clientX, clientY, fallbackTarget) {
  const pointTarget = document.elementFromPoint(clientX, clientY);
  const dayEl =
    pointTarget?.closest(".day, .month-day, .single-day") ||
    fallbackTarget?.closest(".day, .month-day, .single-day");
  if (!dayEl?.dataset.date) return null;

  const parsed = {
    raw: "",
    date: dayEl.dataset.date,
  };

  if (viewMode === "week" && dayEl.classList.contains("day")) {
    const time = timeFromWeekPoint(dayEl, clientX);
    if (time) {
      parsed.time = time;
      parsed.endTime = shiftTime(time, 60);
      parsed.allDay = false;
    }
  }

  if (viewMode === "day" && dayEl.classList.contains("single-day")) {
    const time = timeFromDayPoint(dayEl, clientY);
    if (time) {
      parsed.time = time;
      parsed.endTime = shiftTime(time, 60);
      parsed.allDay = false;
    }
  }

  return parsed;
}

function timeFromWeekPoint(dayEl, clientX) {
  const body = dayEl.querySelector(".day-body");
  const lanes = dayEl.querySelector(".lanes");
  if (!body || !lanes) return "";

  const startMin = Number(body.dataset.startMin);
  const endMin = Number(body.dataset.endMin);
  if (
    !Number.isFinite(startMin) ||
    !Number.isFinite(endMin) ||
    endMin <= startMin
  )
    return "";

  const rect = lanes.getBoundingClientRect();
  if (!rect.width) return "";
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  const minute = roundToStep(
    startMin + percent * (endMin - startMin),
    CREATE_TIME_ROUND_STEP,
  );
  return minutesToTime(Math.max(0, Math.min(23 * 60, minute)));
}

function timeFromDayPoint(dayEl, clientY) {
  const body = dayEl.querySelector(".single-day-body");
  const eventsLayer = dayEl.querySelector(".single-day-events");
  if (!body || !eventsLayer) return "";

  const startMin = Number(body.dataset.startMin);
  const endMin = Number(body.dataset.endMin);
  if (
    !Number.isFinite(startMin) ||
    !Number.isFinite(endMin) ||
    endMin <= startMin
  )
    return "";

  const rect = eventsLayer.getBoundingClientRect();
  if (!rect.height) return "";
  const percent = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
  const minute = roundToStep(
    startMin + percent * (endMin - startMin),
    CREATE_TIME_ROUND_STEP,
  );
  return minutesToTime(Math.max(0, Math.min(23 * 60, minute)));
}

function roundToStep(minute, step) {
  return Math.round(minute / step) * step;
}

function minutesToTime(minute) {
  const normalized = ((minute % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
}

function openEventDialog(parsed) {
  eventId.value = "";
  deleteEvent.hidden = true;
  eventDialogTitle.textContent = label("newEvent");
  document.querySelector("#saveEvent").textContent = label("add");
  fillEventForm(parsed);
  eventDialog.showModal();
  eventDialogTitle.focus({ preventScroll: true });
}

function openExistingEvent(entry) {
  eventId.value = entry.id;
  deleteEvent.hidden = false;
  eventDialogTitle.textContent = label("editEvent");
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
  eventDialogTitle.focus({ preventScroll: true });
}

function fillEventForm(parsed) {
  if (titleRecording) titleRecording.stop();
  stopTitleDictation();
  speechText.readOnly = true;
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
  updateSettingsFormFromState();
  syncSecretKey.value = "";
  setSettingsSyncError("");
  updateSyncSettingsVisibility();
  settingsDialog.showModal();
  settingsTitle.focus({ preventScroll: true });
}

function updateSettingsFormFromState() {
  languageSelect.value = language;
  membersInput.value = members.join(", ");
  draftMembers = [...members];
  draftMemberColors = normalizeMemberColors(memberColors, draftMembers);
  openDraftColorMember = "";
  renderSettingsMemberColors();
}

function commitSettingsFormState() {
  language = languageSelect.value;
  members = parseMemberInput(membersInput.value);
  memberColors = normalizeMemberColors(draftMemberColors, members);
  saveSharedLocalState();
  saveSettings();
  applyLanguage();
  render();
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
    colorButton.setAttribute("aria-label", name);

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
        swatch.disabled = colorUsedByOtherMember(
          color,
          name,
          draftMemberColors,
        );
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

function renderMemberChoices(selected = []) {
  const selectedMembers = Array.isArray(selected) ? selected : [];
  memberChoices.innerHTML = "";

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
    input.checked = selectedMembers.includes(name);
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
  let title = raw.trim();

  for (const cleaner of titleCleaners()) {
    title = title.replace(cleaner, " ").replace(/\s+/g, " ").trim();
  }

  return {
    raw,
    date: parsedDate,
    time: parsedTime,
    title: title || label("untitled"),
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
  titleDictateButton.setAttribute("aria-label", label("dictateTitle"));
  titleDictateButton.title = label("dictateTitle");
  updateMenuLabels();
  eventDialogTitle.textContent = label("newEvent");
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
  document.querySelector("#syncSecretKeyLabel").textContent =
    label("syncSecretKey");
  document.querySelector("#linkSync").textContent = label("syncSecretLink");
  document.querySelector("#resetSync").textContent = label("resetSync");
  document.querySelector("#cancelSettings").textContent = label("cancel");
  document.querySelector("#saveSettings").textContent = label("save");
  document.querySelector("#syncTitle").textContent = label("syncTitle");
  document.querySelector("#syncHint").textContent = label("syncHint");
  document.querySelector("#syncPinLabel").textContent = label("syncPin");
  document.querySelector("#cancelSync").textContent = label("cancel");
  document.querySelector("#connectSync").textContent = label("syncConnect");
  document.querySelector("#cancelDelete").textContent = label("cancel");
  if (pendingConfirmAction === "reset-sync") {
    setConfirmDialogText({
      title: label("resetSyncTitle"),
      hint: label("resetSyncHint"),
      confirm: label("resetSyncConfirm"),
    });
  } else {
    setConfirmDialogText({
      title: label("deleteTitle"),
      hint: label("deleteHint"),
      confirm: label("confirmDelete"),
    });
  }
  updateSyncSettingsVisibility();
}

function supportedLanguage(value) {
  const code = String(value || "")
    .slice(0, 2)
    .toLowerCase();
  return ["de", "en", "uk"].includes(code) ? code : "en";
}

function normalizeViewMode(value) {
  return VIEW_MODES.includes(value) ? value : "week";
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

function standaloneMonthName(index) {
  return t().standaloneMonths[index];
}

function formatRange(days) {
  const first = days[0];
  const last = days[days.length - 1];
  const firstMonth = standaloneMonthName(first.getMonth());
  const lastMonth = standaloneMonthName(last.getMonth());
  return first.getMonth() === last.getMonth()
    ? firstMonth
    : `${firstMonth} - ${lastMonth}`;
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

function compareEvents(a, b) {
  return `${a.date} ${a.time || "00:00"} ${a.title}`.localeCompare(
    `${b.date} ${b.time || "00:00"} ${b.title}`,
  );
}

function startInitialSync() {
  const url = new URL(window.location.href);
  const urlSecretKey = url.searchParams.get("secretKey") || "";

  if (syncCalendarKey) {
    connectToSyncCalendar(syncCalendarKey, { persist: true, removeUrl: true });
    return;
  }

  if (urlSecretKey) openSyncPinDialog(urlSecretKey);
}

function openSyncPinDialog(secretKey) {
  pendingUrlSecretKey = secretKey.trim();
  syncPin.value = "";
  setSyncError("");
  syncDialog.showModal();
  syncTitle.focus({ preventScroll: true });
}

async function connectFromPin() {
  if (!pendingUrlSecretKey || syncConnecting) return;
  const pin = syncPin.value.trim();
  if (pin.length !== PIN_LENGTH) {
    setSyncError(label("syncError"));
    return;
  }

  const calendarKey = `${pendingUrlSecretKey}${pin}`;
  if (!isValidCalendarKey(calendarKey)) {
    setSyncError(label("syncError"));
    return;
  }

  const connected = await connectToSyncCalendar(calendarKey, {
    persist: true,
    removeUrl: true,
    showError: true,
  });
  if (!connected) return;

  pendingUrlSecretKey = "";
  syncDialog.close();
}

async function linkSyncFromSettings() {
  if (syncConnecting) return;
  const calendarKey = parseSecretKeyInput(syncSecretKey.value);
  if (!isValidCalendarKey(calendarKey)) {
    setSettingsSyncError(label("syncSecretError"));
    return;
  }

  commitSettingsFormState();
  linkSyncButton.disabled = true;
  setSettingsSyncError("");
  const connected = await connectToSyncCalendar(calendarKey, {
    persist: true,
    removeUrl: true,
  });
  linkSyncButton.disabled = false;

  if (!connected) {
    setSettingsSyncError(label("syncSecretError"));
    return;
  }

  syncSecretKey.value = "";
  updateSettingsFormFromState();
  updateSyncSettingsVisibility();
}

async function connectToSyncCalendar(calendarKey, options = {}) {
  if (!calendarKey || syncConnecting) return false;
  syncConnecting = true;
  document.querySelector("#connectSync").disabled = true;
  setSyncError("");

  try {
    const services = await loadFirebaseServices();
    const calendarRef = services.doc(services.db, "calendars", calendarKey);
    const snapshot = await services.getDoc(calendarRef);

    if (snapshot.exists()) {
      applyRemoteCalendar(snapshot.data());
    } else {
      await services.setDoc(
        calendarRef,
        serializeCalendarState(
          currentCalendarState(),
          services.serverTimestamp,
        ),
      );
    }

    syncCalendarKey = calendarKey;
    syncCalendarRef = calendarRef;
    if (options.persist) localStorage.setItem(SYNC_SECRET_KEY, calendarKey);
    if (options.removeUrl) removeSecretKeyFromUrl();
    updateSyncSettingsVisibility();
    startSyncListener(services, calendarRef);
    return true;
  } catch (error) {
    console.error("Calendar sync failed", error);
    if (options.showError) setSyncError(label("syncError"));
    return false;
  } finally {
    syncConnecting = false;
    document.querySelector("#connectSync").disabled = false;
  }
}

async function loadFirebaseServices() {
  if (firebaseServices) return firebaseServices;
  if (!hasFirebaseConfig()) throw new Error("Firebase config is missing.");

  const [{ initializeApp }, firestore] = await Promise.all([
    import(
      `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`
    ),
    import(
      `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`
    ),
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  firebaseServices = {
    db: firestore.getFirestore(app),
    doc: firestore.doc,
    getDoc: firestore.getDoc,
    onSnapshot: firestore.onSnapshot,
    runTransaction: firestore.runTransaction,
    serverTimestamp: firestore.serverTimestamp,
    setDoc: firestore.setDoc,
  };
  return firebaseServices;
}

function hasFirebaseConfig() {
  return Boolean(
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.appId,
  );
}

function isValidCalendarKey(calendarKey) {
  return Boolean(calendarKey && !calendarKey.includes("/"));
}

function parseSecretKeyInput(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed, window.location.href);
    return (url.searchParams.get("secretKey") || trimmed).trim();
  } catch {
    return trimmed;
  }
}

function startSyncListener(services, calendarRef) {
  if (syncUnsubscribe) syncUnsubscribe();
  syncUnsubscribe = services.onSnapshot(
    calendarRef,
    (snapshot) => {
      if (!snapshot.exists()) return;
      applyRemoteCalendar(snapshot.data());
    },
    (error) => {
      console.error("Calendar sync listener failed", error);
    },
  );
}

function resetSync() {
  if (syncUnsubscribe) syncUnsubscribe();
  syncUnsubscribe = null;
  syncCalendarRef = null;
  syncCalendarKey = "";
  pendingUrlSecretKey = "";
  localStorage.removeItem(SYNC_SECRET_KEY);
  removeSecretKeyFromUrl();
  updateSyncSettingsVisibility();
}

function removeSecretKeyFromUrl() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("secretKey")) return;
  url.searchParams.delete("secretKey");
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", nextUrl);
}

function setSyncError(message) {
  syncError.textContent = message;
  syncError.hidden = !message;
}

function setSettingsSyncError(message) {
  settingsSyncError.textContent = message;
  settingsSyncError.hidden = !message;
}

function confirmResetSync() {
  if (!syncCalendarKey) return;
  openConfirmDialog({
    action: "reset-sync",
    title: label("resetSyncTitle"),
    hint: label("resetSyncHint"),
    confirm: label("resetSyncConfirm"),
  });
}

function openConfirmDialog({ action, title, hint, confirm }) {
  pendingConfirmAction = action;
  setConfirmDialogText({ title, hint, confirm });
  confirmDialog.showModal();
  document.querySelector("#confirmTitle").focus({ preventScroll: true });
}

function setConfirmDialogText({ title, hint, confirm }) {
  document.querySelector("#confirmTitle").textContent = title;
  document.querySelector("#confirmHint").textContent = hint;
  document.querySelector("#confirmDelete").textContent = confirm;
}

function updateSyncSettingsVisibility() {
  const linked = Boolean(syncCalendarKey);
  syncSettings.hidden = linked;
  resetSyncButton.hidden = !linked;
  document.querySelector("#settingsHint").textContent = label(
    linked ? "settingsHint" : "settingsHintLocal",
  );
}

function syncUpsertEvent(entry) {
  writeCalendarTransaction((remote) => {
    const deleted = { ...remote.deletedEventIds };
    if ((deleted[entry.id] || 0) <= entry.updatedAt) delete deleted[entry.id];
    return {
      ...remote,
      events: mergeEventLists(remote.events, [entry], deleted),
      deletedEventIds: deleted,
    };
  });
}

function syncDeleteEvent(id, deletedAt) {
  writeCalendarTransaction((remote) => {
    const deleted = mergeDeletedEventIds(remote.deletedEventIds, {
      [id]: deletedAt,
    });
    return {
      ...remote,
      events: mergeEventLists(remote.events, [], deleted),
      deletedEventIds: deleted,
    };
  });
}

function syncSharedSettings() {
  writeCalendarTransaction((remote) => {
    const deleted = mergeDeletedEventIds(
      remote.deletedEventIds,
      deletedEventIds,
    );
    return {
      ...remote,
      events: mergeEventLists(remote.events, events, deleted),
      members,
      memberColors,
      deletedEventIds: deleted,
    };
  });
}

async function writeCalendarTransaction(updateState) {
  if (!syncCalendarKey) return;

  try {
    const services = await loadFirebaseServices();
    if (!syncCalendarRef) {
      syncCalendarRef = services.doc(services.db, "calendars", syncCalendarKey);
    }

    await services.runTransaction(services.db, async (transaction) => {
      const snapshot = await transaction.get(syncCalendarRef);
      const remote = snapshot.exists()
        ? normalizeCalendarState(snapshot.data())
        : emptyCalendarState();
      const next = updateState(remote);
      transaction.set(
        syncCalendarRef,
        serializeCalendarState(next, services.serverTimestamp),
      );
    });
  } catch (error) {
    console.error("Calendar sync write failed", error);
  }
}

function applyRemoteCalendar(rawData) {
  const remote = normalizeCalendarState(rawData);
  deletedEventIds = mergeDeletedEventIds(
    deletedEventIds,
    remote.deletedEventIds,
  );
  events = mergeEventLists(events, remote.events, deletedEventIds);
  members = remote.members;
  memberColors = normalizeMemberColors(remote.memberColors, members);
  saveSharedLocalState();
  render();
}

function currentCalendarState() {
  return normalizeCalendarState({
    events,
    members,
    memberColors,
    deletedEventIds,
  });
}

function emptyCalendarState() {
  return {
    events: [],
    members: [],
    memberColors: {},
    deletedEventIds: {},
  };
}

function normalizeCalendarState(rawData) {
  const data = rawData && typeof rawData === "object" ? rawData : {};
  const normalizedMembers = normalizeMembers(data.members);
  return {
    events: normalizeEvents(data.events),
    members: normalizedMembers,
    memberColors: normalizeMemberColors(data.memberColors, normalizedMembers),
    deletedEventIds: normalizeDeletedEventIds(data.deletedEventIds),
  };
}

function normalizeEvents(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry) => entry && typeof entry === "object" && entry.id)
    .map((entry) => ({
      id: String(entry.id),
      date: typeof entry.date === "string" ? entry.date : "",
      allDay: Boolean(entry.allDay),
      time: typeof entry.time === "string" ? entry.time : "",
      endTime: typeof entry.endTime === "string" ? entry.endTime : "",
      title: typeof entry.title === "string" ? entry.title : label("untitled"),
      members: normalizeMembers(entry.members),
      updatedAt: Number.isFinite(Number(entry.updatedAt))
        ? Number(entry.updatedAt)
        : 0,
    }))
    .filter((entry) => entry.date);
}

function normalizeMembers(value) {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(value.map((name) => String(name || "").trim()).filter(Boolean)),
  ];
}

function normalizeDeletedEventIds(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([id, timestamp]) => [id, Number(timestamp)])
      .filter(([id, timestamp]) => id && Number.isFinite(timestamp)),
  );
}

function mergeDeletedEventIds(...sources) {
  return sources.reduce((result, source) => {
    Object.entries(normalizeDeletedEventIds(source)).forEach(
      ([id, timestamp]) => {
        result[id] = Math.max(result[id] || 0, timestamp);
      },
    );
    return result;
  }, {});
}

function mergeEventLists(baseEvents, incomingEvents, deletedIds) {
  const merged = new Map();
  [...normalizeEvents(baseEvents), ...normalizeEvents(incomingEvents)].forEach(
    (entry) => {
      const saved = merged.get(entry.id);
      if (!saved || entry.updatedAt >= saved.updatedAt) {
        merged.set(entry.id, entry);
      }
    },
  );

  return [...merged.values()].filter(
    (entry) => (deletedIds[entry.id] || 0) < entry.updatedAt,
  );
}

function serializeCalendarState(state, serverTimestampValue) {
  const normalized = normalizeCalendarState(state);
  return {
    schemaVersion: 1,
    events: normalized.events.map((entry) => ({ ...entry })),
    members: [...normalized.members],
    memberColors: { ...normalized.memberColors },
    deletedEventIds: { ...normalized.deletedEventIds },
    updatedAt: serverTimestampValue(),
  };
}

function saveSharedLocalState() {
  saveJson(STORAGE_KEY, events);
  saveJson(MEMBER_KEY, members);
  saveJson(MEMBER_COLORS_KEY, memberColors);
  saveJson(DELETED_EVENT_IDS_KEY, deletedEventIds);
}

function saveSettings() {
  saveJson(SETTINGS_KEY, {
    language,
    viewMode,
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
