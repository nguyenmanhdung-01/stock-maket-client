import React, { useState } from "react";
import Card from "../../../../components/Card";
import ReactQuillEditor from "../../../../components/ReactQuill";
import Button from "../../../../components/Buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_STOCK;

const ContactReply = ({ dataReply }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log(id);
  const [content, setContent] = useState(
    `<br/><br/>----------<br/>Best regards,<br/><br/>admin<br/>Administrator<br/><br/>E-mail: dunglm363@gmail.com`
  );

  const sendReply = async () => {
    const strippedContent = content.replace(/(<([^>]+)>)/gi, "").trim();

    if (strippedContent === "") {
      // Nếu nội dung sau khi loại bỏ các thẻ HTML và khoảng trắng trống,
      // hiển thị thông báo lỗi hoặc thực hiện các xử lý khác
      alert("Vui lòng nhập nội dung");
      return;
    }
    const newContent = `<div class="ql-editor" data-gramm="false" contenteditable="true">${content}</div>`;
    // console.log("content: ", newContent);
    const data = { contactId: id, content: newContent };
    // console.log("data send: ", data);
    try {
      await toast.promise(axios.post(`${DOMAIN}/reply`, data), {
        pending: "Đang xử lý...",
        success: "Gửi phản hồi thành công",
        error: "Lỗi! Không thể gửi phản hồi... ",
      });
      // console.log(res.data);
      // navigate(`/admin/contact/${dataReply.contact_id}`, { reload: true });
      window.location.href = `/admin/contactManager/${dataReply.contact_id}`;
    } catch (error) {
      console.log(error.message);
    }
    //console.log(data);
  };
  return (
    <Card extra="mt-5">
      <table className="border-collapse border border-slate-500 rounded-lg">
        <tbody>
          <tr>
            <td className="border border-slate-700 px-2 py-1">Tiêu đề gửi</td>
            <td className="border border-slate-700 px-2 py-1">
              {dataReply.title}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-700 px-2 py-1">
              Gửi liên hệ tới email
            </td>
            <td className="border border-slate-700 px-2 py-1">
              {dataReply.email}
            </td>
          </tr>
          <tr>
            <td className="" colSpan={2}>
              <ReactQuillEditor content={content} setContent={setContent} />
            </td>
          </tr>

          <tr>
            <td className=" py-2" colSpan={2}>
              <Button
                colorBgr={
                  "bg-[#428bca] border border-[#357ebd] m-auto text-white "
                }
                title={"Gửi phản hồi"}
                onClick={sendReply}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default ContactReply;
