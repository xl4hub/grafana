import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2, NavModelItem } from '@grafana/data';
import { Components } from '@grafana/e2e-selectors';
import { Icon, IconButton, ToolbarButton, useStyles2 } from '@grafana/ui';
import { useGrafana } from 'app/core/context/GrafanaContext';
import { t } from 'app/core/internationalization';
import { HOME_NAV_ID } from 'app/core/reducers/navModel';
import { useSelector } from 'app/types';

import { Breadcrumbs } from '../../Breadcrumbs/Breadcrumbs';
import { buildBreadcrumbs } from '../../Breadcrumbs/utils';
import { TOP_BAR_LEVEL_HEIGHT } from '../types';

import { NavToolbarSeparator } from './NavToolbarSeparator';
import { XL4Mode } from 'app/types';

export const TOGGLE_BUTTON_ID = 'mega-menu-toggle';

export interface Props {
  onToggleSearchBar(): void;
  onToggleMegaMenu(): void;
  onToggleKioskMode(): void;
  searchBarHidden?: boolean;
  hideLeftMenu?: boolean;
  sectionNav: NavModelItem;
  pageNav?: NavModelItem;
  actions: React.ReactNode;
}

export function NavToolbar({
  actions,
  searchBarHidden,
  hideLeftMenu,
  sectionNav,
  pageNav,
  onToggleMegaMenu,
  onToggleSearchBar,
  onToggleKioskMode,
}: Props) {
  const { chrome } = useGrafana();
  const state = chrome.useState();
  const homeNav = useSelector((state) => state.navIndex)[HOME_NAV_ID];
  const styles = useStyles2(getStyles);
  const breadcrumbs = buildBreadcrumbs(sectionNav, pageNav, homeNav);

  // XL4: Disable controls other than timepicker in the NavToolBar
  const showMenus = !hideLeftMenu;
  const hideNavToolBar = state.xl4Mode == XL4Mode.View;

  return (
    <div data-testid={Components.NavToolbar.container} className={hideNavToolBar?styles.hidden:styles.pageToolbar}>
      {showMenus && (
      <div className={styles.menuButton}>
        <IconButton
          id={TOGGLE_BUTTON_ID}
          name="bars"
          tooltip={
            state.megaMenuOpen
              ? t('navigation.toolbar.close-menu', 'Close menu')
              : t('navigation.toolbar.open-menu', 'Open menu')
          }
          tooltipPlacement="bottom"
          size="xl"
          onClick={onToggleMegaMenu}
          data-testid={Components.NavBar.Toggle.button}
        />
      </div>
      )}
      {showMenus && (
      <Breadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumbsWrapper} />
      )}
      <div className={hideNavToolBar?styles.hidden:styles.actions}>
        {actions}
        {showMenus && searchBarHidden && (
          <ToolbarButton
            onClick={onToggleKioskMode}
            narrow
            title={t('navigation.toolbar.enable-kiosk', 'Enable kiosk mode')}
            icon="monitor"
          />
        )}
        {showMenus && actions && <NavToolbarSeparator />}
        {showMenus && (
        <ToolbarButton
          onClick={onToggleSearchBar}
          narrow
          title={t('navigation.toolbar.toggle-search-bar', 'Toggle top search bar')}
        >
          <Icon name={searchBarHidden ? 'angle-down' : 'angle-up'} size="xl" />
        </ToolbarButton>)}
      </div>
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    breadcrumbsWrapper: css({
      display: 'flex',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        minWidth: '50%',
      },
    }),
    pageToolbar: css({
      height: TOP_BAR_LEVEL_HEIGHT,
      display: 'flex',
      padding: theme.spacing(0, 1, 0, 2),
      alignItems: 'center',
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      backgroundColor: theme.colors.background.secondary, // Using a theme color
    }),
    menuButton: css({
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1),
    }),
    actions: css({
      label: 'NavToolbar-actions',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      justifyContent: 'flex-end',
      paddingLeft: theme.spacing(1),
      flexGrow: 1,
      gap: theme.spacing(1),
      minWidth: 0,

      '.body-drawer-open &': {
        display: 'none',
      },
    }),
    hidden: css({
      opacity: 0,
      position: 'absolute',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
      clip: 'rect(1px, 1px, 1px, 1px)',
      pointerEvents: 'none'
    }),
  };
};
