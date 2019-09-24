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
        type: 'header',
        label: 'Header',
        content: 'This is a header',
        tag: 'h1'
      },
      {
        type: 'htmlelement',
        tag: 'strong',
        content: '{{ data.firstName }}',
        refreshOnChange: true,
        key: 'html'
      }
    ]
  };
  onSubmit(submission:any) {
    console.log(submission);
  }
}
