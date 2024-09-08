import React, { useEffect, useState, useTransition } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Spinner, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "../theme-switch";
import LanguageSwitcher from "../language-switch";
import { useTranslations } from "@/actions/localisation";
import { Locale } from "@/i18n.config";
import Levels from "@/app/api/Learn/Level";
import { LevelsIcon } from "../icons/sidebar/level-icon";
import { CourseIcon } from "../icons/sidebar/course-icon";
interface Props {
  lang: Locale;
}

export const SidebarWrapper = ({ lang }: Props) => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const translations = useTranslations(lang, "SideBar");

  const levelAPi = Levels();
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const fetchedLevels = await levelAPi.GetLevel();
        const levelNames = fetchedLevels.map(
          (level: any) => level.levelName_en
        );
        setLevels(levelNames);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };

    fetchLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!translations) {
    return <Spinner />;
  }

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title={translations.home}
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title={translations.main_menu}>
              <SidebarItem
                isActive={pathname === "/accounts"}
                title={translations.accounts}
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title={translations.payements}
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title={translations.balances}
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title={translations.customers}
                icon={<CustomersIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title={translations.data}>
              <SidebarItem
                isActive={pathname === "/levels"}
                title={translations.levels}
                icon={<LevelsIcon />}
                href="/levels"
              />
              <CollapseItems
                icon={<CourseIcon />}
                items={levels}
                title={translations.courses}
              />
            </SidebarMenu>

            <SidebarMenu title={translations.updates}>
              <SidebarItem
                isActive={pathname === "/changelog"}
                title={translations.changelog}
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className="flex flex-col  items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0">
            <div className="flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0">
              <Tooltip content={"Settings"} color="primary">
                <div className="max-w-fit">
                  <SettingsIcon />
                </div>
              </Tooltip>
              <Tooltip content={"Adjustments"} color="primary">
                <div className="max-w-fit">
                  <FilterIcon />
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="w-full flex justify-center">
                <div className="max-w-fit">
                  <ThemeSwitcher isSmall={true} />
                </div>
              </div>
              <div className="max-w-fit">
                <LanguageSwitcher isSmall={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
