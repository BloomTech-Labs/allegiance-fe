import React, { useState, useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
// import DownSvg from 'assets/svg/DownSvg'
import styled from 'styled-components'
import { AvatarPopup } from './AvatarPopup'

export const Avatar = ({ user }) => {
  const popupRef = useRef()
  const [isMenuOpen, setMenu] = useState(false)
  useOnClickOutside(popupRef, () => setMenu(false))

  return (
    <StyledAvatar ref={popupRef}>
      <div className='image-arrow' onClick={() => setMenu(prev => !prev)}>
        <img className='menu-image' src={user.image} alt='avatar' />
      </div>
      {isMenuOpen ? <AvatarPopup user={user} /> : null}
    </StyledAvatar>
  )
}

const StyledAvatar = styled.div`
  height: 40px;
  width: 61px;
  display: flex
  align-items: center
`
