/**
* ble_uart_gamepad
*/
//% color=#ff0000  icon="\uf11b" block="gamepad" blockId="gamepad"
namespace ble_uart_gamepad
{
    let rcv: number[] = []

    /**
    * ButtonList
    */
    export enum ButtonList {
        //% block="A" enumval=0
        A,
        //% block="B" enumval=1
        B,
        //% block="X" enumval=2
        X,
        //% block="Y" enumval=3
        Y,
        //% block="LEFT_BUMPER" enumval=4
        LEFT_BUMPER,
        //% block="RIGHT_BUMPER" enumval=5
        RIGHT_BUMPER,
        //% block="LEFT_TRIGGER" enumval=6
        LEFT_TRIGGER,
        //% block="RIGHT_TRIGGER" enumval=7
        RIGHT_TRIGGER,
        //% block="START" enumval=8
        START,
        //% block="SELECT" enumval=9
        SELECT,
        //% block="LEFT_JOYSTICK" enumval=10
        LEFT_JOYSTICK,
        //% block="RIGHT_JOYSTICK" enumval=11
        RIGHT_JOYSTICK,
        //% block="DPAD_UP" enumval=12
        DPAD_UP,
        //% block="DPAD_DOWN" enumval=13
        DPAD_DOWN,
        //% block="DPAD_LEFT" enumval=14
        DPAD_LEFT,
        //% block="DPAD_RIGHT" enumval=15
        DPAD_RIGHT
    }

    /**
    * AxisList
    */
    export enum AxisList {
        //% block="LEFT_JOYSTICK_X" enumval=0
        LEFT_JOYSTICK_X,
        //% block="LEFT_JOYSTICK_Y" enumval=1
        LEFT_JOYSTICK_Y,
        //% block="RIGHT_JOYSTICK_X" enumval=2
        RIGHT_JOYSTICK_X,
        //% block="RIGHT_JOYSTICK_Y" enumval=3
        RIGHT_JOYSTICK_Y,
        //% block="LEFT_TRIGGER" enumval=4
        LEFT_TRIGGER,
        //% block="RIGHT_TRIGGER" enumval=5
        RIGHT_TRIGGER
    }

    /**
     * Get state of gamepad button (0 or 1)
     * @param num button number (0-15)
     */
    //% weight=90
    //% num.min=0
    //% num.max=15
    //% blockId="isButtonPressed" block="Is button %num pressed"
    export function button_is_pressed(num: ButtonList) {
        if (num >= 0 && num < 16) {
            return (rcv[6] & (2 ** num)) > 0 ? 1 : 0
        } else {
            return 0
        }
    }

    /**
     * Get value of gamepad axis (-100, 100)
     * @param num axis
     * @param minV the lower bound of the value's target range
     * @param maxV the upper bound of the value's target range
     */
    //% weight=70
    //% blockId="getAxisValueRange" block="Get value of axis %num|| range (%minV,%maxV)"
    //% num.min=0
    //% num.max=5
    //% minV.defl=-100
    //% maxV.defl=100
    //% compileHiddenArguments=1
    //% expandableArgumentBreaks="2"
    export function axis_value_range(num: AxisList, minV: number, maxV: number) {
        if (num >= 0 && num < 6) {
            return Math.map(rcv[num], -100, 100, minV, maxV)
        } else {
            return 0
        }
    }

    export function data_received() {
        let str = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        rcv = []
        for (let i = 0; i <= 5; i++) {
            rcv.push(parseInt(str.substr(i * 2, 2), 16) - 100)
        }
        rcv.push(parseInt(str.substr(6 * 2), 16))
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), ble_uart_gamepad.data_received)
