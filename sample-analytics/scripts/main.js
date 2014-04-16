(function (global) {
	var $console,
		$startStopMonitor,
		$startStopTrackFeatureA,
		$allButtons,
		messageStartMonitor = "Start Monitor",
		messageStopMonitor = "Stop Monitor",
		messageStartTrackFeature = "Start Time Tracking",
		messageStopTrackFeature = "Stop Time Tracking",
		classActive = "start",
		classInactive = "stop",
		isMonitorStarted = false,
		isFeatureTrackingActive = false,
		version = "0.0.0.1",
		productKey = "", //Provide a valid product key for Telerik Analytics by Telerik
		installationId = "sample@domain.com";

	document.addEventListener("touchstart", function () { }, false);
	document.addEventListener("deviceready", function () { init(); }, false);

	function toggleMonitor(monitor) {
		if (!isMonitorStarted) {
            /**
             * Starting the monitor. Note that none of the tracking calls have any
             * effect before this call. Repeated calls have no effect as only one
             * monitoring session can be started
             * The monitor must have been created prior to this call using a Factory.Create method.
             */
			monitor.Start();
		} else {
            /**
             * Stop the monitor. By stopping the monitor an attempt to deliver the last
             * data to the servers are made. If data could not be delivered it will be
             * attempted to deliver the data again on the next start of the monitor with
             * the same product id.
             * The monitor must have been created prior to this call using a Factory.Create method.
             */
			monitor.Stop();
		}

		isMonitorStarted = !isMonitorStarted;
		updateButtonStatus();
	}

	function toggleTrackFeatureTime(monitor) {
		if (!isFeatureTrackingActive) {
            /**
             * Start time tracking of a named feature. Note that the timing is not
             * recorded before a matching TrackFeatureStop has been called and that
             * there is no support for multiple concurrent timings of the same named
             * feature so multiple start calls without a matching stop for the same
             * feature will have no effect.
             * The monitor must have been created prior to this call using a Factory.Create method.
             * 
             * @param featureName the feature name
             */
			monitor.TrackFeatureStart("Test.TrackFeatureTiming");
		} else {
            /**
             * Stop time tracking of a named feature. Note that this has no effect if
             * there has not been a matching TrackFeatureStart.
             * The monitor must have been created prior to this call using a Factory.Create method.
             * 
             * @param featureName the feature name
             */
			monitor.TrackFeatureStop("Test.TrackFeatureTiming");
		}

		isFeatureTrackingActive = !isFeatureTrackingActive;
		updateButtonStatus();
	}

	function trackFeature(monitor) {
        /**
         * Track a named feature. Note the recommended use of a one-level
         * dot-notation for feature naming to allow for better grouping of related
         * features. Tracked features are not delivered to the server immediately
         * but are piggy-backed on the next delivery.
         * 
         * The monitor must have been created prior to this call using a Factory.Create method.
         *
         * @param featureName the feature name
         */
		monitor.TrackFeature("Test.TrackFeature");
	}

	function trackException(monitor) {
		try {
			throw new Error("Test.ErrorMessage");
		}
		catch (e) {
            /**
             * Track an exception with a context message. Delivers the exception
             * information to the server as soon as possible.
             * 
             * @param exception the exception
             * @param message the message
             */
			monitor.TrackExceptionMessage(e, e.message);
		}
	}
    
    function log(msg) {
		var height = 0;

		$console.append("<li>" + msg + "</li>");
		$console.children().each(function () {
			height = height + $(this).outerHeight();
		});
		$console.scrollTop(height);
	}
    
    function updateButtonStatus() {
		if (isMonitorStarted) {
			$allButtons.attr("disabled", false);

			$startStopMonitor.text(messageStopMonitor)
                .removeClass(classActive)
				.addClass(classInactive);

		} else {
			$allButtons.attr("disabled", true);

			$startStopMonitor.text(messageStartMonitor)
                .removeClass(classInactive)
				.addClass(classActive)
				.attr("disabled", false);
		}

		if (isFeatureTrackingActive) {
			$startStopTrackFeatureA.text(messageStopTrackFeature)
                .removeClass(classActive)
				.addClass(classInactive);
		} else {
			$startStopTrackFeatureA.text(messageStartTrackFeature)
                .removeClass(classInactive)
				.addClass(classActive);
		}
	}

	function getStatus(monitor) {
		monitor.GetStatus(
				function (status) {
					log("Monitor Status:");

					for (var key in status) {
						if (key !== "Capabilities") {
							log("  Status: " + key + " = " + status[key]);
						}
					}
				},
				function (msg) {
					log('Error getting monitor status: ' + msg);
				}
				);
	}

	function init() {
		var settings,
			analyticsFactory = global.plugins.EqatecAnalytics.Factory,
			monitor = global.plugins.EqatecAnalytics.Monitor;

		$console = $("#console");
		$startStopMonitor = $("#startStopMonitor");
		$startStopTrackFeatureA = $("#startStopTrackFeatureA");
		$allButtons = $("button");
		updateButtonStatus();

		if (productKey === "") {
			$("#console").hide();
			$("#analytics-error").show();
			$allButtons.attr("disabled", true);
		}
		else {
			$("#console").show();
			$("#analytics-error").hide();

			settings = analyticsFactory.CreateSettings(productKey, version);
			settings.LoggingInterface = {
				LogError: function (errorMessage) { log("Error: " + errorMessage); },
				LogMessage: function (message) { log(message); }
			};

			analyticsFactory.CreateMonitorWithSettings(settings,
				function () { 
                    log("Monitor created");
                	monitor.SetInstallationInfo(installationId);
                },
				function (msg) { log('Error creating monitor: ' + msg); }
			);
		}

		$("#startStopMonitor").on("click", function () { toggleMonitor(monitor); });
		$("#startStopTrackFeatureA").on("click", function () { toggleTrackFeatureTime(monitor); });
		$("#trackFeatureB").on("click", function () { trackFeature(monitor); });
		$("#trackException").on("click", function () { trackException(monitor); });
		$("#getStatus").on("click", function () { getStatus(monitor); });

		navigator.splashscreen.hide();
	}
})(window);