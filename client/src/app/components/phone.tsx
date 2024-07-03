import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  Container,
  Box,
  Paper,
  Button,
  Grid,
  Divider,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { auth } from "../firebase/firebase";
import { PhoneProps } from "../types/phone";

const Phone : React.FC<PhoneProps> = ({ number , callbackPhone}) => {
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [resultOtp, setResultOtp] = useState<any>();
  const [verify, setVerify] = useState("");

  const handleChangeNumber = (value: string) =>{
    callbackPhone(value)
  }
  function setUpRecaptha(number: string) {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  const getOtp = async () => {
    const num = "+84".concat(number.slice(1, number.length)); // đổi thành số vùng vn
    try {
      const response: any = await setUpRecaptha(num);
      setResultOtp(response);
      setFlag(true);
    } catch (err: any) {
      console.warn(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await resultOtp.confirm(otp);
      setFlag(false);
      setVerify("Y");
    } catch (err: any) {
      setFlag(true);
      setVerify("N");
      console.error(err.message);
    }
  };

  return (
      <div>
        {flag === false ? (
          <>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TextField
                type="text"
                label="Phone"
                inputProps={{ maxLength: 12 }}
                sx={{
                  width: 380,
                  ".MuiOutlinedInput-root": {
                    borderRadius: 5,
                  },
                }}
                onChange={(e) => {
                  handleChangeNumber(e.target.value);
                }}
              ></TextField>

              {verify === "Y" ? (
                <button
                  className="text-xs w-24  h-8 bg-neutral-500 text-slate-50 rounded-full"
                  disabled
                >
                  Send OTP
                </button>
              ) : (
                <button
                  className="text-xs w-24  h-8 bg-yellow-400 hover:bg-yellow-500 text-black-500 rounded-full"
                  onClick={getOtp}
                >
                  Send OTP
                </button>
              )}
            </Stack>
            <Box className="mt-2" id="recaptcha-container"></Box>
          </>
        ) : (
          <Stack direction={"row"} spacing={2}>
            <TextField
              type="text"
              label="OTP"
              inputProps={{ maxLength: 6 }}
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: 5,
                },
              }}
              onChange={(e) => setOtp(e.target.value)}
            ></TextField>
            <Button
              className="text-xs w-24  h-8 bg-yellow-400 hover:bg-yellow-500 text-black-500 rounded-full"
              onClick={verifyOtp}
            >
              Verify OTP
            </Button>
          </Stack>
        )}
        {verify === "Y" ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            Verify succesfully
          </Alert>
        ) : verify === "N" ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            OTP not correct
          </Alert>
        ) : null}
      </div>
  );
};

export default Phone;
