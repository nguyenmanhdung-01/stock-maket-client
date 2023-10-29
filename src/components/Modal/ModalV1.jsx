import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
export default function ModalV1({
  title,
  children,
  open,
  setOpen,
  className,
  classNameChildren,
  isCheckedItems,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${className ? className : ""}relative z-40`}
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 phone:translate-y-0 phone:scale-95"
              enterTo="opacity-100 translate-y-0 phone:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 phone:scale-100"
              leaveTo="opacity-0 translate-y-4 phone:translate-y-0 phone:scale-95"
            >
              <Dialog.Panel
                className={`${
                  classNameChildren ? classNameChildren : " w-[500px]"
                } max-h-[700px] overflow-y-auto m-auto relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
                  <button
                    className=" hover:bg-gray-100 absolute right-1 top-0 text-base"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    <IoClose className=" text-[30px]" />
                  </button>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="items-center text-center mt-2 text-[12px]">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
                {isCheckedItems === 0 && (
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Đóng
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
