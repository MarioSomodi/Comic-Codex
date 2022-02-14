import {
  DrawerActions,
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function toggleDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer());
  }
}

export function Back() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}
