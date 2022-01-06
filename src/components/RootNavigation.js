import {createNavigationContainerRef} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function toggleDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer());
  }
}
