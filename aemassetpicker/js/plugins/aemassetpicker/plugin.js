/**
 * Author - Abhishek Arora
 * 
 * Plugin inserting AEM Assets into the CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/ckeditor4/docs/#!/guide/plugin_sdk_intro
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add('aemassetpicker', {
    // Register the icons. They must match command names.
    icons: 'aemassetpicker',

    // The plugin initialization logic goes inside this method.
    init: function(editor) {

        CKEDITOR.scriptLoader.load('https://code.jquery.com/jquery-1.11.1.min.js');

        var assetPickerURL = "https://<YOUR_AEM_INSTANCE_URL>/aem/assetpicker.html";
        var style = "popup";
        var popup;
        var messageEventListenerActivated = false;

        function _popup(url) {
            popup = window.open(url, "dam", "left=25%,top=25%,height=800,width=1600,status=yes,toolbar=no,menubar=no,location=yes");
            //popup = window.open(url, "dam");
            //console.log("popup");
            //console.log(popup);
        }

        /* Extensions */
        var allowed_extensions = {
            image: ["jpg", "jpeg", "png", "tiff", "svg"],
            video: ["mp4"],
        }

        function getExtension(filename) {
            return filename.split('.').pop();
        }

        function getExtensionType(filename) {
            var ext = getExtension(filename);
            // find extension in allowed extensions
            for (var key in allowed_extensions) {
                // skip loop if the property is from prototype
                if (!allowed_extensions.hasOwnProperty(key)) continue;

                var arr = allowed_extensions[key];
                if (arr.indexOf(ext) != -1)
                    return key;
            }
            return "image";
        }

        // Define the editor command that inserts a dialog.
        editor.addCommand('insertAEMAssets', {
            exec: function(editor) {

                var img_asset;
                var title_asset;
                var url_asset;
                var type_asset;
                var size_asset;

                //$(window).off('message').on('message', receiveMessage);
                if (!messageEventListenerActivated) {
                    window.addEventListener("message", receiveMessage, false);
                    messageEventListenerActivated = true;
                }

                var url = assetPickerURL;
                _popup(url);

                function receiveMessage(event) {
                    // Don’t accept messages from other sources!
                    if (assetPickerURL.indexOf(event.origin) != 0) {
                        return;
                    }

                    var fromDam = JSON.parse(event.data);

                    console.log("assetpicker data-");
                    console.log(fromDam);

                    if (fromDam.config) {
                        var configFromDam = fromDam.config;

                        if (configFromDam.action === 'close' || configFromDam.action === 'done') {
                            if (popup) {
                                popup.close();
                            }
                        }
                    }

                    if (fromDam.data) {
                        var dam_detail = fromDam.data;

                        for (var i in dam_detail) {
                            img_asset = dam_detail[i].img;
                            title_asset = dam_detail[i].title;
                            url_asset = dam_detail[i].url;
                            type_asset = dam_detail[i].type;
                            size_asset = dam_detail[i].size;
                            console.log(img_asset);
                            console.log(title_asset);
                            console.log(url_asset);
                            console.log(type_asset);
                            console.log(size_asset);

                            var ext = getExtensionType(url_asset);
                            console.log("Extension type: ");
                            console.log(ext);
                            if (ext === "image") {
                                var html = '<img src="' + url_asset + '/_jcr_content/renditions/cq5dam.thumbnail.319.319.png" alt="' + title_asset + '"></img>';
                                editor.insertHtml(html);
                            } else if (ext === "video") {
                                var html = '<video controls="" height="240" width="320"><source src="' + url_asset + '"></video>';
                                editor.insertHtml(html);
                            } else {
                                console.log("Error: unknown extension!");
                            }
                        }
                    }
                    //window.removeEventListener("message", receiveMessage, false);
                }
            }
        });

        // Create the toolbar button that executes the above command.
        editor.ui.addButton('AEMAssetPicker', {
            label: 'Insert AEM Assets',
            command: 'insertAEMAssets',
            toolbar: 'basicstyles,0',
            allowedContent: true
        });
    }
});