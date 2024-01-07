input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    motor = 1
    basic.showNumber(motor)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    qwiicjoystick.clearButtonStatus(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    motor = 2
    basic.showNumber(motor)
})
let motor = 0
let oBuffer = i2c.create(4)
radio.setGroup(3)
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
motor = 1
basic.showNumber(motor)
loops.everyInterval(500, function () {
    qwiicjoystick.comment("0: Seil; 1: drehen; 2: Arm; 3 Button war gedrückt")
    oBuffer.setNumber(NumberFormat.UInt32LE, 0, qwiicjoystick.readJoystick(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20)))
    if (pins.digitalReadPin(DigitalPin.C16) == 0) {
        qwiicjoystick.comment("Elektromagnet: 120:aus; 121: an")
        basic.setLedColor(0xffffff)
        oBuffer.setNumber(NumberFormat.Int8LE, 2, 120)
    } else if (pins.digitalReadPin(DigitalPin.C17) == 0) {
        basic.setLedColor(0x0000ff)
        oBuffer.setNumber(NumberFormat.Int8LE, 2, 121)
    } else if (motor == 1) {
        oBuffer.setNumber(NumberFormat.Int8LE, 2, 0)
    } else if (motor == 2) {
        oBuffer.setNumber(NumberFormat.UInt8LE, 1, 128)
        oBuffer.setNumber(NumberFormat.Int8LE, 2, qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.D_100_100)[1])
    } else {
        basic.turnRgbLedOff()
        oBuffer.setNumber(NumberFormat.UInt8LE, 1, 128)
        oBuffer.setNumber(NumberFormat.Int8LE, 2, 0)
    }
    radio.sendNumber(oBuffer.getNumber(NumberFormat.UInt32LE, 0))
})
