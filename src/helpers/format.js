export const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
    m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
    return `${h}:${m}'`;
  }
  export const truncateString = (str, length, lastText) => {
    return str && str?.length > length ? str.substring(0, length) + (lastText || '...') : str;
  };
  