export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  name: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Deactivate {
  password: string;
}

export interface ForgetPasswordEmail {
  email: string;
}

export interface ForgetPassword {
  newPassword: string;
  confirmPassword: string;
}
