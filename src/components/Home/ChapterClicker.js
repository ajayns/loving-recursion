import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import Lottie from "react-lottie"
import "@lottiefiles/lottie-player"
import { Link } from "gatsby"
// import TransitionLink from "gatsby-plugin-transition-link"
// import AniLink from "gatsby-plugin-transition-link/AniLink"

import Spacer from "../Spacer"

import eyeLottieData from "../../lotties/eg-lottie.json"
import backToHomeLottieData from "../../lotties/backToHome.json"

const IconLottie = ({ direction, animationData }) => {
  const lottieRef = useRef(null)
  const [speed, setSpeed] = useState(1)
  const [stopped, setIsStopped] = useState(true)

  const playForward = () => {
    setIsStopped(false);
    setSpeed(2);
    lottieRef.current.play();
  }

  const playBackward = () => {
    setIsStopped(false);
    setSpeed(-3);
    lottieRef.current.play();
  }

  useEffect((e) => {
    if(direction === 1) playForward();
    else if (direction === 2) playBackward();
    else console.log('CANT IDENTIFY');
  }, [direction])

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div>
      <Lottie
        speed={speed}
        isStopped={stopped}
        ref= {lottieRef}
        options={defaultOptions}
        height={32}
        width={32}
      />
    </div>
  )
}

export const ChapterAnnouncement = () => {
  return (
    <li className="chapter-list__inter">
      <div>
        <h3 style={{ color: "var(--color-blue-0)" }}>
          New chapter every 2 weeks
        </h3>
        <Spacer height="sp_base" />
        <p style={{ color: "var(--color-yellow-0)" }}>
          I announce new chapters on my <a href="https://twitter.com/nashvail" target="__blank">Twitter</a>and <a target="__blank" href="https://dribbble.com/nashvail">Dribbble</a>.
        </p>
      </div>
    </li>
  )
}

const ChapterClicker = ({ number, name, link = "#", home }) => {
  // 1 is forward, 2 is backward
  const [lottieDirection, setLottieDirection] = useState(0)

  const handleOnMouseEnter = e => {
    setLottieDirection(1);
  }

  const handleOnMouseLeave = e => {
    setLottieDirection(2);
  }

  const mainClassName = home ? "chapter-list__item--home" : "chapter-list__item";

  return (
    <li className={mainClassName}>
      <Link
        to={link}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div>
          <span className="chapter-list__item__chapter-number">
            {typeof number === 'number' ? `Chapter ${number}` : number}
          </span>
          <span className="chapter-list__item__chapter-name">{name}</span>
        </div>
        <div>
          <IconLottie animationData={home ? backToHomeLottieData : eyeLottieData} direction={lottieDirection} />
        </div>
      </Link>
    </li>
  )
}

ChapterClicker.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default ChapterClicker
