import React from 'react'
import { ScrollView, View, Text, StyleSheet} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import CommonStyles from '../commonStyles'

export default props => {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>AppList</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }} />
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.name}>
                    {props.navigation.getParam('name')}
                </Text>
                <Text style={styles.email}>
                    {props.navigation.getParam('email')}
                </Text>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: "#DDD",
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 15,
        backgroundColor: '#222',
        marginTop: 20,
    },
    title:{
        color: '#000',
        fontFamily: CommonStyles.fontfamily,
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontFamily: CommonStyles.fontfamily,
        fontSize: 20,
        color: CommonStyles.color.mainText,
        marginBottom: 5,
    },
    email: {
        fontFamily: CommonStyles.fontfamily,
        fontSize: 15,
        color: CommonStyles.color.subText,
        marginBottom: 10,
    }
})