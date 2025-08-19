import { Page } from "@app";
import React from 'react';

export interface AdminMainPageControllerProps {
  onNavigate: (page: Page) => void;
  onLogin: (user: any) => void;
  username?: string;
}

export class AdminMainPageController {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  props: AdminMainPageControllerProps;
  onNavigate: (page: Page) => void;
  username: string;

  constructor(
    props: AdminMainPageControllerProps,
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
  ) {
    this.props = props;
    this.setSidebarOpen = setSidebarOpen;
    this.setCurrentPage = setCurrentPage;
    this.onNavigate = props.onNavigate;
    this.username = props.username || "Admin";
  }

  toggleSidebar = () => {
    this.setSidebarOpen((prev) => !prev);
  };

  selectPage = (page: string) => {
    this.setCurrentPage(page);
  };

  handleSignOut = () => {
    localStorage.removeItem("admin_user");
    this.props.onNavigate("HomePage");
  };
}
