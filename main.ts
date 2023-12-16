input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    motor = 1
    basic.showNumber(motor)
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
    oBuffer.setNumber(NumberFormat.UInt32LE, 0, qwiicjoystick.readJoystick(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20)))
    if (motor == 1) {
        oBuffer.setNumber(NumberFormat.Int8LE, 2, 0)
    } else if (motor == 2) {
        oBuffer.setNumber(NumberFormat.UInt8LE, 1, 128)
        oBuffer.setNumber(NumberFormat.Int8LE, 2, qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.D_100_100)[1])
    } else {
        oBuffer.setNumber(NumberFormat.UInt8LE, 1, 128)
        oBuffer.setNumber(NumberFormat.Int8LE, 2, 0)
    }
    radio.sendNumber(oBuffer.getNumber(NumberFormat.UInt32LE, 0))
})
