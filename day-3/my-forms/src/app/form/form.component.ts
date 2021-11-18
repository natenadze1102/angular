import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../shared/confirmed.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  profileForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],

      pass: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]+'),
          Validators.minLength(8),
        ],
      ],
      nick: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9-]+')]],

      phoneNum: [
        '',
        [
          Validators.required,
          Validators.min(100000000000),
          Validators.pattern(/^\+380\d+$/),
        ],
      ],

      web: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],

      checkbox: ['', Validators.required],

      confirm_password: ['', [Validators.required]],

      aliases: this.fb.array([this.fb.control('')]),
    },

    {
      validator: ConfirmedValidator('pass', 'confirm_password'),
    }
  );

  user: any;

  @Input() usersArray!: object[];
  @Input() userIndex!: number;
  @Input() currentUser: any;
  @Input() isEditing!: boolean;
  @Output()
  isEditingEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.isEditing) {
      this.profileForm.controls.email.setValue(this.currentUser.email);
      this.profileForm.controls.nick.setValue(this.currentUser.nickname);
      this.profileForm.controls.phoneNum.setValue(this.currentUser.phone);
      this.profileForm.controls.pass.setValue(this.currentUser.password);
      this.profileForm.controls.confirm_password.setValue(
        this.currentUser.password_repeat
      );
      this.profileForm.controls.web.setValue(this.currentUser.website);

      this.profileForm.controls.checkbox.setValue('0');
      this.profileForm.controls.checkbox.disable();
    }
  }

  onSubmit() {
    let user = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.pass,
      password_repeat: this.profileForm.value.confirm_password,
      nickname: this.profileForm.value.nick,
      phone: this.profileForm.value.phoneNum,
      website: this.profileForm.value.web,
    };

    this.usersArray.push(user);
    this.profileForm.reset();

    // this.newItemEvent.emit(this.usersArray);
  }

  updateUserInfo() {
    if (this.profileForm.valid) {
      this.currentUser.email = this.profileForm.value.email;
      this.currentUser.password = this.profileForm.value.pass;
      this.currentUser.password_repeat =
        this.profileForm.value.confirm_password;
      this.currentUser.nickname = this.profileForm.value.nick;
      this.currentUser.phone = this.profileForm.value.phoneNum;
      this.currentUser.website = this.profileForm.value.web;
      this.isEditing = false;

      this.isEditingEmitter.emit(this.isEditing);
    }
  }

  get profileFormControl() {
    // console.log(this.profileForm.controls);
    return this.profileForm.controls;
  }
}
