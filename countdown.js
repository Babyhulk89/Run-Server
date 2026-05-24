"use strict";

let timer = null;
let eventName = null;
let eventDate = null;
let messageLbl = null;

const getElement = (selector) => document.querySelector(selector);

const displayCountdown = () => {
  const now = new Date();
  let seconds = Math.floor((eventDate.getTime() - now.getTime()) / 1000);

  if (seconds <= 0) {
    clearInterval(timer);
    messageLbl.textContent = `Hooray! Today is ${eventName}!`;
    return;
  }

  const days = Math.floor(seconds / 86400);
  seconds %= 86400;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const msg = `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s) until ${eventName}!`;

  messageLbl.textContent = msg;
};

document.addEventListener("DOMContentLoaded", () => {

  getElement("#countdown").addEventListener("click", () => {

    clearInterval(timer);

    eventName = getElement("#event").value.trim();
    const eventDateString = getElement("#date").value;
    messageLbl = getElement("#message");

    if (eventName === "" || eventDateString === "") {
      messageLbl.textContent = "Please enter both a name and a date.";
      return;
    }

    eventDate = new Date(eventDateString);

    if (isNaN(eventDate.getTime())) {
      messageLbl.textContent = "Please enter a valid date.";
      return;
    }

    const today = new Date();
    const msFromToday = eventDate.getTime() - today.getTime();
    const msForOneDay = 24 * 60 * 60 * 1000;
    const daysToDate = Math.ceil(msFromToday / msForOneDay);

    const displayDate = eventDate.toDateString();
    let msg = "";

    if (daysToDate === 0) {
      msg = `Hooray! Today is ${eventName}! (${displayDate})`;
    } else if (daysToDate > 0) {
      timer = setInterval(displayCountdown, 1000);
      msg = `${daysToDate} day(s) until ${eventName}! (${displayDate})`;
    } else {
      msg = `${eventName} happened ${Math.abs(daysToDate)} day(s) ago. (${displayDate})`;
    }

    messageLbl.textContent = msg;
  });

  getElement("#event").focus();
});