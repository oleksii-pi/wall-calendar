I have a Firebase account. I want to have secured access a shared calendar without account authentication on multiple devices. I can share a secret key via messengers, and the calendar should be in sync. Make the implementation as simple as possible.

I want part of the secret key (say, the last 4 characters) to be a "PIN code" to increase security. The URL will be sent over messenger (https://oleksii-pi.github.io/wall-calendar/?secretKey=d5a6972b-c723-4c28-a493-f0ea1c95), but the PIN (0d75) can be entered manually or sent via a different channel. Then, in the case of a successful connection to Firestore, the full secret will be stored in local storage.

calendars/{calendarKey}
Document shape:
{
schemaVersion: 1,
events: [],
members: [],
memberColors: {},
updatedAt: serverTimestamp()
}

There should be a button in the settings labeled "Reset sync".

Valid calendar keys should be stored in a separate table, so as an admin, it should be easy for me to create and remove keys.

Keep device-local settings local:
language
week/month view

Sync shared calendar content only:
events
people
person colors
