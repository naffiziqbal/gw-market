import { useAddress } from "../../hooks/useAddress";
import { Select } from "../select/Select";
import styles from "./contactForm.module.scss";

function ContactForm() {
  const { getCity, getDistrict, get_ward_commune, isLoading, isError } =
    useAddress();
  const cities = getCity;
  const districts = getDistrict;
  const commune = get_ward_commune;

  return (
    <>
      <div className={`${styles.contact_form}`}>
        <form action="" id="contact_form">
          <div className={`${styles.contact_form_container}`}>
            {/* receiver contact  */}
            <div className={`${styles.receiver_contact}`}>
              <h3 className={`${styles.heading}`}>Receiver contact</h3>
              <div className="d-flex flex-column gap-3">
                <input type="tel" placeholder="Phone Number" required />
                <input type="password" placeholder="Password" required />
              </div>
            </div>
            {/* receiver address  */}
            <div className={`${styles.receiver_address}`}>
              <h3 className={`${styles.heading}`}>Receiver Address</h3>
              <div className={`d-flex flex-column gap-3`}>
                <div>
                  <input type="text" placeholder="Street Address" />
                </div>

                <div className="d-flex w-100 flex-md-row flex-column  justify-content-between gap-4">
                  <div className="col-7">
                    <Select
                      data={cities}
                      isLoading={isLoading}
                      placeholder={"Province (or City)"}
                      className={"input"}
                    />
                  </div>
                  <div className="col-4">
                    <Select
                      data={districts}
                      isLoading={isLoading}
                      placeholder={"District"}
                      className={"input"}
                    />
                  </div>
                </div>

                <div className={`${styles.commune} `}>
                  <Select
                    data={commune}
                    isLoading={isLoading}
                    placeholder={"Ward (or Commune)"}
                    className={"input"}
                  />
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
