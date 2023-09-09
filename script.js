import { azLicense } from './license.js';

document
  .querySelector('#start-az')
  .addEventListener('click', () => start(AZ_SETTINGS));

const yesNo = document.querySelector('#yes-no');
const reason = document.querySelector('#reason');

let yes = null;
let no = null;

document.querySelector('#yes').addEventListener('click', () => {
  console.log('yes', yes);
  yes?.();
});
document.querySelector('#no').addEventListener('click', () => {
  console.log('no', no);
  no?.();
});

function start() {
  console.log('go');

  yes = null;
  no = null;
  reason.textContent = '';
  yesNo.classList.add('hide');

  const client = GCOobee.createClient();

  client.geolocate(
    AZ_SETTINGS,
    (data) => {
      console.log(new Date().toLocaleTimeString(), 'middle', data);

      if (data.type === 'INTERACTION') {
        yesNo.classList.remove('hide');
        reason.textContent = data.reason;
        yes = data.yes;
        no = data.no;
      }
    },
    (err, data) => {
      console.log(new Date().toLocaleTimeString(), 'final', err, data);
    }
  );

  console.log('===finished===');
}

const AZ_SETTINGS = {
  license: azLicense,
  userId: 'test@user.com',
  oobeeUrl: 'https://us7-stg-oobee-v2.geocomply.net/',
  reason: 'test',
  autoOpenAppStore: false,
  autoOpenPlayAppStore: false,
  enablePlayStorePopUp: false,
  useTrueLocationBrowser: false,
  geoTimeout: 10,
};
