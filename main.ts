let rcv: number[] = []
let str = ""
function button_is_pressed (num: number) {
    if (num >= 0 && num < 16) {
        return rcv[6] & (2 ** num)
    } else {
        return 0
    }
}
function axis_value (num: number, min: number, max: number) {
    if (num >= 0 && num < 6) {
        return rcv[num]
    } else {
        return 0
    }
}
// rcv = .split(/.{1,2}/g)
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    str = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    rcv = []
    for (let i = 0; i <= 5; i++) {
        rcv.push(parseInt(str.substr(i * 2, 2), 16) - 100)
    }
    rcv.push(parseInt(str.substr(6 * 2), 16))
})
basic.forever(function () {
	
})
