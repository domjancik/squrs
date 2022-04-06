/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React from 'react'

const cssCredit = css`
  position: fixed;
  right: 2em;
  bottom: 2em;
  color: #abc;

  a {
    color: #abc;
  }
`
function Credit() {
  return (
    <div css={cssCredit}>
      <a href="https://domj.net" target="_blank">
        domj
      </a>
      <br />
      21-2
    </div>
  )
}

export default Credit
