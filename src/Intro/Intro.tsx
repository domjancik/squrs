/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { ReactElement } from "react";
import Button from "../Button/Button";

const cssIntro = css`
  color: white;
  text-align: center;
`;

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Intro({ onClick }: Props): ReactElement {
  return (
    <div css={cssIntro}>
      <h1>
        NINA@
        <a
          href="https://telavivmakers.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TAMI
        </a>
      </h1>
      <h2>
        <a
          href="https://sonic-pi.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sonic Pi
        </a>
      </h2>
      <h1>Workshop</h1>
      <div>
        <Button style={{ fontSize: "1.5em" }} onClick={onClick}>
          {">_"} run invite
        </Button>
      </div>
      <div>
        <small>
          <a
            href="https://github.com/domjancik/squrs"
            target="_blank"
            rel="noopener noreferrer"
          >
            powered by squr!
          </a>
        </small>
      </div>
    </div>
  );
}

export default Intro;
