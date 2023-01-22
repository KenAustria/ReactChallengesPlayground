import Tabs from "./Tabs";
import "./styles.css";

const API = [
  {
    value: "html",
    label: "HTML",
    panel:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
  },
  {
    value: "css",
    label: "CSS",
    panel:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
  },
  {
    value: "javascript",
    label: "JAVASCRIPT",
    panel:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
  }
];

export default function App() {
  return (
    <div className="wrapper">
      <button>A focusable element</button>
      <Tabs items={API} />
      <button>Some other focusable element</button>
    </div>
  );
}
