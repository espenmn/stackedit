define([
    "utils",
    "classes/Provider",
    "helpers/ploneHelper"
], function(utils, Provider, ploneHelper) {

    var ploneProvider = new Provider("plone", "plone server");
    ploneProvider.publishPreferencesInputIds = [
        "plone-host",
        "plone-port",
        "plone-username",
        "plone-password"
    ];

    ploneProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        ploneHelper.upload(publishAttributes.host, publishAttributes.port, publishAttributes.username, publishAttributes.password, publishAttributes.path, title, content, callback);
    };

    ploneProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.host = utils.getInputTextValue("#input-publish-plone-host", event, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
        publishAttributes.port = utils.getInputIntValue("#input-publish-plone-port", undefined, 0);
        publishAttributes.username = utils.getInputTextValue("#input-publish-plone-username", event);
        publishAttributes.password = utils.getInputTextValue("#input-publish-plone-password", event);
        publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return ploneProvider;
});