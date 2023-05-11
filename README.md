## This repository is now considered legacy and no longer supported. Please take a look at our recent repositories and help documentation at the following links.
 - https://help.form.io
 - https://github.com/formio/formio.js
 - https://github.com/formio/formio
 - https://github.com/formio/react
 - https://github.com/formio/angular
 - https://github.com/formio/vue

# Dynamic JSON Powered forms for Angular Material

This library introduces the powerful Form.io JSON forms into the Angular Material framework.

## Installation

To install this library into your application, you will need to run the following.

```
npm install formiojs @formio/angular @formio/angular-material
```

Then, you will need to add the following to your codebase.

***src/app/app.module.ts***
```ts
import { MatFormioModule } from '@formio/angular-material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using this library
This library can be used to render dynamic JSON powered forms within any Angular Material application. This uses the exact same syntax as the ```<formio>``` component within the [Angular Form.io Library](https://github.com/formio/angular-formio). The only difference is that you will use the ```<mat-formio>``` directive instead.

For example, the following will render a dynamic JSON form within your application.

```html
<mat-formio src="https://examples.form.io/kitchensink"></mat-formio>
```

You can also use this to render JSON forms as follows.

```html
<mat-formio [form]="{
  components: [
    {
      type: 'textfield',
      label: 'First Name',
      key: 'firstName'
    },
    {
      type: 'textfield',
      label: 'Last Name',
      key: 'lastName'
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      key: 'submit'
    }
  ]
}" (submit)="onSubmit($event)"></mat-formio>
```
