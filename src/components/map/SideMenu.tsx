import { HomeIcon } from "lucide-react";
import { Component } from "react";
import {
  DefaultProfileIcon,
  LogoIcon,
  ShoppingBagIcon,
  TipIcon,
  TogetherIcon,
} from "../common/Icons";

export default class SideMenu extends Component {
  render() {
    return (
      <div className="flex flex-nowrap w-24 h-auto justify-around p-4 absolute top-0 left-0 z-10 bg-white shadow-md">
        <ul className="flex flex-col items-center justify-center space-y-6 w-full h-full ">
          <li><LogoIcon className="w-16 h-16" /></li>
          {/* 🔽 회색 구분선 추가 */}
          <li className="w-3/4 border-t border-gray-300 my-2" />

          <li><HomeIcon className="w-10 h-10" /></li>
          <li><TogetherIcon className="w-10 h-10" /></li>
          <li><TipIcon className="w-10 h-10" /></li>
          <li><ShoppingBagIcon className="w-10 h-10" /></li>
          <li><DefaultProfileIcon className="w-10 h-10" /></li>
        </ul>
      </div>
    );
  }
}
