import { cn } from "@/lib/utils";
import SectionHeader from "./section-header";

import styles from "./styles/contact.module.css";

const Contact = () => {
  return (
    <div data-testid="Contact" className={styles.Contact}>
      <SectionHeader header="Contact" />
      <div className="p-4">
        <p className={styles.ContactRow}>607 882 0531</p>
        <p className={styles.ContactRow}>ty@lerscott.com</p>
        <p className={styles.ContactRow}>Hampton, VA</p>
      </div>
    </div>
  );
};

export default Contact;
