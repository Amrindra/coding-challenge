import axios from "axios";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Spinner,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";

const Form = ({ donorData }) => {
  const formik = useFormik({
    initialValues: {
      message: "",
      email: "",
      donor_Id: "",
    },
    onSubmit: (values) => {
      console.log(values);
      sendMessage();
    },

    validationSchema: Yup.object().shape({
      message: Yup.string()
        .min(15, "The message field must be at least 15 characters.")
        .max(1000, "Too Long!")
        .required("Please write some messages!"),
      email: Yup.string().email("Invalid email").required("Required"),
      donor_Id: Yup.number().required("Required"),
    }),
  });

  const sendMessage = async () => {
    const requestBody = {
      message: formik.values.message,
      email: formik.values.email,
      donor_Id: formik.values.donor_Id,
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `https://interview.ribbon.giving/api/donors/${formik.values.donor_Id}/send-message`,
        requestBody,
        {
          headers,
        }
      );
      if (response.data.Success === true) {
        alert("Successufully submitted!");
        formik.resetForm({ values: "" });
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Request failed! Please verify your input.");
    }
  };

  const onSearch = (searchTerm) => {
    formik.setFieldValue("email", searchTerm);
  };

  return (
    <VStack w="500px">
      <Box p={6} rounded="md" w="100%">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl
              isInvalid={formik.errors.message && formik.touched.message}
            >
              <Textarea
                id="message"
                name="messgae"
                height={150}
                placeholder="Message"
                value={formik.values.message}
                isInvalid={formik.errors.message && formik.touched.message}
                {...formik.getFieldProps("message")}
              />
              <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.errors.email && formik.touched.email}
              position="relative"
            >
              <Box
                position="absolute"
                zIndex="9"
                top="10"
                width="450px"
                backgroundColor="white"
                rounded="sm"
              >
                {donorData?.data
                  .filter((item) => {
                    const searchTerm = formik.values.email.toLowerCase();
                    const email = item.email.toLowerCase();

                    return (
                      searchTerm &&
                      email.startsWith(searchTerm) &&
                      email !== searchTerm
                    );
                  })
                  .slice(0, 5)
                  .map((item) => (
                    <Text
                      onClick={() => onSearch(item.email)}
                      className="dropdown-row"
                      key={item.email}
                      p="2"
                      fontSize="18px"
                      cursor="pointer"
                      _hover={{ bg: "green.500", color: " white" }}
                    >
                      {item.email}
                    </Text>
                  ))}
              </Box>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                isInvalid={formik.errors.email && formik.touched.email}
                {...formik.getFieldProps("email")}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.errors.donor_Id && formik.touched.donor_Id}
            >
              <Input
                id="donor_Id"
                name="donor_Id"
                placeholder="Donor ID"
                value={formik.values.donor_Id}
                isInvalid={formik.errors.donor_Id && formik.touched.donor_Id}
                {...formik.getFieldProps("donor_Id")}
              />
              <FormErrorMessage>{formik.errors.donor_Id}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="green" width="full">
              {formik.isSubmitting ? <Spinner /> : "Send"}
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default Form;
