import Component from '@ember/component';
import { inject } from "@ember/service";

export default Component.extend({
  confirmbox: inject(),
  actions: {
    async deleteTask() {
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
