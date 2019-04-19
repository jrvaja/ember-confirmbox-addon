# Ember Confirm Box

This README outlines the details of collaborating on this Ember-Confirmbox-Addon application.
A short introduction of this app could easily go here.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

## Prerequisites


You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

This addon is developed with Ember ```CLI 3.9```

## Installation

`ember install ember-confirmbox-addon`

### Usage

In general, we may have loop of items and each item may need confirmation before taking any final action. In such case, we will have our component in loop that's not suggested and optimize way. As we know at a time only one confirmation will come on the screen. Looping more components in DOM and keeping it may take JSHeap and occupy DetachedDOM. Rather than doing this, we have only one confirm box for the action. We transmite data to the confirmbox.

Let's have an example for better understanding.

### Example

In the example, we have list of tasks. For each task, we have a component called `TaskElement`
[Demo](https://ember-confirmbox-addon.netlify.com/) | 
[Demo Github Repository](https://github.com/jrvaja/confirmbox-demo)

### Types
We have two type of confirmboxes. 

* Dialog Modal type with overlay over the page
* inline

Let's begin with Dialog Modal

#### Types1: Dialog Modal

###### File#1: app/task/controller.hbs

```javascript
import Controller from '@ember/controller';
import { inject } from "@ember/service";

export default Controller.extend({
  confirmbox: inject(),
  actions: {
    async deleteTask() {
      if (this.confirmbox.selected) {
        this.confirmbox.selected.destroyRecord();
        this.confirmbox.reset();
      }
    },
    closeConfirmbox() {
      this.confirmbox.reset();
    }
  }
});

```
###### File#2: app/task/template.hbs

```html
{{#each model.task as |task|}}
  <TaskElement @task={{task}}>
    {{task.details}}
  </TaskElement>
{{/each}}
<Confirmbox @activator="deleteTask" @title="Delete Task" @text="Are you sure?" @confirmButtonText="Confirm" @cancelButtonText="Opp"
  @showCancelButton @onConfirm={{action "deleteTask"}} @onCancel={{action "closeConfirmbox"}} />
```
Here, task has two components. One is `TaskElement` and 2nd is `Confirmbox`.
`TaskElement` component has an action `{{action "setValue" task "activator_name" target=confirmbox}}` to pass data to `Confirmbox`.

`@activator` helps to identify the component for which the action is being triggered. So the name of activator at `<Confirmbox />` component and element where it's being triggered must be the same.

Let's see `TaskElement`

###### File#3: app/components/task-element/template.hbs

```html
<article class="blog-post">
  <h1>{{task.title}}</h1>
  <div class="body">{{yield}}</div>
  <button type="button" class="btn btn-default" {{action "setValue" task "deleteTask" target=confirmbox}}>Delete</button>
</article>
```

In our example, on click of the `<button>` element the confirmbox will be activated for *deleteTask* action.

###### File#4: app/components/task-element/component.js

```javascript
import Component from '@ember/component';
import { inject } from "@ember/service";

export default Component.extend({
  confirmationItem: null,
  confirmbox: inject()
});

```
Here you could see, we have a service called `confirmbox`. This is being used in `app/components/task-element/template.hbs`. 

```html
<button type="button" class="btn btn-default" {{action "setValue" task "deleteTask" target=confirmbox}}>Delete</button>
```
`{{action "setValue" task "deleteTask" target=confirmbox}` will use the method declared in ember-confirmbox-add package which will set current selected object/value and identify the confirmbox.

The moment `{action "setValue" task "deleteTask" target=confirmbox}}` action is invoked, the service will update the status of Confirmbox and it will come up.

Based on the confirmbox action (confirm/cancel), it will invoke the action passed in `@onConfirm` or `@onCancel`.

```html
<Confirmbox @activator="deleteTask" @title="Delete Task" @text="Are you sure?" @confirmButtonText="Confirm" @cancelButtonText="Opp"
  @showCancelButton @onConfirm={{action "deleteTask"}} @onCancel={{action "closeConfirmbox"}} />
```
#### Types2: Inline

There are manu cased wheere we do't want whole screen dialog modal for confirmation. To have quick action and clear UI, we can have inline confirmation.

Please refer [demo](https://ember-confirmbox-addon.netlify.com/) for more clarity.

###### template.hbs

```html
<InlineConfirmbox @confirmButtonClass="btn-success" @onConfirm={{action "confirmHandler" 1}}
  @onCancel={{action "cancelHandler"}}>
  <button class="btn"><i class="fa fa-home"></i> Home</button>
</InlineConfirmbox>
```

###### component.js
```javascript
import Component from '@ember/component';

export default Component.extend({
  actions: {
    confirmHandler(args) {
      console.log("Confirm Inline.js component", args);
    },
    cancelHandler() {
      console.log("cancel Inline.js component");
    }
  }
});

```
It's almost identical to use but the working UI will be different.
You can use any tag between opening and closing tag of `InlineConfirmbox` component. That will be yielded.



| Props | Description | Required | Default
| --- | --- | --- | --- |
| activator | Designate a custom activator which will help to address particular confirmbox if a view has many confirmboxes | true
| title | Title of the confirmbox | true
| text | Text to set after the title | false
| onConfirm | This is action handler when user choose confirm this will need an action to handle further process | true
| onCancel | This is action handler when user choose cancel this will need an action to handle further process | true
|confirmText | Set your confirm button text | false | Okay
|cancelText | Set your cancel button text | false | Cancel
| cancelClass| Set css class on cancel button | false | btn-default
| confirmClass| Set css class on confirm button | false | btn-primary
| showCancelBtn | Show Cancel button. You just need to declare prop in component, it will consider as `true` if you mentioned the prop. | false | N/A

| Action | Description |
| --- | --- |
| setValue | Current object/value in cofirmbox

Release
------------------------------------------------------------------------------
###### `Version 0.0.8`
* README.MD Updates
* Inline Confirmbox

###### `Version 0.0.7`
README.MD Updates: Added a demo link and git repo for demo.

###### `Version 0.0.6`
UI Fix and READ.ME Updates.

###### `Version 0.0.5`
Allow mutliple `confirmbox` in a page as well as in the application.
We have added a props named `@activator` to `<Confirmbox />` component as identifier in case of multiple `<Confirmbox />` in a view.



Credits
------------------------------------------------------------------------------

Designed & Developed in Cuelogic![Cuelogic](https://23o0161033pm1289qo1hzrwi-wpengine.netdna-ssl.com/wp-content/themes/twentyseventeen-child/assets/images/cuelogic.svg)

Developed By: [Jaimin R. Vaja](https://github.com/jrvaja)

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

