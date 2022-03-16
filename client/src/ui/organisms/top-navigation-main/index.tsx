import * as React from "react";

import { AuthContainer } from "../../molecules/auth-container";
import MainMenu from "../../molecules/main-menu";
import { UserMenu } from "../../molecules/user-menu";
import { Search } from "../../molecules/search";

import { Button } from "../../atoms/button";

import { useUserData } from "../../../user-context";

import "./index.scss";
import { ENABLE_PLUS } from "../../../constants";
import { isPlusAvailable } from "../../../utils";

export const TopNavigationMain = ({ isOpenOnMobile }) => {
  const userData = useUserData();
  const plusAvailable = isPlusAvailable(userData);
  const [showSearch, setShowSearch] = React.useState(false);
  const [hasOpened, setHasOpened] = React.useState<boolean | undefined>(false);

  function handleShowSearch() {
    setShowSearch(true);
    setHasOpened(true);
  }

  return (
    <div
      className={`top-navigation-main${showSearch ? " has-search-open" : ""}`}
    >
      <MainMenu isOpenOnMobile={isOpenOnMobile} />

      <Search
        id="top-nav-search"
        hasOpened={hasOpened}
        onChangeIsFocused={(isFocused) => setHasOpened(isFocused)}
        onCloseSearch={() => {
          setShowSearch(false);
        }}
      />

      <Button
        type="action"
        icon="search"
        onClickHandler={handleShowSearch}
        extraClasses="toggle-search-button"
      >
        <span className="visually-hidden">Show search</span>
      </Button>

      {(ENABLE_PLUS && userData && userData.isAuthenticated && (
        <>
          <UserMenu />
        </>
      )) ||
        (plusAvailable && <AuthContainer />) || <></>}
    </div>
  );
};
