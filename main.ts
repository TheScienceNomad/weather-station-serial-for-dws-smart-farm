function UpdateWindDirection () {
    Wind_Direction = parseFloat(Raw_Data.substr(7, 3))
}
function UpateTemp () {
    Temp = parseFloat(Raw_Data.substr(56, 3))
}
function UpdateWeatherData () {
    UpateTemp()
    UpdateWindDirection()
    UpdateHumidity()
    UpdateRainFall()
    UpdateWindSpeed()
    UpdateSoilMoisture()
}
bluetooth.onBluetoothConnected(function () {
    isconnected = 1
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    serial.redirect(
    SerialPin.P13,
    SerialPin.P14,
    BaudRate.BaudRate9600
    )
    serial.setRxBufferSize(128)
    serial.setTxBufferSize(128)
})
function UpdateHumidity () {
    Humidity = Raw_Data.substr(61, 3)
}
function UpdateRainFall () {
    Rain_Total = parseFloat(Raw_Data.substr(31, 4))
}
function UpdateSoilMoisture () {
    Soil_Moisture = pins.analogReadPin(AnalogPin.P0)
}
function UpdateWindSpeed () {
    Wind_Speed = parseFloat(Raw_Data.substr(16, 4))
}
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    Raw_Data = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    UpdateWeatherData()
})
let Wind_Speed = 0
let Soil_Moisture = 0
let Rain_Total = 0
let Humidity = ""
let Temp = 0
let Raw_Data = ""
let Wind_Direction = 0
let isconnected = 0
isconnected = 0
basic.showIcon(IconNames.SmallHeart)
basic.pause(2000)
bluetooth.startUartService()
loops.everyInterval(10000, function () {
    if (isconnected == 1) {
        bluetooth.uartWriteLine("Humidity=" + Humidity)
        basic.pause(500)
        bluetooth.uartWriteLine("Temp=" + Temp)
        basic.pause(500)
        bluetooth.uartWriteLine("Wind=" + Wind_Speed)
        basic.pause(500)
        bluetooth.uartWriteLine("Rain=" + Rain_Total)
        basic.pause(500)
        bluetooth.uartWriteLine("Dir=" + Wind_Direction)
        basic.pause(500)
        bluetooth.uartWriteLine("Update=true")
    }
})
basic.forever(function () {
	
})
