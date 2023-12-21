import React, { useEffect } from "react";
import Select from "react-select";
import ReactQuillEditor from "../ReactQuill";
import { useState } from "react";

const Form = ({
  formFields,
  register,
  setValue,
  handleSubmit,
  onSubmit,
  onIsEditChange,
}) => {
  const imageValue = formFields.filter((item) => item.name === "image");
  console.log("Image value", imageValue);
  const [imageDeputy, setImageDeputy] = useState({
    firstImage:
      imageValue && imageValue[0] && imageValue[0].value
        ? imageValue[0].value
        : null,
    secondImage: null,
  });

  const contentQuill = formFields.find((item) => item.type === "react-quill");

  useEffect(() => {
    const imageField = formFields.find((item) => item.name === "image");

    if (imageField) {
      setImageDeputy((prevState) => ({
        ...prevState,
        firstImage: imageField.value,
      }));
      setValue("image", imageField.value[0]);
    }

    formFields.forEach((field) => {
      setValue(field.name, field.value);
    });
  }, [formFields]);

  const [content, setContent] = useState(
    contentQuill ? contentQuill.value : ""
  );

  const handleSelectChange = (selectedOption, fieldName) => {
    setValue(fieldName, selectedOption);
  };

  const handleImageChange = async (e, inputName) => {
    e.preventDefault();
    if (onIsEditChange) {
      onIsEditChange(true);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageDeputy((prevState) => ({
          ...prevState,
          [inputName]: reader.result,
        }));

        // try {
        //   // setLoading(true);
        //   const imageUrl = await uploadImageToFirebase(file);
        //   setValue("image", imageUrl);
        //   // setLoading(false);
        //   // Ở đây bạn có thể sử dụng imageUrl để lưu vào state hoặc dùng theo nhu cầu của bạn
        // } catch (error) {
        //   // Xử lý lỗi tại đây nếu upload thất bại
        //   console.error("Error uploading image to Firebase:", error);
        // }
      };
      reader.readAsDataURL(file);
    }
    return false;
  };

  const renderField = (field) => {
    if (field.type === "react-quill") {
      return (
        <>
          <span className=" font-semibold text-sm ">
            {field.label}
            <span className="text-red-600 text-[16px] ml-1">*</span>
          </span>
          <ReactQuillEditor
            {...register(field.name)}
            defaultValue={field.value}
            content={content}
            setContent={(value) => {
              setContent(value);
              setValue(field.name, value);
            }}
          />
        </>
      );
    }

    if (field.type === "select") {
      return (
        <>
          <span className=" font-semibold text-sm ">
            {field.label}
            <span className="text-red-600 text-[16px] ml-1">*</span>
          </span>
          <Select
            options={field.options}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption.value, field.name)
            }
            value={field.value}
            placeholder={`${field.label}`}
            required
          />
        </>
      );
    }

    if (field.type === "file" && field.name === "image") {
      return (
        <div className={field.col_span ? "col-span-2" : ""} key={field.name}>
          <label>
            <span className="block font-semibold text-sm">
              {field.label}
              <span className="text-red-600 text-[16px] ml-1">*</span>
            </span>

            {imageDeputy.firstImage ? (
              <div className={`w-[200px] relative `}>
                <img
                  width={200}
                  src={imageDeputy.firstImage}
                  style={{ width: "200px" }}
                  className="object-cover "
                  alt=""
                />
              </div>
            ) : (
              <div></div>
            )}
            <input
              accept=".jpg, .png, .jpeg, .svg"
              type={field.type}
              {...register(field.name)}
              onChange={(e) => handleImageChange(e, "firstImage")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>
      );
    }

    return (
      <label key={field.name}>
        <span className="block font-semibold text-sm ">
          {field.label}
          <span className="text-red-600 text-[16px] ml-1">*</span>
        </span>
        <div className=" relative">
          <input
            type={field.type}
            {...register(field.name)}
            defaultValue={field.value}
            className="w-full rounded h-[36px] border px-2 border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
            required
          />
        </div>
      </label>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-5 text-left">
      {formFields.map((field, index) => (
        <div
          className={`${field.col_span === true ? "col-span-2" : ""}`}
          key={index}
        >
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default Form;
