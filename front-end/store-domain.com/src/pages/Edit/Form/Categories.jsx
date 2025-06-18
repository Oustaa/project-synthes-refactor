import React, { useState, useEffect } from "react";
import { StyledInputGroup } from "../../../styles";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../features/store-slice";

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

const Categories = ({ changeHandler, data }) => {
  const [selectedCat, setSelectedCat] = useState([]);
  const categories = useSelector((state) => state.store.categories);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
    setOptionsHandler(categories, setOptions);

    setSelectedCat(
      data.subcategories_id.map((subCat) => {
        for (var category of categories) {
          for (var sub of Object.values(category)[3]) {
            if (Object.values(sub)[0] === subCat) {
              return {
                value: {
                  susubcategory_id: subCat,
                  category_id: category._id,
                },
                label: subCat,
              };
            }
          }
        }
      })
    );
  }, []);
  useEffect(() => {
    console.log(selectedCat);
  }, [selectedCat]);

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
      {selectedCat.length && (
        <>
          <label htmlFor="category">
            <h4>Category:</h4>
          </label>
          <Select
            onChange={handelChange}
            defaultValue={selectedCat}
            closeMenuOnSelect={false}
            isMulti
            options={options}
            styles={Styles}
          />
        </>
      )}
    </StyledInputGroup>
  );
};

export default Categories;
