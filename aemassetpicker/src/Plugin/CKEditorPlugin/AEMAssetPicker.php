<?php

/**
 * Author - Abhishek Arora
 * 
 * @file
 * Definition of \Drupal\aemassetpicker\Plugin\CKEditorPlugin\AEMAssetPicker.
 */

namespace Drupal\aemassetpicker\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\ckeditor\CKEditorPluginButtonsInterface;
use Drupal\Component\Plugin\PluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "AEMAssetPicker" plugin.
 *
 * @CKEditorPlugin(
 *   id = "aemassetpicker",
 *   label = @Translation("AEMAssetPicker")
 * )
 */
class AEMAssetPicker extends PluginBase implements CKEditorPluginInterface, CKEditorPluginButtonsInterface {

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getDependencies().
   */
  function getDependencies(Editor $editor) {
    return array();
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getLibraries().
   */
  function getLibraries(Editor $editor) {
    return array();
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::isInternal().
   */
  function isInternal() {
    return FALSE;
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getFile().
   */
  function getFile() {
    return drupal_get_path('module', 'aemassetpicker') . '/js/plugins/aemassetpicker/plugin.js';
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginButtonsInterface::getButtons().
   */
  function getButtons() {
    return array(
      'AEMAssetPicker' => array(
        'label' => t('AEMAssetPicker Plugin'),
        'image' => drupal_get_path('module', 'aemassetpicker') . '/js/plugins/aemassetpicker/icons/aemassetpicker.png',
      )
    );
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getConfig().
   */
  public function getConfig(Editor $editor) {
    return array();
  }
}
