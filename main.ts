input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    motor = 1
    basic.showNumber(motor)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    qwiicjoystick.clearButtonStatus(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
})
function kranjoystick61 () {
    qwiicjoystick.comment("Erweiterungen")
    qwiicjoystick.comment("radio")
    qwiicjoystick.comment("calliope-net/i2c")
    qwiicjoystick.comment("calliope-net/joystick")
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    motor = 2
    basic.showNumber(motor)
})
let aJoy: number[] = []
let motor = 0
radio.setGroup(3)
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
motor = 1
basic.showNumber(motor)
loops.everyInterval(500, function () {
    qwiicjoystick.comment("sende Zahl 4 Byte: 0: Seil; 1: drehen; 2: Arm (-100..+100); 2 Magnet (120,121); 3 Button war gedrückt")
    aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255, -4, 0)
    qwiicjoystick.setSendeZahl(NumberFormat.UInt8LE, qwiicjoystick.eOffset.z3, aJoy[3])
    if (pins.digitalReadPin(DigitalPin.C16) == 0) {
        qwiicjoystick.comment("weiße Taste: Elektromagnet: 120:aus")
        basic.setLedColor(0xffffff)
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z2, 120)
    } else if (pins.digitalReadPin(DigitalPin.C17) == 0) {
        qwiicjoystick.comment("blaue Taste: Elektromagnet: 121: an")
        basic.setLedColor(0x0000ff)
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z2, 121)
    } else if (motor == 1) {
        qwiicjoystick.comment("")
        qwiicjoystick.setSendeZahl(NumberFormat.UInt8LE, qwiicjoystick.eOffset.z0, 128)
        qwiicjoystick.setSendeZahl(NumberFormat.UInt8LE, qwiicjoystick.eOffset.z1, aJoy[1])
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z2, Math.round(Math.map(aJoy[0], 0, 255, -100, 100)))
    } else if (motor == 2) {
        qwiicjoystick.comment("nur Seil rollen")
        qwiicjoystick.setSendeZahl(NumberFormat.UInt8LE, qwiicjoystick.eOffset.z0, aJoy[0])
        qwiicjoystick.setSendeZahl(NumberFormat.UInt8LE, qwiicjoystick.eOffset.z1, 128)
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z2, 0)
    } else {
        basic.turnRgbLedOff()
    }
    radio.sendNumber(qwiicjoystick.getSendeZahl())
})
