import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  user: any

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  loginForm: FormGroup

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  login () {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe(
      user => {
        this.router.navigate(['extrato'])
      }
    )

    this.user = this.authService.decodePayloadJWT()
    console.log(this.user)
  }


}
