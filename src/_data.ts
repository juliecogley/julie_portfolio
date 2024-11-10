export const cacheBuster = `${new Date().getTime()}`;
export const todaysDateYYYYMMDD = `${new Date().toISOString().split("T")[0]}`;

// export const todaysDateYYYYMMDD2 = `${new Date().toISOString().slice(0, 10)}`;

export const todaysDateJAJP = `${new Date().toLocaleString('ja-JP',{ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}`;

const response = await fetch('https://holidays-jp.github.io/api/v1/date.json', {
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Accept': 'application/json'
  }
});
const holidays = await response.json();

export {
  holidays,
};
