// import "./style.css";
import React, { useEffect, useRef } from "react";
// import { supabase } from "../../libs/supbase";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";

window.Quill = Quill;
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "";
const fontSizeArr = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "24px",
  "32px",
  "42px",
  "54px",
  "68px",
  "84px",
  "98px",
];
const ReactQuillEditor = ({ content, setContent }) => {
  const quillRef = useRef(null);
  const Size = Quill.import("attributors/style/size");
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);

  useEffect(() => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p",
        "strong",
        "em",
        "u",
        "ol",
        "ul",
        "li",
        "a",
        "img",
        "div",
        "span",
        "sub",
        "sup",
        "iframe",
        "pre",
        "br",
      ],
      ALLOWED_ATTR: [
        "href",
        "class",
        "src",
        "alt",
        "style",
        "spellcheck",
        "rel",
        "target",
      ],
    });

    setContent(sanitizedContent);
    // if (quillRef.current) {
    //   const quillInstance = quillRef.current.getEditor();
    //   quillInstance.getModule("toolbar").addHandler("image", imageHandler);
    //   quillInstance.getModule("toolbar").addHandler("video", videoHandler);
    // }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [
          { header: "1" },
          { header: "2" },
          { header: [3, 4, 5, 6] },
          { font: [] },

          {
            size: fontSizeArr,
          },
        ],

        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "video", "image"],
        ["clean"],
        ["code-block"],
        [{ align: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
      ],
    },
    // imageResize: true,
    // ImageResize: {
    //   modules: ["Resize", "DisplaySize", "Toolbar"],
    imageResize: {
      parchment: Quill.import("parchment"),
      module: "Resize",
    },
    // },
    // imageDrop: true,
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "file",
    "video",
    "code-block",
    "color",
    "align",
    "direction",
    "indent",
    "background",
    "script",
    "alt",
    "height",
    "width",
    "style",
    "size",
  ];

  const handleChange = (value) => {
    setContent(value);
  };

  // function imageHandler() {
  //   const fileInput = document.createElement("input");
  //   fileInput.setAttribute("type", "file");
  //   fileInput.setAttribute(
  //     "accept",
  //     "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
  //   );
  //   fileInput.classList.add("ql-image");
  //   fileInput.onchange = async (e) => {
  //     const file = fileInput.files[0];
  //     // console.log(file);
  //     const fileExt = file.name.split(".").pop();
  //     const filePath = `images/${Date.now()}-${file.name}.${fileExt}`;
  //     // Hiển thị toast loading khi đang upload ảnh
  //     toast.info("Đang tải ảnh lên...", {
  //       toastId: "uploading-toast",
  //       autoClose: false,
  //     });
  //     const { data, error } = await supabase.storage
  //       .from(SUPABASE_BUCKET)
  //       .upload(filePath, file);
  //     if (error) {
  //       console.error("Error uploading image:", error);
  //       toast.error("Error uploading image");
  //     } else {
  //       const imageUrl = supabase.storage
  //         .from(SUPABASE_BUCKET)
  //         .getPublicUrl(filePath);
  //       // console.log("thanh cong: ", imageUrl.data.publicUrl);
  //       // Chèn hình ảnh vào trình soạn thảo
  //       const quillInstance = quillRef.current.getEditor();
  //       const range = quillInstance.getSelection(true);
  //       quillInstance.insertEmbed(
  //         range.index,
  //         "image",
  //         imageUrl.data.publicUrl
  //       );
  //       // Đóng toast loading và hiển thị toast thành công
  //       toast.dismiss("uploading-toast");
  //       toast.success("Ảnh được thêm thành công");
  //     }
  //   };
  //   fileInput.click();
  // }

  // function videoHandler() {
  //   const fileInput = document.createElement("input");
  //   fileInput.setAttribute("type", "file");
  //   fileInput.setAttribute("accept", "video/*");
  //   fileInput.classList.add("ql-video");
  //   fileInput.onchange = async (e) => {
  //     const file = fileInput.files[0];
  //     const fileExt = file.name.split(".").pop();
  //     const filePath = `images/${Date.now()}-${file.name}`;
  //     console.log(file, fileExt, filePath);
  //     // Hiển thị toast loading khi đang upload ảnh
  //     toast.info("Đang tải video lên...", {
  //       toastId: "uploading-toast",
  //       autoClose: false,
  //     });
  //     const { data, error } = await supabase.storage
  //       .from(SUPABASE_BUCKET)
  //       .upload(filePath, file);
  //     // console.log("fileInput: ", fileInput);
  //     if (error) {
  //       console.error("Error uploading image:", error);
  //       toast.error("Error uploading image");
  //     } else {
  //       const videoUrl = supabase.storage
  //         .from(SUPABASE_BUCKET)
  //         .getPublicUrl(filePath);
  //       const quillInstance = quillRef.current.getEditor();
  //       const range = quillInstance.getSelection(true);
  //       quillInstance.insertEmbed(
  //         range.index,
  //         "video",
  //         videoUrl.data.publicUrl
  //       );
  //       // Đóng toast loading và hiển thị toast thành công
  //       toast.dismiss("uploading-toast");
  //       toast.success("Video được thêm thành công");
  //     }
  //   };
  //   fileInput.click();
  // }

  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="border border-slate-400 dark:text-white"
      />
    </>
  );
};

export default ReactQuillEditor;
