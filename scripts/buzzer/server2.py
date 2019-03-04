from gpiozero import LED, Button

led = LED(5)
button = Button(6)

print("yo yo yo")
while True:
    button.wait_for_press()
    print("pressed")
    button.wait_for_release()
    print("released")