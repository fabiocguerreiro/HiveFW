package pt.hivefw.companion

import android.app.Activity
import no.nordicsemi.android.dfu.DfuBaseService

/**
 * Foreground Nordic/Adafruit DFU service used for Heltec T114 updates.
 *
 * The T114 firmware already exposes Bluefruit BLEDfu and the release pipeline
 * publishes an nrfutil ZIP, so no custom transport is required on nRF52.
 */
class HiveFwDfuService : DfuBaseService() {
    override fun getNotificationTarget(): Class<out Activity> = MainActivity::class.java

    override fun isDebug(): Boolean = false
}
