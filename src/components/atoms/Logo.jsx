import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/home" className="flex items-center">
      <img src="../src/assets/images/soundle-logo.png" alt="Soundle logo" className="w-15 h-15" />
      <span className="text-4xl font-extrabold font-stretch-condensed tracking-tight">SOUNDLE</span>
    </Link>
  );
}
