import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [btnTxt, setBtnTxt] = useState("Copy");

  let getPassword = useCallback(() => {
    setBtnTxt("Copy");
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  let copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    setBtnTxt("Copied");
  };

  useEffect(() => {
    getPassword();
  }, [length, numberAllowed, charAllowed, getPassword]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center px-2">
        <div>
          <h1 className="text-center text-2xl font-extralight leading-none text-zinc-200">
            Password Generator with ReactJS
          </h1>
          <p className="text-zinc-400 font-light text-sm leading-none mt-3 text-center">
            Project 02 styling with TailwindCSS
          </p>
          <div
            className="lg:w-[550px] md:w-[500px] sm:w-[450px] w-full
            mx-auto bg-zinc-900/40 lg:p-8 md:p-7 sm:p-6 p-3 rounded-xl mt-5"
          >
            <div className="flex">
              {/* input text feild and button ------ */}
              <input
                type="text"
                placeholder="Password"
                readOnly
                value={password}
                className="py-2.5 px-5 bg-zinc-700 text-white cursor-default
                sm:text-base text-sm font-extralight outline-none block w-full rounded-s-full"
              />

              {/*Copy Button -----*/}
              <div>
                <button
                  type="button"
                  onClick={copyPassword}
                  className="bg-green-500 hover:bg-green-600 transition-all
                  h-full text-white sm:text-base text-sm sm:px-6 px-5 leading-none
                  rounded-e-full font-light block"
                >
                  {btnTxt}
                </button>
              </div>
            </div>

            {/* Length range and check boxes here ------ */}
            <div className="flex flex-wrap items-center sm:justify-between gap-3 w-full mt-6">
              <div className="flex items-center group ">
                <input
                  type="range"
                  min={5}
                  max={20}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="h-0.5 cursor-pointer"
                />
                <label
                  className="text-zinc-300 group-hover:text-white transition-all
                 text-xs font-light leading-none ps-2"
                >
                  Length({length})
                </label>
              </div>
              <div className="flex items-center group ">
                <label
                  htmlFor="numbers"
                  className="text-zinc-400 transition-all text-xs
                   cursor-pointer font-light leading-none flex items-center has-[:checked]:text-white"
                >
                  <input
                    id="numbers"
                    type="checkbox"
                    className="cursor-pointer opacity-0 h-0 w-0 border-0 outline-none peer"
                    onChange={() => {
                      setNumberAllowed((prevValue) => !prevValue);
                    }}
                  />
                  <i className="bi bi-circle text-green-500 text-base leading-none block pe-1.5 peer-checked:hidden"></i>
                  <i className="bi bi-check-circle text-green-500 text-base leading-none pe-1.5 hidden peer-checked:block"></i>
                  Numbers
                </label>
              </div>
              <div className="flex items-center group">
                <label
                  htmlFor="chars"
                  className="text-zinc-400 transition-all text-xs
                   cursor-pointer font-light leading-none flex items-center has-[:checked]:text-white"
                >
                  <input
                    id="chars"
                    type="checkbox"
                    className="cursor-pointer opacity-0 h-0 w-0 border-0 outline-none peer"
                    onChange={() => {
                      setcharAllowed((prevValue) => !prevValue);
                    }}
                  />
                  <i className="bi bi-circle text-green-500 text-base leading-none block pe-1.5 peer-checked:hidden"></i>
                  <i className="bi bi-check-circle text-green-500 text-base leading-none pe-1.5 hidden peer-checked:block"></i>
                  Symbols
                </label>
              </div>
            </div>
            <div className="mt-8 text-end">
              <button
                onClick={() => getPassword()}
                type="button"
                className="text-zinc-400 transition-all hover:text-white
                text-xs leading-none rounded-full font-light py-2 px-3 border
                 border-zinc-400 hover:border-white"
              >
                Regenerate Password <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <p className="text-center text-zinc-400 text-xs mt-5 font-light">
            By Harsh Kushwaha
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
