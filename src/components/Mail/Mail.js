import React from "react";
import PropTypes from "prop-types";

const Mail = ({ email, subject, body, children }) => {
  return (
		<a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
	)
};

Mail.propTypes = {
  email: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
  children: PropTypes.string
};

export default Mail;

{
  /* <Mail email="asdf@yahoo.com" subject="" body="">Send Email</Mail> */
}
