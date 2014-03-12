/* global alert, console */
'use strict';
// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
            var installationInstructions =
document.querySelector('#installation-instructions');
            if (installationInstructions) {
                installationInstructions.style.display = 'none';
            }
        }
        else {
            var install = document.querySelector('#install'),
                manifestURL =
location.href.substring(0, location.href.lastIndexOf('/')) + '/manifest.webapp';
            install.className = 'show-install';
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                installApp.onsuccess = function(data) {
                    install.style.display = 'none';
                };
                installApp.onerror = function() {
                    alert('Install failed\n\n:' + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log('Open Web Apps not supported');
}

// Reload content
var reload = document.querySelector('#reload');
if (reload) {
    reload.onclick = function () {
        location.reload(true);
    };
}

navigator.mozSetMessageHandler('bluetooth-pairing-request', function (message) {
  // Get the information about the pairing request
  var request = message.detail;

  // Log the name of the remote device that wants to be paired with your device
  console.log(request.name);
});

var adapter;

// Retreving the local device adapter is asynchronous, handle this carefully.
navigator.mozBluetooth.getDefaultAdapter().success = function(evt) {
  adapter = evt.target.result;
};


function onPairing(message) {
  var response,
      request = message.detail,
      passkey = request.passkey;

  switch (request.method) {
    case 'confirmation':
      // Make sure the passkey is a string
      passkey = String(passkey);
      // Make sure the string is 6 characters long (pad with 0 if necessary)
      passkey = (new Array((6 - passkey.length) + 1)).join('0') + passkey;
      // Let's prompt the user
      response =
confirm('Is that same number visible on the remote device screen: ' + passkey);
      // Let's send the confirmation
      adapter.setPairingConfirmation(request.address, response);
      break;

    case 'pincode':
      // Let's prompt the user
      response = prompt('Thanks to provide the remote device PIN code');
      // Let's send the pin code
      adapter.setPinCode(request.address, response);
      break;

    case 'passkey':
      // Let's prompt the user
      response =
alert('Thanks to type the following code on the remote device');
      // Let's send back the passkey
      adapter.setPasskey(request.address, response);
      break;
  }
}
 
navigator.mozSetMessageHandler('bluetooth-pairing-request', onPairing);

adapter.onpairedstatuschanged = function (evt) {
  if (evt.status) {
    alert('The pairing operation has been successfully completed');
  } else {
    alert('The pairing operation has failed. Please, try again');
  }
};
