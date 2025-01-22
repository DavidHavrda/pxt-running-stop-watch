radio.setGroup(77)
Sensors.SetLightLevel()
let mil1: number;
let milsum: number;

let cancheck: boolean = false

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Sensors.SetLightLevel()
})
radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber === 1) {
        mil1 = control.millis()
        cancheck = true
    } else if (receivedNumber === 0) {
        basic.showNumber(0)
        cancheck = false
    }
})
Sensors.OnLightDrop(function () {
    let mil2;
    if (cancheck) {
        mil2 = control.millis()
        milsum = (mil2 - mil1) / 1000
        radio.sendNumber(milsum)
        basic.pause(1000)
        basic.showNumber(milsum)
    }
    
})
input.onButtonPressed(Button.B, function () {
    cancheck = false
    radio.sendNumber(0)
})
input.onButtonPressed(Button.A, function () {

    if (cancheck) {
        basic.showNumber(milsum)
    }
})
input.onButtonPressed(Button.AB, function() {
    radio.sendNumber(0)
})