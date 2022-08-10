# Drupal-AEM-AssetSelector
Drupal Assetpicker CKEditor Module

## Installation
- Download Drupal AEM AssetSelector Module latest release from github (zip)
- Change domain to your AEM publish instance domain (Update aemassetpicker/js/plugins/aemassetpicker/plugin.js Line 20:https://<your domain here>/aem/assetpicker.html)
- Zip this folder
- Install this module in drupal
- Edit Configuration CKEditor - Drag & Drop button in full/basic HTML Editor (as required)

### To enable video picker
- Configure Basic HTML Editor
- Append this in tags allowed - "video controls height width source src"

## Troubleshoot
In case the module doesn't get installed directly in drupal, try the following steps
- Download this repo and zip aemassetpicker folder
- SSH into server and place it in drupal/modules
- Enable the module from Drupal UI
- Drag & Drop this module in Configuration for full & basic editor in Drupal UI