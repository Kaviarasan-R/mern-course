import "./styles/App.css";
import Parent from "./props/Parent";
import UseStateHook from "./UseStateHook";
import UseEffectHook from "./UseEffectHook";

import Posts from "./context/Posts";
import SimpleRef from "./ref/SimpleRef";
import ParentRef from "./ref/ParentRef";
import ParentMemo from "./memoization/ParentMemo";
import UseReducerHook from "./UseReducerHook";
import { useState } from "react";
import PostProvider from "./providers/postProvider";
import Users from "./context/User";
import UserProvider from "./providers/userProvider";
import { LifecycleApp } from "./LifecycleDemo";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const [show, setShow] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LifecycleApp />} />
        <Route
          path="props"
          element={<Parent name={"kavi"} surname={"arasan"} />}
        />
        <Route path="hooks">
          <Route path="use-state" element={<UseStateHook />} />
          <Route
            path="use-effect"
            element={
              <div style={{ marginTop: "20px" }}>
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => setShow(!show)}>
                    Toggle UseEffectHook
                  </button>
                  {show ? <UseEffectHook value={1} /> : <></>}
                </div>
              </div>
            }
          />
          <Route
            path="use-context"
            element={
              <>
                <PostProvider>
                  <div style={{ margin: "20px" }}>
                    <Posts id={1} />
                    <UserProvider>
                      <div
                        style={{
                          margin: "20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <Users id={1} />
                        <Posts id={1} />
                      </div>
                    </UserProvider>
                  </div>
                </PostProvider>

                {/* <Posts id={3} /> */}
              </>
            }
          />
          <Route
            path="use-ref"
            element={
              <>
                <SimpleRef />
                <ParentRef />
              </>
            }
          />
          <Route path="use-memo" element={<ParentMemo />} />
          <Route path="use-reducer" element={<UseReducerHook />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
