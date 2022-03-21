# inpost-api-emulator

A simple API emulator for [inpost mobile app](https://play.google.com/store/apps/details?id=pl.inpost.inmobile) designed to test how the app reacts based on data returned by the API.

All data served by this api is fake, It's a mockup.

## testing on a real app

To test on a real app you need to install the self signed certificate on the device/emulator (it needs to be in the system store so root access and read/write access to the system partition is required. Installing to the user store does not seem to work as the app only trusts system certificates).

After you have installed the certificate you need to redirect the `domain api-inmobile-pl.easypack24.net` to an ip address this API emulator is running on. This can be done bye either editing the hosts file, adding it manually to your local dns server, forwarding it using your routers firewall or using an app that can rewrite dns.

this project uses [nodejs](https://nodejs.org/) and [yarn](https://yarnpkg.com/). Make sure you have them installed before continuing.

To run the emulator first clone this repository and install the dependencies by running
```shell
yarn
```
and the start using
```shell
yarn start
```
NOTE: The emulator need to run with admin/root preengages as it needs to listen on port 443.

Now just clear app's data and register using 123456789 and any 6 digit sms code