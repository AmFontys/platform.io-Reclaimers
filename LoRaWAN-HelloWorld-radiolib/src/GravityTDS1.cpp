#include "GravityTDS1.h"

#include <EEPROM.h>

namespace GAIT {

    GravityTDS::GravityTDS(uint8_t pin, float vcc, uint16_t adcResolution)
        : pin(pin)
        , vcc(vcc)
        , adcResolution(adcResolution) {
    }

    void GravityTDS::setup() {
        EEPROM.begin(64); // A maximum of 64 bytes can be used
        
        gravityTds.setPin(pin);
        gravityTds.setAref(vcc);               // reference voltage on ADC, default 5.0V on Arduino UNO
        gravityTds.setAdcRange(adcResolution); // 1024 for 10bit ADC;4096 for 12bit ADC
        gravityTds.begin();                    // initialization
    }

    float GravityTDS::getValue(float temperature) {
        gravityTds.setTemperature(temperature); // set the temperature and execute temperature compensation
        gravityTds.update();                    // sample and calculate
        
        EEPROM.commit(); // Commit changes

        return gravityTds.getTdsValue(); // then get the value
    }

} // namespace GAIT
