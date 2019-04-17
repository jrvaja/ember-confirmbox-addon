import Component from '@ember/component';
import layout from '../templates/components/confirmbox';
import { computed } from "@ember/object";
import { inject } from "@ember/service";

export default Component.extend({
  layout,
  classNames: ['flex-y', 'center'],
  classNameBindings: ['show:confirmbox-full'],
  confirmbox: inject(),
  show: computed('confirmbox.selected', function () {
    return this.confirmbox.selected !== null && this.confirmbox.selected !== "";
  }),
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
    confirm() {
      this.onConfirm();
    },
    cancel() {
      this.onCancel();
    }
  }
});
