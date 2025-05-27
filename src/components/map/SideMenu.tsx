import { Component } from "react";

export default class SideMenu extends Component {
  render() {
    return (
      <div className="text-xl font-bold mb-4 color-red-800 absolute top-0 left-0 p-4 z-10 bg-white shadow-md">
        <h2>Side Menu</h2>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    );
  }
}
