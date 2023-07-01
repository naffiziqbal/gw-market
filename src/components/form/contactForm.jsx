import { useRef, useState } from "react";
import { useAddress } from "../../hooks/useAddress";
import { useSendOTPMutation } from "../../redux/features/OTP/OTPapi";
import { useInitialAddContactMutation } from "../../redux/features/contact/contactAPI";
import { Select } from "../select/Select";
import styles from "./contactForm.module.scss";

function ContactForm() {
  const [sendOTP, { data }] = useSendOTPMutation();
  const [
    initialAddContact,
    { isLoading: loading, isSuccess, isError: apiError },
  ] = useInitialAddContactMutation();
  const { getCity, getDistrict, get_ward_commune, isLoading, isError } =
    useAddress();
  const cities = getCity;
  const districts = getDistrict;
  const passwordRef = useRef("");
  const streetRef = useRef("");
  const phoneRef = useRef("");

 
  const [selectLabel, setSelectLabel] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectCommune, setSelectCommune] = useState("");
  const [error, setError] = useState({});
  // regex
  const VietnamPhoneRegex = /^[0]?[3|7|5|8|9][0-9]{8}$/;
  const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;



  /* ---------------------- select commune error handler ---------------------- */
  const selectCommuneErrorHandler = () => {
    if (!selectDistrict?.label)
      setError({ ...error, selectDistrict: "District must be selected." });
    return;
  };

  /* ----------------------------- submit handler ----------------------------- */
  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = {};

    const phone = phoneRef?.current?.value;
    if (!phone) {
      errors.phone='Phone number is required'
    } else if (!VietnamPhoneRegex.test(phone)) {
      errors.phone = "Invalid phone number."
    }
    const password = passwordRef.current.value;
    const street = streetRef.current.value;

    if (!password) {
      errors.password = "Password is required"
    }else if(strongPasswordRegex.test(password)){
      errors.password =
        "password must be at least one uppercase letter , at least one lowercase letter ,  at least one digit, at least one special character from the set @$!%*?& and a minimum length of 8 characters ";
    }

    // address error
    if (!street) {
      errors.street = "Address is required";
      
    }

    if (!selectCommune?.label) {
      errors.selectCommune = "District must be selected.";

    }

    if (!selectDistrict?.label) {
      errors.selectDistrict = "District must be selected.";
    }

    if (!selectCity?.label) {
      errors.selectCity = "City must be selected.";
    }

    if (!selectLabel?.label) {
      errors.selectLabel = "Label must be selected.";
    }

    if (Object.keys(errors).length > 0) {
      setError({ ...error, ...errors });
      return;
    }

    const data = {
      contact: {
        phone_number: phone,
        address: street,
        ward_commune: selectCommune?.label,
        district: selectDistrict?.label,
        province_city: selectCity?.label,
        
      },
      password: password,
    };

    try {
      console.log(data);

      const DATA = await initialAddContact({ ...data });
  
    } catch {}
  };

 
  return (
    <>
      <div className={`${styles.contact_form}`}>
        <form onSubmit={submitHandler} id="contact_form" autoComplete="off">
          <div className={`${styles.contact_form_container}`}>
            {/* receiver contact  */}
            <div className={`${styles.receiver_contact}`}>
              <h3 className={`${styles.heading}`}>Receiver contact</h3>
              <div className="d-flex flex-column gap-3">
                {/* phone number  */}
                <div>
                  <div
                    className={`${
                      error?.phone && styles.error
                    }`}
                  >
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      name="phone"
                      ref={phoneRef}
                      required
                      onChange={(e) => {
                        setError({ ...error, phone: "" });
                      }}
                    />

                  </div>
                  {error?.phone ? (
                    <p className="text-danger">{error?.phone}</p>
                  ) : null}
                </div>
                {/* password  */}
                <div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}
                      required
                      className={`${error?.password && styles.error}`}
                      onChange={() => {
                        setError({ ...error, password: "" });
                      }}
                    />
                  </div>
                  {error?.password ? (
                    <p className="text-danger">{error?.password}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* receiver address  */}
            <div className={`${styles.receiver_address}`}>
              <h3 className={`${styles.heading}`}>Receiver Address</h3>
              <div className={`d-flex flex-column gap-3`}>
                {/* street  */}
                <div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className={`${error?.street && styles.error}`}
                    ref={streetRef}
                    onChange={() => {
                      setError({ ...error, street: "" });
                    }}
                  />
                  {error?.street && (
                    <p className="text-danger">{error?.street}</p>
                  )}
                </div>

                <div className="d-flex w-100 flex-md-row flex-column  justify-content-between gap-4">
                  {/* cities  */}
                  <div className="col-7">
                    <Select
                      data={cities}
                      isLoading={isLoading}
                      placeholder={"Province (or City)"}
                      className={`input ${error?.selectCity && "select_error"}`}
                      changeHandler={(value) => {
                        setSelectCity(value);
                        setError({ ...error, selectCity: "" });
                      }}
                    />
                    {error?.selectCity && (
                      <p className="text-danger">{error?.selectCity}</p>
                    )}
                  </div>
                  {/* district  */}
                  <div className="col-4">
                    <Select
                      data={districts}
                      isLoading={isLoading}
                      placeholder={"District"}
                      className={`input ${
                        error?.selectDistrict && "select_error"
                      }`}
                      changeHandler={(value) => {
                        setSelectDistrict(value);
                        setError({ ...error, selectDistrict: "" });
                      }}
                    />
                    {error?.selectDistrict && (
                      <p className="text-danger">{error?.selectDistrict}</p>
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.commune} d-flex w-100 flex-md-row flex-column  justify-content-between gap-4 `}
                >
                  {/* select commune  */}
                  <div className="col-7">
                    <Select
                      data={
                        selectDistrict
                          ? get_ward_commune(selectDistrict?.label)
                          : []
                      }
                      isLoading={isLoading}
                      placeholder={"Ward (or Commune)"}
                      className={`input ${
                        error?.selectDistrict && "select_error"
                      }`}
                      changeHandler={(value) => {
                        setSelectCommune(value);
                      }}
                      menuOpenHandler={selectCommuneErrorHandler}
                    />
                  </div>
                  <div className="col-4">
                    {/* label  */}
                    <Select
                      data={[
                        { label: "Label", value: "Label" },
                        { label: "Office", value: "Office" },
                      ]}
                      isLoading={isLoading}
                      placeholder={"Destination"}
                      className={`input ${
                        error?.selectLabel && "select_error"
                      }`}
                      changeHandler={(value) => {
                        setSelectLabel(value);
                      }}
                    />
                    {error?.selectLabel && (
                      <p className="text-danger">{error?.selectLabel}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`d-flex justify-content-center align-items-center mt-5 gap-5`}
          >
            <button type="reset" className="  custom_btn">
              Clear
            </button>
            <button type="submit" className=" custom_btn " form="contact_form">
              Add contact
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
