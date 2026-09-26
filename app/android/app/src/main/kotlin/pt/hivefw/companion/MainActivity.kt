package pt.hivefw.companion

import android.content.Intent
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel
import io.flutter.plugin.common.MethodChannel
import no.nordicsemi.android.dfu.DfuProgressListenerAdapter
import no.nordicsemi.android.dfu.DfuServiceInitiator
import no.nordicsemi.android.dfu.DfuServiceListenerHelper

class MainActivity : FlutterActivity() {
    private val radioServiceChannel = "pt.hivefw.companion/radio_service"
    private val dfuChannel = "pt.hivefw.companion/dfu"
    private val dfuEventsChannel = "pt.hivefw.companion/dfu_events"
    private var dfuEventSink: EventChannel.EventSink? = null

    private val dfuProgressListener = object : DfuProgressListenerAdapter() {
        override fun onDeviceConnecting(deviceAddress: String) = emitDfu("connecting", 0)
        override fun onDeviceConnected(deviceAddress: String) = emitDfu("connected", 0)
        override fun onDfuProcessStarting(deviceAddress: String) = emitDfu("starting", 0)
        override fun onDfuProcessStarted(deviceAddress: String) = emitDfu("started", 0)
        override fun onEnablingDfuMode(deviceAddress: String) = emitDfu("dfu_mode", 0)
        override fun onFirmwareValidating(deviceAddress: String) = emitDfu("validating", 100)
        override fun onDeviceDisconnecting(deviceAddress: String) = emitDfu("disconnecting", 100)
        override fun onDfuCompleted(deviceAddress: String) = emitDfu("completed", 100)
        override fun onDfuAborted(deviceAddress: String) = emitDfu("aborted", 0)

        override fun onProgressChanged(
            deviceAddress: String,
            percent: Int,
            speed: Float,
            avgSpeed: Float,
            currentPart: Int,
            partsTotal: Int
        ) {
            dfuEventSink?.success(
                mapOf(
                    "state" to "uploading",
                    "percent" to percent,
                    "speed" to speed,
                    "avgSpeed" to avgSpeed,
                    "currentPart" to currentPart,
                    "partsTotal" to partsTotal
                )
            )
        }

        override fun onError(
            deviceAddress: String,
            error: Int,
            errorType: Int,
            message: String
        ) {
            dfuEventSink?.success(
                mapOf(
                    "state" to "error",
                    "percent" to 0,
                    "error" to error,
                    "errorType" to errorType,
                    "message" to message
                )
            )
        }
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            radioServiceChannel
        ).setMethodCallHandler { call, result ->
            when (call.method) {
                "startRadioForeground" -> {
                    val radioName = call.argument<String>("radioName") ?: "Radio"
                    startRadioForeground(radioName)
                    result.success(null)
                }
                "updateRadioForeground" -> {
                    val radioName = call.argument<String>("radioName")
                    val noiseFloor = call.argument<Int>("noiseFloor")
                    val lastRssi = call.argument<Int>("lastRssi")
                    val lastSnrDb = call.argument<Double>("lastSnrDb")
                    updateRadioForeground(radioName, noiseFloor, lastRssi, lastSnrDb)
                    result.success(null)
                }
                "stopRadioForeground" -> {
                    stopRadioForeground()
                    result.success(null)
                }
                else -> result.notImplemented()
            }
        }

        EventChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            dfuEventsChannel
        ).setStreamHandler(object : EventChannel.StreamHandler {
            override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
                dfuEventSink = events
            }

            override fun onCancel(arguments: Any?) {
                dfuEventSink = null
            }
        })

        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            dfuChannel
        ).setMethodCallHandler { call, result ->
            when (call.method) {
                "startT114Dfu" -> {
                    val address = call.argument<String>("address")
                    val name = call.argument<String>("name") ?: "HiveFW T114"
                    val filePath = call.argument<String>("filePath")
                    if (address.isNullOrBlank() || filePath.isNullOrBlank()) {
                        result.error("invalid_args", "Endereço BLE ou ficheiro DFU inválido.", null)
                        return@setMethodCallHandler
                    }
                    try {
                        DfuServiceInitiator.createDfuNotificationChannel(this)
                        DfuServiceInitiator(address)
                            .setDeviceName(name)
                            .setKeepBond(true)
                            .setForeground(true)
                            .setNumberOfRetries(3)
                            .setPacketsReceiptNotificationsEnabled(true)
                            .setPacketsReceiptNotificationsValue(8)
                            .setUnsafeExperimentalButtonlessServiceInSecureDfuEnabled(true)
                            .setZip(filePath)
                            .start(this, HiveFwDfuService::class.java)
                        emitDfu("queued", 0)
                        result.success(true)
                    } catch (error: Throwable) {
                        result.error("dfu_start_failed", error.message, null)
                    }
                }
                else -> result.notImplemented()
            }
        }

        DfuServiceListenerHelper.registerProgressListener(this, dfuProgressListener)
    }

    override fun onDestroy() {
        DfuServiceListenerHelper.unregisterProgressListener(this, dfuProgressListener)
        super.onDestroy()
    }

    private fun emitDfu(state: String, percent: Int) {
        dfuEventSink?.success(mapOf("state" to state, "percent" to percent))
    }

    private fun startRadioForeground(radioName: String) {
        val intent = Intent(this, RadioForegroundService::class.java).apply {
            action = RadioForegroundService.ACTION_START
            putExtra(RadioForegroundService.EXTRA_RADIO_NAME, radioName)
        }
        startForegroundService(intent)
    }

    private fun stopRadioForeground() {
        val intent = Intent(this, RadioForegroundService::class.java).apply {
            action = RadioForegroundService.ACTION_STOP
        }
        startService(intent)
    }

    private fun updateRadioForeground(
        radioName: String?,
        noiseFloor: Int?,
        lastRssi: Int?,
        lastSnrDb: Double?
    ) {
        val intent = Intent(this, RadioForegroundService::class.java).apply {
            action = RadioForegroundService.ACTION_UPDATE
            radioName?.let { putExtra(RadioForegroundService.EXTRA_RADIO_NAME, it) }
            noiseFloor?.let { putExtra(RadioForegroundService.EXTRA_NOISE_FLOOR, it) }
            lastRssi?.let { putExtra(RadioForegroundService.EXTRA_LAST_RSSI, it) }
            lastSnrDb?.let { putExtra(RadioForegroundService.EXTRA_LAST_SNR_DB, it) }
        }
        startService(intent)
    }
}
