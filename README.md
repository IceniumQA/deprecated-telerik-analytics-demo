sample-eqatec-analytics
=======================

This sample application demonstrates how to use the Telerik EQATEC Analytics integrated plugin to add real-time usage tracking to your app.  

## Used API Methods

For more information about the Telerik EQATEC Application Analytics APIs, see <a href="http://api.eqatec.com/analytics/icenium/" target="_blank">Telerik EQATEC Analytics reference for Icenium</a>.

This app shows how to use the following Telerik EQATEC Analytics API methods.

* **Factory.CreateSettings()**: Sets the product key and the application version for the monitor that you want to create.
* **Factory.CreateMonitorWithSettings()**: Creates a monitor with the selected settings. 
* **Monitor.SetInstallationInfo()**: Sets an installation ID for the selected monitor. The installation ID is a unique identifier for the current user. You can use any unique value, such as email address, user name, user-defined value, uniquely generated number, or others.
* **Monitor.Start()**: Starts a previously created tracking monitor.
* **Monitor.Stop()**: Stops a running tracking monitor.
* **Monitor.TrackFeatureStart()**: Starts tracking how long a selected feature is used (time tracking).
* **Monitor.TrackFeatureStop()**: Stops tracking how long a selected feature is used (time tracking).
* **Monitor.TrackFeature()**: Tracks how many times a selected feature is used.
* **Monitor.TrackExceptionMessage()**: Tracks an exception with a context message.
* **Monitor.GetStatus()**: Retrieves the status of the currently running monitor.

## Testing the Sample

For more information about the sample, how to clone it in Icenium, and test it, see the <a href="http://docs.icenium.com/sample-apps/sample-eqatec-analytics" target="_blank">Eqatec Analytics Sample documentation</a>.

**Note:** *The **Telerik EQATEC Analytics** plugin is supported in the device simulator with limitations. All data is mocked. The sample app console shows information about the monitor status and sent data but the sample app does not send actual usage data to your EQATEC Application Analytics product. You cannot review usage data for your app gathered from the simulator in your EQATEC Application Analytics dashboard. To track real-time data for your app, build and deploy it on a device.*

**Note:** *Before testing the app in the device simulator, in Icenium Ion, or on device, make sure that you have a user account for Telerik EQATEC Application Analytics at <a href="https://analytics.telerik.com" target="_blank">https://analytics.telerik.com</a> and that you have created an Icenium product with a valid product key in the Telerik EQATEC Application Analytics dashboard.*
