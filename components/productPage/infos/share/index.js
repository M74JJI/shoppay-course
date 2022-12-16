import styles from "./styles.module.scss";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function Share() {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={38} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={38} />
      </TwitterShareButton>
      <LinkedinShareButton url={window?.location.href}>
        <LinkedinIcon size={38} />
      </LinkedinShareButton>
      <RedditShareButton url={window?.location.href}>
        <RedditIcon size={38} />
      </RedditShareButton>
      <TelegramShareButton url={window?.location.href}>
        <TelegramIcon size={38} />
      </TelegramShareButton>
      <WhatsappShareButton url={window?.location.href}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>
      <PinterestShareButton url={window?.location.href}>
        <PinterestIcon size={38} />
      </PinterestShareButton>
      <EmailShareButton url={window?.location.href}>
        <EmailIcon size={38} />
      </EmailShareButton>
    </div>
  );
}
