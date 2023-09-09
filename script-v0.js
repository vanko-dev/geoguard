import { azLicense } from './license';

document
  .querySelector('#start-az')
  .addEventListener('click', () => start(AZ_SETTINGS));

const yesNo = document.querySelector('#yes-no');
const yes = document.querySelector('#yes');
const no = document.querySelector('#no');

const wakeUpLink = document.querySelector('#wake-up');
function start() {
  console.log('go');

  yesNo.classList.add('hide');

  const client = GCOobee.createClient();

  client.geolocate(
    AZ_SETTINGS,
    (data) => {
      console.log(new Date().toLocaleTimeString(), 'middle', data);

      const APP_REQUIRED = GCOobee.utils.browser.is.android
        ? client._androidAppRequire()
        : client._iosAppRequire();

      if (
        data.type === APP_REQUIRED.type &&
        data.reason === APP_REQUIRED.reason
      ) {
        wakeUpLink.classList.remove('hide');
        wakeUpLink.href = APP_REQUIRED.link;

        data.no();
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
