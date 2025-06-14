import React, { useEffect, useState } from "react";
import { StyledInputGroup } from "../../styles";

async function sendEmailCode(email, privateKey) {
  const code = [1, 1, 1, 1, 1, 1].reduce(
    (prev, next) => prev + Math.round(Math.random() * 10),
    ""
  );

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": privateKey,
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email }],
          subject: "domain.com email address verification",
        },
      ],
      from: { email: "team-support@email.com", name: "domain.com" },
      content: [{ type: "text/plain", value: code }],
    }),
  };
  try {
    await fetch(
      "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      options
    );

    localStorage.setItem("code_verefication", code);
    localStorage.setItem("code_expireAt", new Date().getTime() + 18000 * 1000);
  } catch (error) {
    console.log(error);
  }

  return await code;
}

const VerifyEmail = ({
  setCanContinue,
  data,
  changeHandler,
  setFilters,
  setLimit,
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const verifyEmailHandler = async () => {
    if (!code) {
      const codeRundem = await sendEmailCode(
        data.email,
        process.env.REACT_APP_RAPID_API_X_KEY
      );

      setCode(codeRundem);
      return;
    }
    if (Number(verifyCode) === Number(code)) {
      setCanContinue(true);
      changeHandler({ target: { name: "email_verified", value: true } });
    }
  };

  const handelChange = (e) => {
    setVerifyCode(e.target.value);
    setFilters(null);
    setLimit(null);
    if (e.target.value.length === 6) setCanContinue(true);
    else setCanContinue(false);
  };

  useEffect(() => {
    setCode(localStorage.getItem("code_verefication"));
    if (
      !code ||
      !localStorage.getItem("code_expireAt") ||
      Number(localStorage.getItem("code_expireAt")) > new Date().getTime()
    ) {
      verifyEmailHandler();
    }
  }, []);

  return (
    <>
      <StyledInputGroup className={error && "invalid"}>
        <label htmlFor="">
          <h3>Enter the code send to your email</h3>
        </label>
        <input
          name="name"
          type="text"
          value={verifyCode}
          onChange={handelChange}
        />
        <p>
          {error &&
            `The entred code dosn't match the code send to ${data.email}`}
        </p>
      </StyledInputGroup>
    </>
  );
};

export default VerifyEmail;
