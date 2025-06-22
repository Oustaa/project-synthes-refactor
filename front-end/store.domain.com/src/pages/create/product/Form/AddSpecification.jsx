import React, { useEffect, useState } from "react";
import {
  FlexContainer,
  StyledButton,
  StyledInputGroup,
} from "../../../../styles";
import { useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import {
  StyledSection,
  StyledSectionForm,
} from "../../../../styles/styled-extandedSection";

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

const StyledExtraSpecifications = styled.div`
  width: 100%;
  h3 {
    margin-bottom: var(--spacing-lg);
  }
`;

const StyledSpecifications = styled.ul`
  padding-left: 0;
`;

const StyledSpecification = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px dashed var(--dark-600);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  & + & {
    margin-top: var(--spacing-lg);
  }
  span {
    color: var(--dark-500);
  }
`;

async function getSpecifications(data, cb, gategories_ids = []) {
  console.log(gategories_ids);
  const results = [];

  await data.forEach((category) => {
    category?.subCategories?.forEach((subCat) => {
      if (subCat.specifications) {
        subCat.specifications.forEach((spec) => {
          if (gategories_ids.includes(subCat.name)) results.unshift(spec);
          else results.push(spec);
        });
      }
    });
  });
  const optionsString = new Array(...new Set(results));

  const options = optionsString.map((option) => {
    return { value: option, label: option };
  });

  cb(options);
}

const AddSpecification = ({ data, changeHandler }) => {
  const [options, setOptions] = useState([]);
  const categories = useSelector((state) => state.store.categories);
  const [specName, setSpecName] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [mode, setMode] = useState("insert");
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    getSpecifications(categories, setOptions, data.subcategories_id);
  }, [categories, data.subcategories_id]);

  const addClickHandler = (e) => {
    if (!specName || !specValue) return;
    if (data.specifications)
      changeHandler({
        target: {
          name: "specifications",
          value: [
            ...data.specifications,
            { name: specName.value, value: specValue },
          ],
        },
      });
    else
      changeHandler({
        target: {
          name: "specifications",
          value: [{ name: specName.value, value: specValue }],
        },
      });

    setSpecName("");
    setSpecValue("");
    setMode("");
  };

  const deleteSpecfication = (specefication) => {
    const filtred = data.specifications.filter((spec) => {
      return spec !== specefication;
    });
    console.log(filtred);
    if (data.specifications.length === 0) setMode("insert");
    else setMode("");
    setEditId(-1);
    changeHandler({ target: { name: "specifications", value: filtred } });
  };

  const editBtnClickHandler = (index) => {
    setEditId(index);
    setSpecName(data.specifications[index].name);
    setSpecValue(data.specifications[index].value);

    setMode("edit");
  };

  const canselEdit = () => {
    setMode("insert");
    setEditId(-1);
  };

  const canselInsert = () => {
    setMode("");
  };

  const saveHandler = () => {
    const updatedAbouts = data.specifications.map((spec, id) => {
      if (id === editId) return { name: specName, value: specValue };
      return spec;
    });
    changeHandler({ target: { name: "specifications", value: updatedAbouts } });
    setSpecName("");
    setSpecValue("");
    setMode("");
    setEditId(-1);
  };

  return (
    <StyledSection>
      <StyledSpecifications>
        {data.specifications?.map((spec, i) => (
          <StyledSpecification key={i}>
            {i === editId ? (
              <StyledExtraSpecifications>
                <h3>Specification</h3>
                <StyledInputGroup>
                  <label htmlFor="name">
                    <h4>name:</h4>
                  </label>
                  <Select
                    closeMenuOnSelect={true}
                    onChange={(e) => setSpecName(e)}
                    options={options}
                    styles={Styles}
                    defaultValue={{ name: specName, label: specName }}
                  />
                </StyledInputGroup>
                <StyledInputGroup>
                  <label htmlFor="value">
                    <h4>Value:</h4>
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                  />
                </StyledInputGroup>
                <FlexContainer>
                  <StyledButton type="button" onClick={saveHandler}>
                    Save
                  </StyledButton>
                  <StyledButton
                    color={"var(--dark-600)"}
                    bgColor={"transparent"}
                    border={".5px solid var(--dark-600)"}
                    type="button"
                    onClick={() => deleteSpecfication(spec)}
                  >
                    <BsTrash />
                  </StyledButton>
                </FlexContainer>
              </StyledExtraSpecifications>
            ) : (
              <>
                <h4>
                  <span>{spec.name}</span>: {spec.value}
                </h4>
                <StyledButton
                  color={"var(--dark-600)"}
                  bgColor={"transparent"}
                  border={".5px solid var(--dark-600)"}
                  type="button"
                  onClick={() => editBtnClickHandler(i)}
                >
                  <BsPencil />
                </StyledButton>
              </>
            )}
          </StyledSpecification>
        ))}
      </StyledSpecifications>
      {mode === "insert" ? (
        <StyledExtraSpecifications>
          <StyledSectionForm>
            <h3>Specification</h3>

            <StyledInputGroup>
              <label htmlFor="name">
                <h4>name:</h4>
              </label>
              <Select
                closeMenuOnSelect={true}
                onChange={(e) => setSpecName(e)}
                value={specName}
                options={options}
                styles={Styles}
              />
            </StyledInputGroup>
            <StyledInputGroup>
              <label htmlFor="value">
                <h4>Value:</h4>
              </label>
              <input
                type="text"
                name="value"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
              />
            </StyledInputGroup>
            <FlexContainer>
              <StyledButton type="button" onClick={addClickHandler}>
                Add
              </StyledButton>
            </FlexContainer>
          </StyledSectionForm>
        </StyledExtraSpecifications>
      ) : (
        <StyledButton
          type="button"
          onClick={canselEdit}
          color={"var(--dark-600)"}
          bgColor={"transparent"}
          border={".5px solid var(--dark-600)"}
        >
          <BsPlus /> Add Specification
        </StyledButton>
      )}
    </StyledSection>
  );
};

export default AddSpecification;
