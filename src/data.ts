import {DateTime} from 'luxon';

export const PHONE_NUMBER = '123456789';
export const EMAIL_ADDRESS = 'this.is@a.test';
export const FULL_NAME = 'This Is A Test';

export const PARCELS = {
  '123456789098765432101234': {
    shipmentNumber: '123456789098765432101234',
    shipmentType: 'parcel', // enum (courier, parcel, letter)
    openCode: '123456', // code to open the compartment
    qrCode: `P|${PHONE_NUMBER}|123456`, // phone number and openCode combined (Not sure if the "P" stands for parcel or something else)

    parcelSize: 'A',
    receiver: { // data of the person receiving the package ()
      email: EMAIL_ADDRESS,
      phoneNumber: PHONE_NUMBER,
      name: EMAIL_ADDRESS,
      // in theory address can also be present (maybe when using their courier)
    },
    sender: {
      //* if the app fails to decode the response it will use the last known state. Add some randomness to make it easier to debug
      name: 'Fake sender ' + Math.random(),
    },
    pickUpPoint: {
      name: 'ABC123', // unique alphanumeric code for a pickup pace
      location: { // GPS coordinates of the pickup spot (used for the "Navigate" button)
        latitude: 1,
        longitude: 1,
      },
      locationDescription: 'Fake', // description shown below address
      openingHours: '24/7', // only shown in the app when location247 is true
      addressDetails: { // pickup point address
        postCode: '00-000',
        city: 'Fake',
        province: 'fake',
        street: 'Fake',
        buildingNumber: '69'
      },
      virtual: 0, // changes icon (It's an int but acts as a boolean, anything over 0 will act as true)
      type: [ // ! this does not seem to be present in the app
        'parcel_locker' // TODO: check other types?
      ],
      location247: true, // warns about holidays
      doubled: true, // other pickup sports near by
      imageUrl: 'https://i.kym-cdn.com/entries/icons/original/000/001/030/DButt.jpg',
      easyAccessZone: false, // does not change anything visually?
      airSensor: true, // is air senor present at the pickup place
      airSensorData: {
        updatedUntil: DateTime.now().toJSDate(), // last update time
        weather: { // wether information at the pickup place (not sure if this is from a weather station or just from a weather api)
          humidity: 9000,
          pressure: 9000,
          temperature: 9000,
        },
        pollutants: { // polutant levels detected at the pickup place
          no2: {percent: 100, value: 9000},
          o3: {percent: 100, value: 9000},
          pm10: {percent: 100, value: 9000},
          pm25: {percent: 100, value: 9000},
        },
        airQuality: 'VERY_BAD', // enum (VERY_GOOD, GOOD, MODERATE, SATISFACTORY, BAD, VERY_BAD),
      },
      // pointType: 'PL', // enum (PL, POP, PLZ, POPZ) //TODO what is this
      paymentType: { // TODO, explore this
        '2': '???' // this will make the card icon appear in the pickup point's description page
      }
    },
    observed: false, // set when we don't own the package (hides pickup codes)
    endOfWeekCollection: true, // exactly what it sounds (nice purple btw)
    operations: {
      manualArchive: true, // when false hides the archive button
      delete: true, // shows the delete button (only visible after archiving, you can also swipe to the side on the home screen)
      collect: true, // allows remote opening
      expandAvizo: false, // allow purchasing extra pickup time
      highlight: true, // TODO no idea, maybe something to do with sorting?
      refreshUntil: DateTime.now().plus({months: 3}).toJSDate(), // TODO check what this does
      requestEasyAccessZone: 'ALLOWED', // enum (DISALLOWED, ALLOWED). Allows requesting easy access spot. //! Not implemented in this emulator at the moment
      voicebot: true, // TODO no idea, maybe some accessibility thing?
      redirectionUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // shows redirect package button (visually overlaps with expandAvizo)
    },
    status: 'READY_TO_PICKUP',
    eventLog: [
      {
        type: 'PARCEL_STATUS',
        name: 'READY_TO_PICKUP',
        date: DateTime.now().minus({days: 1}).toJSDate(),
      },
      {
        type: 'PARCEL_STATUS',
        name: 'OUT_FOR_DELIVERY',
        date: DateTime.now().minus({days: 2}).toJSDate(),
      },
      {
        type: 'PARCEL_STATUS',
        name: 'ADOPTED_AT_SOURCE_BRANCH',
        date: DateTime.now().minus({days: 3}).toJSDate(),
      },
      {
        type: 'PARCEL_STATUS',
        name: 'SENT_FROM_SOURCE_BRANCH',
        date: DateTime.now().minus({days: 4}).toJSDate(),
      },
      {
        type: 'PARCEL_STATUS',
        name: 'COLLECTED_FROM_SENDER',
        date: DateTime.now().minus({days: 5}).toJSDate(),
      },
      {
        type: 'PARCEL_STATUS',
        name: 'CONFIRMED',
        date: DateTime.now().minus({days: 6}).toJSDate(),
      }
    ],
    // enum (COMPLETED, PROCESSING, REJECTED, NONE)
    // NONE is the default
    // PROCESSING will keep refreshing the details page
    // REJECTED will show an error message.
    // COMPLETED will hide the prompt to buy.
    avizoTransactionStatus: 'NONE',
    courierPhoneNumber: '123456789', // shows call courier button if present
    inEasyAccessZone: true, // shows note about package being in an easy access zone
    mobileCollectPossible: false, // doesn't seem to change anything
    expiryDate: DateTime.now().plus({days: 1}).toJSDate(), // till when we have time to pick it up
    storedDate: DateTime.now().minus({days: 1}).toJSDate(), // when was it placed in the locker
    pickUpDate: DateTime.now().toJSDate(), // time when the package was picked up (will show even if it was never picked up but that would never happen in the real api)
    // returnedToSenderDate: DateTime.now().toJSDate() // TODO check when this is used

    // i dont think this will show up for lockers (or maybe, idk)
    // TODO research this
    cashOnDelivery: {
      paid: true,
      payCode: '123123',
      price: '100.00',
      transactionStatus: 'PROCESSING', // enum (COMPLETED, PROCESSING, REJECTED, NONE)
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },

    // multiCompartment hes not have the required api routes and is still unexplored
    // TODO find a package that was part of one an analyze responses
    // multiCompartment: {
    //   collected: false,
    //   presentation: true,
    //   shipmentNumbers: ['123456789098765432101234'],
    //   uuid: '735a40bb-915d-4923-a0e9-c1096683e100',
    // }
  },
};
