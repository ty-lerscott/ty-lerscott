import pkg from "~/package.json";
import SectionHeader from "./section-header";

import styles from "./styles/contact.module.css";

const Contact = () => {
  return (
    <div data-testid="Contact" className={styles.Contact}>
      <SectionHeader header="Contact" />
      <div className="p-4">
        <p className={styles.ContactRow}>{pkg.author.phone}</p>
        <p className={styles.ContactRow}>{pkg.author.email}</p>
        <p className={styles.ContactRow}>{pkg.author.address}</p>
      </div>
    </div>
  );
};

export default Contact;
