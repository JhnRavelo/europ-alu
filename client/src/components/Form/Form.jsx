import "./Form.css";
import { Formik, Form } from "formik";
import SignupTemplate from "../Singup/SignupTemplate";
import FormContext from "./FormContext";
import { useContext } from "react";
import ButtonContext from "../Button/ButtonContext";
import { addUser } from "../../lib/service/User";
import { validate } from "../../lib/utils/validationSchema";
import { addTraker } from "../../lib/service/Trakers";
import AuthContext from "../../context/AuthProvider";

const FormField = () => {
  const { setAuth } = useContext(AuthContext);
  const buttonContext = useContext(ButtonContext);
  const iniatialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    checked: [buttonContext[0]],
    checkbox: true,
  };

  const onSubmit = async (values) => {
    try {
      const res = await addUser(values, true);
      const token = res?.token;

      setAuth(token);
      console.log(res.token);
      const track = await addTraker(values);
      console.log(track);
    } catch (error) {
      if (!error?.response) {
        console.log(error);
      }
    }
  };
  return (
    <section id="form" className="active">
      <div className="overlay"></div>
      <div className="multi-step-form">
        <Formik
          initialValues={iniatialValues}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ errors, values, isValid }) => (
            <FormContext.Provider value={[errors, values, isValid]}>
              <Form>
                <SignupTemplate />
              </Form>
            </FormContext.Provider>
          )}
        </Formik>
      </div>
    </section>
  );
};

// FormField.displayName = "FormField"

export default FormField;
