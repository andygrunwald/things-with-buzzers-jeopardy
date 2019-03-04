from gpiozero import LED, Button
from signal import pause

yellow = Button(6)
blue = Button(13)
green = Button(26)
red = Button(20)


def yellow_pressed():
	print("Yellow pressed")


def blue_pressed():
	print("Blue pressed")


def green_pressed():
	print("Green pressed")


def red_pressed():
	print("Red pressed")

yellow.when_pressed = yellow_pressed
blue.when_pressed = blue_pressed
green.when_pressed = green_pressed
red.when_pressed = red_pressed

pause()