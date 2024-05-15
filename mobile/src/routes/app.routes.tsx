import { Exercise } from "@/screens/Exercise";
import { History } from "@/screens/History";
import { Home } from "@/screens/Home";
import { Profile } from "@/screens/Profile";

import HomeSvg from '@/assets/home.svg'
import HistorySvg from '@/assets/history.svg'
import ProfileSvg from '@/assets/profile.svg'
import { Entypo } from '@expo/vector-icons'

import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "native-base";
import { Platform } from "react-native";
import { EmotionsDiary } from "@/screens/EmotionsDiary";
import { FoodScreen } from "@/screens/FoodScreen";
import Recipes from "@/screens/Recipes";
import { Evolution } from "@/screens/Evolution";
import Progress from "@/screens/Progress";
import { Calculator } from "@/screens/Calculator";

type AppRoutes = {
    home: undefined
    exercise: { exerciseId: string }
    profile: undefined
    history: undefined
    emotionsDiary: undefined
    foodScreen: undefined
    recipes: undefined
    evolution: undefined
    progress: undefined
    calculator: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const { sizes, colors } = useTheme()

    const iconSize = sizes[6]

    return (
        <Navigator screenOptions={{ 
            headerShown: false, 
            tabBarShowLabel: false, 
            tabBarActiveTintColor: colors.blue[500], 
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6]
            }
        }}>
            <Screen 
                name='home'
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSize} height={iconSize} />
                }}
            />

            <Screen 
                name='history'
                component={History}
                options={{
                    tabBarIcon: ({ color }) => <HistorySvg fill={color} width={iconSize} height={iconSize} />
                }}
            />

            <Screen 
                name='profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <ProfileSvg fill={color} width={iconSize} height={iconSize} />
                }}
            />

            <Screen 
                name='exercise'
                component={Exercise}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen 
                name='emotionsDiary'
                component={EmotionsDiary}
                options={{
                    tabBarIcon: ({ color }) => <Icon as={Entypo} fill={color} size={"md"} name="book" color={color} />

                }}
            />

            <Screen 
                name='foodScreen'
                component={FoodScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon as={Entypo} fill={color} size={"md"} name="bowl" color={color} />

                }}
            />

            <Screen 
                name='recipes'
                component={Recipes}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen 
                name='evolution'
                component={Evolution}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen 
                name='progress'
                component={Progress}
                options={{
                    tabBarButton: () => null
                }}
            />

            <Screen 
                name='calculator'
                component={Calculator}
                options={{
                    tabBarButton: () => null
                }}
            />
        </Navigator>
    )
} 