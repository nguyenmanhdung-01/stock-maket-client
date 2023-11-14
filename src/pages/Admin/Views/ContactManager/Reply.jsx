import dayjs from "dayjs";
import React from "react";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reply = ({ dataReply }) => {
  //console.log(dataReply);
  //console.log(dataReply.replies.map((reply) => reply.content));
  return (
    <div className="mt-5 px-3 pb-4">
      <div className="flex items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faFileLines} className="text-2xl" />
        <span className="text-[18px] text-[#818181] dark:text-yellow-400 font-bold">
          Re: {dataReply.title}
        </span>
      </div>
      <table className="border-collapse border border-slate-500 w-full">
        <tbody>
          <tr>
            <td className="py-1 px-2 w-[13%] align-baseline">
              Thông tin người gửi
            </td>
            <td className="border border-slate-700 py-1 px-2">
              <p>
                <span className="text-[#0074a2] mr-[5px]">
                  {dataReply.username}
                </span>
                <span>{dataReply.email}</span>
              </p>
            </td>
          </tr>
          {dataReply.replies.map((reply) => (
            <>
              <tr>
                <td className="border border-slate-700 w-[13%] py-1 px-2">
                  Phản Hồi Tới
                </td>
                <td className="border border-slate-700 py-1 px-2">
                  {dayjs(reply.created_at).format("H:mm DD/MM/YYYY")}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-700 py-1 px-2" colSpan={2}>
                  <br />
                  <div
                    style={{
                      "max-height": "unset",
                    }}
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: reply.content,
                    }}
                    q
                  ></div>
                  {/* <br />
              <br />
              Best regards,
              <br />
              <br />
              admin
              <br />
              Administrator
              <br />
              <br />
              E-mail: hoidoanhnhanthanhhoa.hbta@gmail.com */}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reply;
