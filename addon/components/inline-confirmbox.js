import Component from '@ember/component';
import layout from '../templates/components/inline-confirmbox';
import { computed } from "@ember/object";

export default Component.extend({
  layout,
  ask: false,
  confirmText: computed('confirmButtonText', function () {
    return this.confirmButtonText ? this.confirmButtonText : 'Okay'
  }),
  cancelText: computed('cancelButtonText', function () {
    return this.cancelButtonText ? this.cancelButtonText : 'Cancel'
  }),
  cancelClass: computed('cancelButtonClass', function () {
    return this.cancelButtonClass ? this.cancelButtonClass : 'btn-default'
  }),
  confirmClass: computed('confirmButtonClass', function () {
    return this.confirmButtonClass ? this.confirmButtonClass : 'btn-primary'
  }),
  showCancelBtn: computed('showCancelButton', function () {
    return this.showCancelButton !== undefined ? true : false;
  }),
  actions: {
    toggle() {
      this.toggleProperty('ask');
    },
    confirmed(args) {
      this.onConfirm(args);
      this.toggleProperty('ask');
    },
    cancelled() {
      this.onCancel();
      this.toggleProperty('ask');
    }
  }
});
