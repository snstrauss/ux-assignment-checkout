UX Course Exercise
==============
Checkout Form
----------

This is a simple mock checkout form, used for an exercise in a UX class.

See It Live!
----
Just open [this link](http://ux-checkout.surge.sh) on your mobile device.

**IMPORTANT!**

Only open this on a mobile device, this example is **NOT** responsive, and will only work on mobile.

Description
---
The Checkout form has 3 steps -
- Personal Details
- Delivery Address / Pickup Option
- Payment Method / Paypal

Each step will be locked until the previous step is filled in a valid manner. Done steps can be navigated to, using the accordion labels, or the stepper icons.

Each Field will validate itself on the moment of losing focus, telling the user if something is wrong. In the case of an invalid field, each change will trigger a validation check, letting the user know that the input is valid without the need to leave the field focus.

Helpful texts are under more complex fields, and appear in all fields, in the case of an invalid input.

Run it Yourself
----
```
$ git clone https://github.com/snstrauss/ux-assignment-checkout.git ux-checkout
$ cd ux-checkout
$ npm install
$ npm run start
```