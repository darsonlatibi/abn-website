/* =========================================================
   ABN WEBSITE
   SEQUELIZE MODEL INDEX
   ========================================================= */

import Email from "./Email.js";
import EmailRecipient from "./EmailRecipient.js";

/* =========================================================
   EMAIL → RECIPIENTS
   ========================================================= */

Email.hasMany(EmailRecipient, {
  foreignKey: "emailId",
  sourceKey: "id",
  as: "recipients",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

/* =========================================================
   RECIPIENT → EMAIL
   ========================================================= */

EmailRecipient.belongsTo(Email, {
  foreignKey: "emailId",
  targetKey: "id",
  as: "emailMessage",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

/* =========================================================
   EXPORT
   ========================================================= */

export { Email, EmailRecipient };

export default {
  Email,
  EmailRecipient,
};
