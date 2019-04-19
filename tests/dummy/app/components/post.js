import Component from '@ember/component';
import { inject } from "@ember/service";

export default Component.extend({
  confirmbox: inject('confirmbox'),
  actions: {
    async deletePost() {
      if (this.confirmbox.selected) {
        // this.confirmationItem.destroyRecord();
        // console.log("selected Object Confirmed:", this.confirmbox.selected);
        this.confirmbox.reset();
      }
    },
    closeConfirmbox() {
      this.confirmbox.reset()
    }
  }
});
