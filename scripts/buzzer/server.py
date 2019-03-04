from gpiozero import LED, Button
#import asyncio

"""
def ButtonPressed(btn, led):
  led.blink(on_time=0.3, off_time=0.3)

def ButtonReleased(btn, led):
  led.off()
"""

yellow = Button(6)
blue = Button(13)
green = Button(26)
red = Button(20)


while True:
    if yellow.is_pressed:
        print("yellow pressed")
    if blue.is_pressed:
        print("blue pressed")
    if red.is_pressed:
        print("red pressed")
    if green.is_pressed:
        print("green pressed")





"""async def main():
  print("mum")
  try:
    # Button setup
    #yellow_led = LED(5)
    #yellow_button = Button(6)

    #blue_led = LED(12)
    #blue_button = Button(13)

    #green_led = LED(19)
    #green_button = Button(26)

    red_led = LED(21)
    red_button = Button(20)
    red_button.when_pressed = red_led.blink
    red_button.when_released = red_led.off

    #gps_btn = gpiozero.Button(gps_button_pin_dict["Sensor"])
    #gps_btn.when_pressed = gps_btn_callback

    while True:
      await asyncio.sleep(15)

  except KeyboardInterrupt:
    print("[!] Keyboard interrupt caught!")

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
"""