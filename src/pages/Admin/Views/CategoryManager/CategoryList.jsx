import { useState } from "react";
import CategoryFormAdd from "./CategoryFormAdd";
import Modal from "../../../../components/Modal/Modal";
import FormEditCategory from "./FormEditCategory";
import axios from "axios";
import FormDeleteCategory from "./FormDeleteCategory";
import { GrAdd } from "react-icons/gr";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { getRoleGroup } from "../../../../utils/constants/formatStringName";

const DOMAIN = process.env.REACT_APP_STOCK;
const CategoryItem = ({ category, setOpen, open, fetchData }) => {
  const { auth } = useAuth();
  const nhomQuyen = getRoleGroup(auth);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [newsCategoryEdit, setNewsCategoryEdit] = useState();
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [newsCategoryDelete, setNewsCategoryDelete] = useState();

  const handleEdit = async (item) => {
    // console.log("vao day: ", item);
    setNewsCategoryEdit(item);
    setOpenEditForm(true);
  };

  const handleDelete = async (item) => {
    try {
      const result = await axios.get(
        `${DOMAIN}/newscategory/getOneCategory/${item.news_category_id}`,
        {
          withCredentials: true,
        }
      );
      setNewsCategoryDelete(result.data);
      setOpenDeleteForm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConfirmDelete = async () => {
    const values = newsCategoryDelete.map((item) => item.news_category_id);

    try {
      await axios.delete(`${DOMAIN}/newscategory/deletedManyCategory`, {
        data: values,
        withCredentials: true,
      });

      fetchData();
      setOpenDeleteForm(false);
      toast.success("Xóa danh mục thành công.");
    } catch (error) {
      toast.error("Xóa danh mục thất bại.");
    }
  };

  return (
    <div>
      <div
        className={`${
          category.father_id === null
            ? "mt-2 pt-3 px-3 border-[1px] border-gray-300 rounded-md  mb-3"
            : ""
        }`}
      >
        <div className="flex gap-2 items-center mb-3 ">
          <div className="flex-1 flex justify-between  rounded-lg px-2 py-1 ">
            <p>{category.name}</p>
            {nhomQuyen?.includes(7) && nhomQuyen?.includes(8) && (
              <div className="flex gap-2">
                {/* <button onClick={() => setOpen(category.news_category_id)}>
                <GrAdd />
              </button> */}
                <button onClick={() => handleEdit(category)}>
                  <AiTwotoneEdit />
                </button>

                <button onClick={() => handleDelete(category)}>
                  <AiTwotoneDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        {category.news_category_id === open && (
          <CategoryFormAdd
            value={category}
            fetchData={fetchData}
            setOpen={setOpen}
          />
        )}

        {category.children.length > 0 && (
          <div className="ml-4">
            {category.children.map((child) => (
              <CategoryItem
                key={child.news_category_id}
                category={child}
                setOpen={setOpen}
                open={open}
                fetchData={fetchData}
              />
            ))}
          </div>
        )}
      </div>
      <Modal
        open={openEditForm}
        setOpen={setOpenEditForm}
        // title="Sửa danh mục"
        displayButtonCancel={false}
      >
        <FormEditCategory
          newsCategoryEdit={newsCategoryEdit}
          setOpen={setOpenEditForm}
          fetchData={fetchData}
        />
      </Modal>

      {newsCategoryDelete ? (
        <Modal
          open={openDeleteForm}
          setOpen={setOpenDeleteForm}
          classNameButtonOk="bg-red-600 text-white font-bold"
          displayButtonOk={true}
          onOK={handleConfirmDelete}
        >
          <FormDeleteCategory newsCategoryDelete={newsCategoryDelete} />
        </Modal>
      ) : null}
    </div>
  );
};

const CategoryList = ({ categorys, setOpen, open, fetchData }) => {
  return (
    <div className={``}>
      {categorys.map((category) => (
        <CategoryItem
          key={category.news_category_id}
          category={category}
          setOpen={setOpen}
          open={open}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};
export default CategoryList;
