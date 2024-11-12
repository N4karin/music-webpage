import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation(); // Get the current location
    const pathname = location.pathname || '/'; // Get the pathname

    return (
        <div>
            Hello World.
        </div>
    );
}
