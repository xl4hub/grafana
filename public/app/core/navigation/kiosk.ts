import { UrlQueryMap } from '@grafana/data';

import { KioskMode, XL4Mode } from '../../types';

// TODO Remove after topnav feature toggle is permanent and old NavBar is removed
// XL4: The logic in these functions is duplicated in AppChromeService.tsx
export function getKioskMode(queryParams: UrlQueryMap): KioskMode | null {
  switch (queryParams.kiosk) {
    case 'tv':
      return KioskMode.TV;
    //  legacy support
    case '1':
    case true:
      return KioskMode.Full;
    default:
      return null;
    case 'view':
    case 'vwtp':
      return KioskMode.TV;
      break;
    case 'edit':
      return null;
      break;
  }
}

export function getKioskXl4Mode(queryParams: UrlQueryMap): XL4Mode {
  var xl4Mode:   XL4Mode;
  switch (queryParams.kiosk) {
    case 'tv':
      return XL4Mode.Off;
      break;
    case '1':
    case true:
      return XL4Mode.Off;
      break;
    default:
    case null:
    case 'off':
      return XL4Mode.Off;
      break;
    case 'view':
      return XL4Mode.View;
      break;
    case 'vwtp':
      return XL4Mode.VwTp;
      break;
    case 'edit':
      return XL4Mode.Edit;
      break;
  }
}
