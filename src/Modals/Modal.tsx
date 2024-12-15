import { useEffect } from "react";
import ReactDOM from "react-dom";
import {ModalProps} from "../context/Interfaces"

function Modal({ onClose, children, actionBar, modalWidthClass }: ModalProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="opacity-100 bg-black h-screen w-screen top-0 left-0 fixed z-50 bg-opacity-90 dark:bg-opacity-90">
      <div className="fixed inset-0 opacity-100 flex items-center justify-center z-60 p-4 overflow-x-hidden overflow-y-auto md:inset-0">
        <div className={`relative w-full ${modalWidthClass}`}>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-4 inset-40 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Zamknij okno</span>
            </button>
            <div
              className="px-8 py-8 lg:px-8"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              {children}
              <div className="flex justify-end">{actionBar}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modal-container") as Element,
  );
}

export default Modal;
