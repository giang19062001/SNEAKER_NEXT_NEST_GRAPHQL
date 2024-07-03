export interface PhoneProps {
    number: string;
    callbackPhone: (phoneNumber: string) => void;
  }