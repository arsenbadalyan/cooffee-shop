import React from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const styles = require("./footer.module.scss");

type FooterProps = {};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerItems}>
        <div className={styles.brandItems}>
          <Link href="/">
            <a className={styles.logo}>COOFFEE</a>
          </Link>
          <div className={styles.socialContainer}>
            <a
              className={styles.socialIcon}
              href="https://twitter.com/arsenbadalyan0"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              className={styles.socialIcon}
              href="https://github.com/arsenbadalyan"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              className={styles.socialIcon}
              href="https://www.linkedin.com/in/arsenbadalyan/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className={styles.storeItems}>
          <a
            href="https://www.google.com/moon/"
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.locationItems}>
              <span>717 Crater Ln,</span>
              <span>City Moon, 11101</span>
            </div>
          </a>
          <span>08:00 - 06:00pm daily</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
