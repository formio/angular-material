import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: any = {
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
        type: 'email',
        label: 'Email',
        key: 'email'
      },
      {
        type: 'phoneNumber',
        label: 'Phone Number',
        key: 'phoneNumber'
      }
    ]
  };
  submission: any = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com',
      phoneNumber: '123-456-7890'
    }
  };
  onSubmit(submission:any) {
    console.log(submission);
  }
}
