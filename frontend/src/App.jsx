import { useState } from "react";
import { WidgetReactMultiFile } from "./pages/WidgetReactMultiFile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WidgetReactSingleFile } from "./pages/WidgetReactSingleFile";

function App() {
  const [selectedType, setSelectedType] = useState("default");

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full">
        <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
          <h1 className="text-3xl font-bold">React Node Cloudinary Demo</h1>
        </div>
        <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
          <form className="max-w-sm mx-auto w-full">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value={"default"}>Choose a Type</option>
              <option value={"widget-react-single-file"}>
                Upload Widget in React Single File
              </option>
              <option value={"widget-react-multi-file"}>
                Upload Widget in React Multi File
              </option>
            </select>
          </form>
        </div>
        {selectedType === "default" && (
          <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
            <p className="text-lg font-bold">
              Please select a type to continue.
            </p>
          </div>
        )}
        {selectedType === "widget-react-single-file" && (
          <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
            <WidgetReactSingleFile />
          </div>
        )}
        {selectedType === "widget-react-multi-file" && (
          <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
            <WidgetReactMultiFile />
          </div>
        )}
      </div>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
