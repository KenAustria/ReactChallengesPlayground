import "./styles.css";
import Accordion from "./Accordion/Accordion";

const API = [
  {
    value: "html",
    title: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
  },
  {
    value: "css",
    title: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
  },
  {
    value: "javascript",
    title: "JAVASCRIPT",
    content:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
  }
];

export default function App() {
  return (
    <div className="wrapper">
      <Accordion sections={API} />
    </div>
  );
}
