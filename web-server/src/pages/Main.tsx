import * as React from "react";
import SessionContext from "../auth/AuthContext";

function Main() {
  return (
    <main className="yellow">
      <SessionContext>
        <h1 className="">Content</h1>
        <h2 className="">Content</h2>
        <p className="">
          Ex eu aute in proident magna culpa minim nulla aliquip ea.
          Exercitation tempor aliquip culpa aliqua pariatur eiusmod aute. Aliqua
          culpa culpa est voluptate quis ullamco tempor aute aliquip occaecat
          commodo eu elit sit. Mollit anim officia tempor ut ex aute anim ad ex
          non enim do. Labore culpa magna irure dolor commodo sunt do irure.
          Elit proident non ea Lorem commodo anim non amet irure velit eiusmod
          exercitation amet. Eiusmod non mollit reprehenderit irure veniam
          exercitation in. Non nisi consectetur adipisicing nisi ad laboris
          pariatur amet eiusmod cupidatat. Deserunt ipsum occaecat consequat
          eiusmod sint eiusmod est nisi enim consectetur ipsum amet.
        </p>
      </SessionContext>
    </main>
  );
}

export default Main;
