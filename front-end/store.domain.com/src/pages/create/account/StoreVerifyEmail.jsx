import React, { useEffect, useState } from "react";
import { StyledInputGroup } from "../../../styles";
import axios from "axios";
import Loader from "../../../components/Loader";

async function sendCode(email, code, loadingcb) {
  loadingcb(true);
  const options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_X_KEY,
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    data: {
      personalizations: [
        {
          to: [
            {
              email: "otailaba98@gmail.com",
            },
          ],
          subject: "Email verification code.",
        },
      ],
      from: {
        email: "support@domain.com",
      },
      content: [
        {
          type: "text/plain",
          value: code.toString(),
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    loadingcb(false);
  }
}

const StoreEmailPhone = ({
  setCanContinue,
  data,
  error,
  setError,
  changeHandler,
}) => {
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(0);
  const [userEntredCode, setUserEntredCode] = useState("");

  const handelChange = (e) => {
    setError(false);
    setUserEntredCode(e.target.value);

    if (+verificationCode === +e.target.value || data.email_verified) {
      setCanContinue(true);
      changeHandler({ target: { name: e.target.name, value: true } });
    } else if (+verificationCode !== +e.target.value || !data.email_verified) {
      setCanContinue(false);
      changeHandler({ target: { name: e.target.name, value: false } });
    }
  };

  useEffect(() => {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    setVerificationCode(code);
    if (!data.email_verified) {
      setLoading(true);
      sendCode(data.email, code, setLoading);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <StyledInputGroup className={error && "invalid"}>
        <label htmlFor="email_verified">
          <h3>Enter Your Verification Code</h3>
        </label>
        <input
          name="email_verified"
          id="email_verified"
          type="number"
          value={userEntredCode}
          onChange={handelChange}
        />

        <p>
          {error &&
            "The entred email is alredy related to another store, please try another one, or if the email is yours try log in."}
        </p>
      </StyledInputGroup>
    </div>
  );
};

export default StoreEmailPhone;
