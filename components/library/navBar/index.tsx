import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { debounce } from "../../../utils/helpers";
import MenuToggle from "../animations/menuToggle";

const styles = require("./navBar.module.scss");

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  // Nav routes / socials
  const navItems = [
    { name: "menu", href: "/#menu" },
    { name: "about", href: "/#about" },
    { name: "shop", href: "/shop" },
    { name: "contact", href: "/contact" },
    { name: "cargo", href: "/shop/cargo" }
  ];
  const socialItems = [
    { icon: <FaTwitter />, href: "https://twitter.com/arsenbadalyan0" },
    { icon: <FaGithub />, href: "https://github.com/arsenbadalyan" },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/arsenbadalyan",
    },
  ];

  // Handle initial position of nav underline
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const splittedPath = window.location.href.split("/");
    const pathRoot = splittedPath.at(-1);
    
    switch (pathRoot) {
      case "contact":
        setSelected(3);
        break;
      case "shop":
        setSelected(2);
        break;
      case "cargo":
        setSelected(4);
        break;
      case "#about":
        setSelected(1);
        break;
      default:
        setSelected(0);
    }
  }, []);

  // State / Animation setting for nav dropdown on smaller screen
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebar = {
    open: {
      clipPath: "inset(0px)",
      transition: {
        delay: 0.1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    closed: {
      clipPath: `inset(0px 0px 500px 0px)`,
      transition: {
        delay: 0.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  // Hide nav on scroll down and show on scroll up
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollAtTop, setScrollAtTop] = useState(true);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.scrollY;
      const scrollBuffer = 20;
      const scrollMinDisplay = 5;

      const scrollUpIsPastBuffer =
        prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > scrollBuffer;

      const scrollIsAtTop = currentScrollPos <= scrollMinDisplay;

      setShowNav(scrollUpIsPastBuffer || scrollIsAtTop);
      setScrollAtTop(scrollIsAtTop);
      setPrevScrollPos(currentScrollPos);
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, showNav, scrollAtTop]);

  return (
    <nav
      className={
        showNav
          ? scrollAtTop
            ? styles.navContainer
            : styles.navContainerShadow
          : styles.navContainerHidden
      }
    >
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo} onClick={() => setSelected(0)}>
            COOFFEE
          </a>
        </Link>
      </div>
      {/* Viewable on larger browsers */}
      <div className={styles.socialIconsContainer}>
        {socialItems.map((social, index) => {
          return (
            <a
              key={index}
              className={styles.socialIcon}
              href={social.href}
              target="_blank"
              rel="noreferrer"
            >
              {social.icon}
            </a>
          );
        })}
      </div>
      <div className={styles.navRoutesContainer}>
        {navItems.map((item, key) => (
          <NavItem
            key={key}
            item={item}
            isSelected={selected === key}
            onClick={() => setSelected(key)}
            layoutId="horizontal"
          />
        ))}
      </div>
      {/* Viewable on smaller browsers */}
      <div className={styles.menuContainer}>
        <MenuToggle isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <motion.div
          className={isMenuOpen ? styles.dropDownContainer : styles.hideElement}
          variants={sidebar}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <div className={styles.dropdownItemContainer}>
            <div className={styles.socialIconContainerSmall}>
              {socialItems.map((social, index) => {
                return (
                  <a
                    key={index}
                    className={styles.socialIcon}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
            <div className={styles.navRoutesContainerSmall}>
              {navItems.map((item, key) => (
                <NavItem
                  key={key}
                  item={item}
                  isSelected={selected === key}
                  onClick={() => setSelected(key)}
                  layoutId="vertical"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default NavBar;

type NavItemProps = {
  item: { name: string; href: string };
  isSelected: boolean;
  onClick: () => void;
  layoutId: string;
};

// Initial approach taken from https://framermotionplayground.com/tutorial/underlined-menu
const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const { item, isSelected, onClick, layoutId } = props;

  return (
    <div className={styles.navItem} onClick={onClick}>
      <Link href={item.href}>
        <a>{item.name}</a>
      </Link>
      {isSelected && (
        <motion.div className={styles.navUnderline} layoutId={layoutId} />
      )}
    </div>
  );
};
