import React, { useState, useEffect } from "react";
import { StyledInputGroup } from "../../../../styles";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../features/store-slice";

import Select from "react-select";

async function setOptionsHandler(data, cb) {
  const test = [];
  await data.forEach((category) => {
    category.subCategories.forEach((subCat) => {
      test.push({
        value: { category_id: category._id, susubcategory_id: subCat.name },
        label: subCat.name,
      });
    });
  });
  console.log(data);
  cb(test);
}

const Styles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "var(--dark-500)",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "var(--white)",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "var(--white)",
    ":hover": {
      backgroundColor: "var(--dark-800)",
      color: "white",
    },
  }),
};

const Categories = ({ changeHandler }) => {
  const categories = useSelector((state) => state.store.categories);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
    setOptionsHandler(categories, setOptions);
  }, []);

  const handelChange = (eventValue) => {
    changeHandler({
      target: {
        name: "categories_id",
        value: eventValue.map((elem) => elem.value.category_id),
      },
    });
    changeHandler({
      target: {
        name: "subcategories_id",
        value: eventValue.map((elem) => elem.value.susubcategory_id),
      },
    });
  };

  return (
    <StyledInputGroup>
      <label htmlFor="category">
        <h4>Category:</h4>
      </label>
      <Select
        onChange={handelChange}
        removeValue={(e) => {
          console.log(e);
          console.log("cleared");
        }}
        closeMenuOnSelect={false}
        isMulti
        options={options}
        styles={Styles}
      />
    </StyledInputGroup>
  );
};

export default Categories;
