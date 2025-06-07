import { createDrawerNavigator } from '@react-navigation/drawer';
import CafesScreen from '../screens/CafesScreen';
import DessertsScreen from '../screens/DessertsScreen';
import DrinksScreen from '../screens/DrinksScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Cafes" component={CafesScreen} />
      <Drawer.Screen name="rinks" component={DrinksScreen} />
      <Drawer.Screen name="Desserts" component={DessertsScreen} />
    </Drawer.Navigator>
  );
}
