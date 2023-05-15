import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEvent } from "../Redux/Event/Event.action";
import "./Styles/FormComponent.scss"
const FormComponent = () => {
  const { user,token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "hockey",
    membersLimit: 0,
    timing: Date.now(),
    otherReq: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postEvent(user.id, formData, token));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel className="label">Event's Name</FormLabel>
          <Input className="input" type="text" name="name" onChange={handleFormChange} />
          <FormLabel className="label">Event's Description</FormLabel>
          <Textarea
            type="text"
            cols={"2"} 
            className="input"
            name="description"
            onChange={handleFormChange}
          />
          <FormLabel className="label">Category</FormLabel>

          <RadioGroup
            defaultValue="hockey"
            name="category"
            className="input"
            onChange={(e) => {
              console.log(e);
              setFormData({ ...formData, category: e });
            }}
          >
            <Flex wrap="wrap" columnGap="1.5rem" rowGap="1rem">
              {[
                "hockey",
                "football",
                "cricket",
                "badminton",
                "tennis",
                "athletics",
                "boxing",
                "basketball",
                "baseball",
                "golf",
              ].map((item, ind) => (
                <Radio value={item} key={ind}>
                  {item.toUpperCase()}
                </Radio>
              ))}
            </Flex>
          </RadioGroup>

          <FormLabel className="label">Pick Date and time</FormLabel>
          <Input
          className="input"
            type="datetime-local"
            name="timing"
            onChange={handleFormChange}
          />

          <FormLabel className="label">Total Players you want</FormLabel>
          <Input
            type="number"
            className="input"
            name="membersLimit"
            onChange={handleFormChange}
          />

          <FormLabel className="label">Other Requirements</FormLabel>
          <Textarea className="input" cols="2" name="otherReq" onChange={handleFormChange} />
          <Input className="input" type="submit" value="Post" bgColor="#2684fc" color="white" />
        </FormControl>
      </form>
    </>
  );
};

export default FormComponent;
