export vibrate from './vibrate'

export const convertSecondsToTime = (valor) => {
  let date = new Date(valor);
  let minutes = (date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes();
  let seconds = (date.getSeconds() < 10) ? '0'+date.getSeconds() : date.getSeconds();
  return `${minutes}:${seconds}`;
}