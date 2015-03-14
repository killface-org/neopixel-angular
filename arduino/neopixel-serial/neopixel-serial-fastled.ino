#include <FastLED.h>
#define NUM_LEDS 12
#define DATA_PIN 3

CRGB leds[NUM_LEDS];

const int NP_SHOW = 25;
const int NP_SET_BRIGHT = 26;
const int NP_SET_COLOR_ALL = 27;
const int NP_SET_COLOR = 28;

int brightness = 0;

void setup() {
  // put your setup code here, to run once:
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  Serial.begin(115200);
  for (int i=0; i < NUM_LEDS; i++) {
    leds[i].r = 0;
    leds[i].g = 0;
    leds[i].b = 0;
  }
  FastLED.show();
}

void setBrightness() {
  int commandCode = Serial.read();
  while (Serial.available() < 1) {
  }
  
  brightness = Serial.read();
  FastLED.setBrightness(brightness);
  Serial.print("{\"brightness\":");
  Serial.print(brightness);
  Serial.println("}");
}

void setColorAll() {
  int commandCode = Serial.read();
  while (Serial.available() < 3) {
  }

  int r = Serial.read();
  int g = Serial.read();
  int b = Serial.read();

  for (int i=0; i < NUM_LEDS; i++) {
    leds[i].r = r;
    leds[i].g = g;
    leds[i].b = b;
  }
}

void setColor() {
  int commandCode = Serial.read();
  while (Serial.available() < 4) {
  }
  int p = Serial.read();
  int r = Serial.read();
  int g = Serial.read();
  int b = Serial.read();
  leds[p].r = r;
  leds[p].g = g;
  leds[p].b = b;
}

void showState() {
  Serial.print("[");
  for (int i=0; i < NUM_LEDS; i++) {
    Serial.print("{");
    Serial.print("\"i\":");
    Serial.print(i);
    Serial.print(",\"r\":");
    Serial.print(leds[i].r);
    Serial.print(",\"g\":");
    Serial.print(leds[i].g);
    Serial.print(",\"b\":");
    Serial.print(leds[i].b);
    if (i == (NUM_LEDS -1)) {
      Serial.print("}");
    } else {
      Serial.print("},");
    }
  }  
  Serial.println("]");
}

void loop() {
  if (Serial.available() > 0) {
    int commandCode = Serial.peek();
    //Serial.print("{blah:");
    //Serial.println(commandCode);
    switch (commandCode) {
      case NP_SHOW:
        commandCode = Serial.read();
        FastLED.show();
        showState();
        break;
      case NP_SET_BRIGHT:
        setBrightness();
        break;
      case NP_SET_COLOR_ALL:
        setColorAll();
        break;
      case NP_SET_COLOR:
        setColor();
        break;
    }
  }   
}
