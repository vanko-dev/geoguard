import { azLicense } from './license';

document
  .querySelector('#start-az')
  .addEventListener('click', () => start(AZ_SETTINGS));
 
const wakeUpLink = document.querySelector('#wake-up');
function start() {
  console.log('go');

  const client = GCOobee.createClient();

  client.geolocate(
    AZ_SETTINGS,
    (data) => {
      console.log(new Date().toLocaleTimeString(), 'middle', data);

      //
      // client.generateWakeupURLSchema()

      if (data.type === 'INTERACTION') {
        if (data.reason === 'app_required') {
          wakeUpLink.classList.remove('hide');
          wakeUpLink.href = client.generateIntentURI();
        }

        if (
          data.reason === 'location_required' ||
          data.reason === 'precise_location_required' ||
          data.reason === 'notification_required' ||
          data.reason === 'app_update_required'
        ) {
          wakeUpLink.classList.remove('hide');
          wakeUpLink.href = client.generateWakeupURLSchema();
        }

        data?.no();
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
