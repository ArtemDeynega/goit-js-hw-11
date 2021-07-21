const refs = {
    body = document.querySelector('body'),
  startBtn = document.querySelector('[data-action="stop"]'),
  stopBtn = document.querySelector('[data-action="stop"]'),
}










function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}