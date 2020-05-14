import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: any = {
    components: [
      {type: 'my-custom-component'},
      {
        type: 'textfield',
        label: 'First Name',
        key: 'firstName',
        validate: {
          required: true
        }
      },
      {
        type: 'textfield',
        label: 'Last Name',
        key: 'lastName',
        validate: {
          required: true
        }
      },
      {
        type: 'select',
        key: 'favoriteColor',
        label: 'Favorite Color',
        defaultValue: 'orange',
        dataSrc: 'values',
        data: {
          values: [
            {
              label: 'Apple',
              value: 'apple'
            },
            {
              label: 'Banana',
              value: 'banana'
            },
            {
              label: 'Orange',
              value: 'orange'
            }
          ]
        }
      },
      {
        type: 'email',
        label: 'Email',
        key: 'email'
      },
      {
        type: 'phoneNumber',
        label: 'Phone Number',
        key: 'phoneNumber'
      },
      {
        type: 'currency',
        label: 'Salary',
        key: 'salary'
      },
      {
        key: 'submit',
        type: 'button',
        disableOnInvalid: true,
        action: 'submit',
        label: 'Submit'
      }
    ]
  };
  submission: any = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com',
      favoriteColor: 'banana',
      phoneNumber: '(123) 456-7890',
      salary: 45000
    }
  };
  onSubmit(submission) {
    console.log(submission);
  }
}
